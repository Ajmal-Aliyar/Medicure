

function AboutDetails () {
    return (
        <div className="flex flex-wrap gap-3">
            <div className="w-[250px]">
                <label
                    htmlFor="dob"
                    className="block text-sm text-gray-400 "
                >
                    Date Of Birth*
                </label>
                <input
                    type="date"
                    id="dob"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                    placeholder="DD/MM/YYYY"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="gender"
                    className="block text-sm text-gray-400 "
                >
                    Gender*
                </label>
                <input
                    type="text"
                    id="gender"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500" />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="bloodGroup"
                    className="block text-sm text-gray-400 "
                >
                    Blood Group*
                </label>
                <input
                    type="text"
                    id="bloodGroup"
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>
        </div>
    )
}

export default AboutDetails
