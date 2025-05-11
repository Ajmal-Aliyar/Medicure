import { env } from "../config/env";
import s3 from "../config/s3Config";
import { v4 as uuidv4 } from "uuid";

export const uploadFileToS3 = async (
  file: Express.Multer.File,
  folder: string
): Promise<string> => {
  const fileExtension = file.originalname.split(".").pop();
  const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

  const params = {
    Bucket:  env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("File upload failed");
  }
};
