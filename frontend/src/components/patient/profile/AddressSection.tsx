

function AddressSection () {
    return (
        <div className="flex flex-wrap gap-3">
            <div className="w-[250px]">
                <label
                    htmlFor="houseName"
                    className="block text-sm text-gray-400 "
                >
                   House  No. / Street Name/ Area *
                </label>
                <input
                    type="text"
                    id="houseName"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="street"
                    className="block text-sm text-gray-400 "
                >
                    Colony / Street / Locality*
                </label>
                <input
                    type="text"
                    id="street"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500" />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="city"
                    className="block text-sm text-gray-400 "
                >
                    City*
                </label>
                <input
                    type="text"
                    id="city"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="state"
                    className="block text-sm text-gray-400 "
                >
                    State*
                </label>
                <input
                    type="text"
                    id="state"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="country"
                    className="block text-sm text-gray-400 "
                >
                    Country*
                </label>
                <input
                    type="text"
                    id="country"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="pincode"
                    className="block text-sm text-gray-400 "
                >
                    Pin Code*
                </label>
                <input
                    type="text"
                    id="pincode"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>
        </div>
    )
}

export default AddressSection
