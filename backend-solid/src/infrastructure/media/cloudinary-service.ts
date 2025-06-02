import { env } from "@/config";
import { IMediaService } from "@/interfaces";
import { IDoctor } from "@/models";
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

    const result = await response.json();

    if (!response.ok) {
      console.error("Cloudinary Deletion Error:", result);
      throw new Error(`Failed to delete image(s): ${result.error?.message}`);
    }

    console.log("Cloudinary Deletion Success:", result);
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
