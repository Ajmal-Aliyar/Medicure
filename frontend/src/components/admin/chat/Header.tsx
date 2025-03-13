import { MoreVertical, Search } from 'lucide-react';
import { useState } from 'react'
import AddChat from './AddChat';

const Header = () => {
    const [showAddContact, setShowAddContact] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="p-3 bg-[#6A9C89] flex justify-between items-center">
            <div className="relative w-full">
                    <Search className="absolute left-3 top-2 text-white" size={20} />
                    <input
                        placeholder="Search..."
                        className="pl-10 border rounded-md w-full border-white outline-none p-1 placeholder:text-white"
                    />
                </div>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md"
                >
                    <MoreVertical className="text-white" />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-20">
                        <ul className="py-2">
                            <li>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setShowAddContact(true);
                                    }}
                                >
                                    Add +
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
                {showAddContact && <AddChat onClose={() => setShowAddContact(false)} />}
            </div>
        </div>
    )
}

export default Header
