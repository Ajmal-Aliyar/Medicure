import { env } from "../config/env";

export const deleteCloudinaryImages = async (
  publicIds: string[]
): Promise<void> => {
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;


  const response = await fetch(env.CLOUDINARY_API_URL, {
    method: "DELETE",
    headers: {
      Authorization: "Basic " + btoa(`${apiKey}:${apiSecret}`),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_ids: publicIds }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to delete image: ${result.error?.message}`);
  }

  console.log("Deletion Result:", result);
};

export const extractPublicId = (url: string): string => {
  try {
    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split(".")[0];
    return publicId;
  } catch (error) {
    throw new Error("Invalid Cloudinary URL provided.");
  }
};
