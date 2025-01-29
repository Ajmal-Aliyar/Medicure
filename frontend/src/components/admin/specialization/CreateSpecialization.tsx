import { useState } from "react";
import { uploadCloudinary } from "../../../utils/Cloudinary";
import { createNewSpecializationApi } from "../../../sevices/admin/specializationRepository";
import { useDispatch } from "react-redux";
import { setError, setLoading, setSuccess } from "../../../store/slices/commonSlices/notificationSlice";

interface CreateSpecializationProps {
  setMount: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSpecialization: React.FC<CreateSpecializationProps> = ({ setMount }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const dispatch = useDispatch()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    dispatch(setLoading(true))
    if (!name || !description || !image) {
      dispatch(setError('Please provide all the required details to proceed with creating the specialization.'))
      dispatch(setLoading(false))
      return;
    }

    try {
      const uploadedImage = await uploadCloudinary(image);
      const response = await createNewSpecializationApi(uploadedImage, name.toLocaleLowerCase(), description);
      if (response) {
        dispatch(setSuccess(response.message))
        setMount(p => !p)
      }
    } catch (error) {
      console.error("Error creating specialization:", error);
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="relative w-[300px] bg-[#fafafa] rounded-md p-6 flex flex-col items-center gap-4 shadow-md transition-transform duration-300 h-[300px]">
      <div>
        <label htmlFor="upload-image">
          <div
            className="w-24 h-24 rounded-full object-cover border-4 border-[#6A9C89] cursor-pointer flex items-center justify-center"
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </label>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="specialization"
        className="text-md font-semibold text-[#6A9C89] bg-transparent text-center outline-[#164233e0] lowercase"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-2 py-1 outline-none resize-none bg-transparent text-center text-gray-600 leading-relaxed"
        rows={5}
        placeholder="Write description here..."
      />
      <div
        className="px-3 m-2 text-white bg-[#6A9C89] absolute top-0 right-0 rounded-md cursor-pointer"
        onClick={handleFormSubmit}
      >
        create
      </div>
    </div>
  );
};

export default CreateSpecialization;
