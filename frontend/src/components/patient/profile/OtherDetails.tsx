

function OtherDetails () {
    return (
        <div className="flex flex-wrap gap-3">

            <div className="w-[250px]">
                <label
                    htmlFor="extraPhone"
                    className="block text-sm text-gray-400 "
                >
                    Extra Phone*
                </label>
                <input
                    type="text"
                    id="extraPhone"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500" />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="language"
                    className="block text-sm text-gray-400 "
                >
                    Language*
                </label>
                <input
                    type="text"
                    id="language"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>
        </div>
    )
}

export default OtherDetails
