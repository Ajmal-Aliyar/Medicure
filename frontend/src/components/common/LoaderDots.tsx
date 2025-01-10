import { Suspense } from "react"

const LoaderDots: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-row gap-2 items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#37a2f5] animate-bounce dot"></div>
                <div className="w-3 h-3 rounded-full bg-[#37a2f5] animate-bounce dot"></div>
                <div className="w-3 h-3 rounded-full bg-[#37a2f5] animate-bounce dot"></div>
                <div className="w-3 h-3 rounded-full bg-[#37a2f5] animate-bounce dot"></div>
                <div className="w-3 h-3 rounded-full bg-[#37a2f5] animate-bounce dot"></div>
            </div>
        </Suspense>
    )
}

export default LoaderDots
