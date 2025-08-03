import { Input } from '@/components/domain/Cards/Input';
import { uploadCloudinary } from '@/lib/cloudinary';
import { setLoading } from '@/slices/globalSlice';
import { File } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export interface Props {
    setEditProfile: Dispatch<SetStateAction<boolean>>;
    requestUpdateProfileImage: (fileUrl: string, fileName: string) => void;
}

export const ImageUploader = ({ setEditProfile, requestUpdateProfileImage }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null)
    const dispatch = useDispatch();

    const handleSave = async (): Promise<void> => {
        if (!file) {
            toast.error('No file selected')
            return;
        }

        if (!fileName || fileName.length === 0) {
            toast.error('Enter name of the file.')
            return 
        }

        try {
            dispatch(setLoading(true));

            const uploadResponse = await uploadCloudinary(file);
            if (uploadResponse) {
                await requestUpdateProfileImage(uploadResponse, fileName);
                setEditProfile(false);
                setFile(null);
                setError(null);
            } else {
                setError('Image upload failed');
            }
        } catch (err) {
            setError('Failed to upload image.');
            console.error(err);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center  w-full h-full relative overflow-hidden">
            <Input label='File Name' onChange={(e) => setFileName(e.target.value)} className='mb-10'/>
            <div className="relative w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center h-full text-gray-500">
                    {!file ? <span>Upload Document Here.</span>:
                    <File size={80} className='text-primary' /> }
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target?.files?.[0] ?? null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {file && (
                <div className="mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};
