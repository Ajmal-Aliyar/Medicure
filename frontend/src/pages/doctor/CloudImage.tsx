import React, { useState } from 'react';
import { uploadCloudinary } from '../../utils/Cloudinary';

function CloudImage() {
    const [files, setFiles] = useState<(File | null)[]>([null, null, null]); // Use an array for multiple files

    const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFiles = [...files];
        updatedFiles[index] = e.target.files ? e.target.files[0] : null;
        setFiles(updatedFiles);
    };

    const uploadImages = async () => {
        // Filter out any null values (files that were not selected)
        const selectedFiles = files.filter(Boolean) as File[];

        if (selectedFiles.length === files.length) {
            const result = await uploadCloudinary(selectedFiles);
            console.log("Uploaded Image URLs:", result);
        } else {
            alert('Please select all files before uploading.');
        }
    };

    return (
        <div>
            {files.map((file, index) => (
                <input
                    key={index}
                    type="file"
                    onChange={handleFileChange(index)}
                    accept="image/*"
                />
            ))}
            <button onClick={uploadImages}>Upload</button>
        </div>
    );
}

export default CloudImage;
