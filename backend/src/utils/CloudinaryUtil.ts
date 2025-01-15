export const deleteCloudinaryImages = async (publicIds: string[]): Promise<void> => {
    const cloudName = process.env.CLOUDINARY_API_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic " + btoa(`${apiKey}:${apiSecret}`),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ public_ids: publicIds })  
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to delete image: ${result.error?.message}`);
    }

    console.log("Deletion Result:", result);
}

export const extractPublicId = (url: string): string => {
    try {
        // Extract the public ID by removing Cloudinary domain and versioning
        const urlParts = url.split('/');
        const filename = urlParts[urlParts.length - 1]; // Get the last part containing filename
        const publicId = filename.split('.')[0]; // Remove file extension
        return publicId;
    } catch (error) {
        throw new Error('Invalid Cloudinary URL provided.');
    }
}