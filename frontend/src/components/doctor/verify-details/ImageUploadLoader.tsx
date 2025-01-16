import { ImageUploadLoaderProps } from "../../../types/doctor/verifyDetailsType"


const ImageUploadLoader:React.FC<ImageUploadLoaderProps> = ({count, maxCount}) => {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center relative">
            <div className="w-14 h-14 bg-green-400 absolute rounded-full flex text-white justify-center items-center ">{`${count} / ${maxCount}`}</div>
            <div
                className="w-20 h-20 border-4 border-transparent text-green-400 text-4xl animate-spin flex items-center justify-center border-t-green-600 rounded-full"
            >
                <div
                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl  animate-spin flex items-center justify-center border-t-green-600 rounded-full"
                ></div>
            </div>
        </div>


    )
}

export default ImageUploadLoader
