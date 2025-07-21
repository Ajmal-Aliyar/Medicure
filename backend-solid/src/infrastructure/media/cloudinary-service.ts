import { env } from "@/config";
import { IMediaService } from "@/interfaces";
import crypto from "crypto";
import { injectable } from "inversify";
@injectable()
export class CloudinaryService implements IMediaService {
  private getAuthHeader(): string {
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;
    return "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  }

  async delete(publicIds: string[]): Promise<void> {
    const response = await fetch(env.CLOUDINARY_API_URL, {
      method: "DELETE",
      headers: {
        Authorization: this.getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_ids: publicIds }),
    });

    const result: any = await response.json();

    if (!response.ok) {
      console.error("Cloudinary Deletion Error:", result);
      throw new Error(`Failed to delete image(s): ${result.error?.message}`);
    }

    console.log("Cloudinary Deletion Success:", result);
  }

  async upload(
    buffer: Buffer,
    filename: string,
    folder?: string
  ): Promise<string | null> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const publicId = filename.split(".")[0];

      const paramsToSign = [`public_id=${publicId}`, `timestamp=${timestamp}`];
      if (folder) paramsToSign.push(`folder=${folder}`);

      const signatureString =
        paramsToSign.join("&") + env.CLOUDINARY_API_SECRET;
      const signature = crypto
        .createHash("sha1")
        .update(signatureString)
        .digest("hex");

      const boundary = "----CloudinaryBoundary" + Date.now();
      const postamble = `\r\n--${boundary}--\r\n`;

      const formHeaderFields = [
        `--${boundary}`,
        'Content-Disposition: form-data; name="api_key"\r\n',
        "",
        env.CLOUDINARY_API_KEY,
        `--${boundary}`,
        'Content-Disposition: form-data; name="timestamp"\r\n',
        "",
        timestamp.toString(),
        `--${boundary}`,
        'Content-Disposition: form-data; name="public_id"\r\n',
        "",
        publicId,
        `--${boundary}`,
        'Content-Disposition: form-data; name="signature"\r\n',
        "",
        signature,
      ];

      if (folder) {
        formHeaderFields.push(
          `--${boundary}`,
          'Content-Disposition: form-data; name="folder"\r\n',
          "",
          folder
        );
      }

      const fileHeader = [
        `--${boundary}`,
        `Content-Disposition: form-data; name="file"; filename="${filename}"`,
        "Content-Type: application/octet-stream",
        "",
      ].join("\r\n");

      const preBuffer = Buffer.from(
        formHeaderFields.join("\r\n") + "\r\n" + fileHeader + "\r\n"
      );
      const postBuffer = Buffer.from(postamble);

      const body = Buffer.concat([preBuffer, buffer, postBuffer]);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_API_NAME}/image/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
          },
          body,
        }
      );

      const data = await response.json() as any;

      if (!response.ok) {
        console.error("Upload error:", data);
        return null;
      }

      return data.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  }

  extractPublicId(url: string): string {
    try {
      const parts = url.split("/");
      const filename = parts[parts.length - 1];
      const publicId = filename.split(".")[0];
      return publicId;
    } catch (error) {
      throw new Error("Invalid Cloudinary URL provided.");
    }
  }
}
