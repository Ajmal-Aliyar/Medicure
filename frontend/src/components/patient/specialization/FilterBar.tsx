import React, { useState } from 'react'

const FilterBar = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
    };

    return (
        <div className="w-full mt-4 overflow-x-auto p-1 flex gap-2">
            <div className="w-full max-w-[130px]">
                <label htmlFor="language" className="block text-sm text-center text-[#0c0b3eb5]">Language</label>
                <select
                    id="language"
                    name="language"
                    value={selectedLanguage}
                    onChange={handleChange}
                    className="w-full py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                >
                    <option value="all">All</option>
                    <option value="hindi">Hindi</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="english">English</option>
                </select>

            </div>

            <div className="w-full max-w-[130px]">
                <label htmlFor="language" className="block text-sm text-center text-[#0c0b3eb5]">Language</label>
                <select
                    id="language"
                    name="language"
                    value={selectedLanguage}
                    onChange={handleChange}
                    className="w-full py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                >
                    <option value="all">All</option>
                    <option value="hindi">Hindi</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="english">English</option>
                </select>

            </div>
        </div>
    )
}

export default FilterBar
