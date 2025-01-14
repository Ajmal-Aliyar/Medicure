const cloudName = 'dwyxogyrk';
const uploadPreset = 'Medicure';

/**
 * Upload images to Cloudinary
 * @param files - An array of files to upload
 * @returns A promise resolving to an array of uploaded image URLs
 */
export const uploadCloudinary = async (files: File[]): Promise<string[]> => {
    const result: string[] = []; // Specify the array type as string[]
    
    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to upload image: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.secure_url) {
                result.push(data.secure_url);
                console.log("Uploaded image URL:", data.secure_url);
            } else {
                console.warn("Image upload succeeded but no URL was returned.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
    
    return result;
};
