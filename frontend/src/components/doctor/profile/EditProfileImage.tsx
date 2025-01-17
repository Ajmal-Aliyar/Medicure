import React, { useState } from 'react';
import { IImageUploader } from '../../../types/doctor/profileType';
import { uploadCloudinary } from '../../../utils/Cloudinary';
import { updateProfileImageApi } from '../../../sevices/doctor/profile';

const ImageUploader: React.FC<IImageUploader> = ({ setEditProfile, profileImage }) => {
    const [identityUrl, setImage] = useState<string | null>(profileImage);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const convertToSquare = (img: HTMLImageElement): string | null => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;
            const xOffset = (img.width - size) / 2;
            const yOffset = (img.height - size) / 2;
            ctx.drawImage(img, xOffset, yOffset, size, size, 0, 0, size, size);
            return canvas.toDataURL('image/png');
        }
        return null;
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const squareImage = convertToSquare(img);
                    if (squareImage) {
                        setImage(squareImage);
                        setError(null);
                    } else {
                        setError('Failed to convert image to square.');
                    }
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (): Promise<void> => {
        if (identityUrl && imageFile) {
            try {
                const base64Data = identityUrl.split(',')[1];
                const byteCharacters = atob(base64Data);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                    const slice = byteCharacters.slice(offset, offset + 1024);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    byteArrays.push(new Uint8Array(byteNumbers));
                }
                const blob = new Blob(byteArrays, { type: 'image/png' });
                const file = new File([blob], 'cropped-image.png', { type: 'image/png' });

                const uploadResponse = await uploadCloudinary(file);
                if (uploadResponse) {
                    const profileImage = uploadResponse;
                    console.log(profileImage, 'Image uploaded to Cloudinary');
                    setEditProfile(profileImage);
                    await updateProfileImageApi(profileImage);
                    setError(null);
                    setEditProfile('');
                }
            } catch (uploadError) {
                setError('Failed to upload image.');
            }
        } else {
            setError('Please upload an image first.');
        }
    };


    return (

        <div className="flex flex-col items-center justify-center mt-8 w-full h-full relative overflow-hidden">
            <div className='absolute top-0 left-0 bg-blue-400  rounded-r-md active:scale-95 transition-all duration-300 -translate-x-2 w-10 pl-2' onClick={() => setEditProfile('')}>
                <button className="cursor-pointer duration-200" title="Go Back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="40px" viewBox="0 0 24 24" className="stroke-white pt-1">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                    </svg>
                </button>
            </div>
            <div className="relative w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden">
                {identityUrl ? (
                    <img
                        src={identityUrl}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <span>Upload Image</span>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {identityUrl && (
                <div className="mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-400 text-white px-4 py-2 rounded"
                    >
                        Save Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
