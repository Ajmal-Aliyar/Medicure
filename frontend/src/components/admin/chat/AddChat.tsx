import { useState } from "react";
import { api } from "../../../utils/axiosInstance";
import SearchDoctors from "./searchDoctors";

const AddChat = ({ onClose }: { onClose: () => void }) => {
    const [groupName, setGroupName] = useState("");
    const [groupIcon, setGroupIcon] = useState("");
    const [candidates, setCandidates] = useState<string[]>([]);
    const [isGroup, setIsGroup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateChat = async () => {
        if (candidates.length === 0) {
            return alert("Please add at least one participant.");
        }

        setLoading(true);
        setError("");

        try {
            const requestData = isGroup
                ? { groupName, groupIcon, candidates, isGroup: true }
                : { candidates, isGroup: false };

            const response = await api.post("/chat", requestData);
            console.log(response);
            console.log("Chat created successfully!");
            setGroupName("");
            setGroupIcon("");
            setCandidates([]);
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800">{isGroup ? "Create Group Chat" : "Create Chat"}</h2>
                
                <div className="mt-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isGroup}
                            onChange={(e) => setIsGroup(e.target.checked)}
                        />
                        <span>Group</span>
                    </label>
                </div>

                {isGroup && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                        />
                        <input
                            type="text"
                            placeholder="Enter group icon URL"
                            value={groupIcon}
                            onChange={(e) => setGroupIcon(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                        />
                    </>
                )}

                <SearchDoctors /> 

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={handleCreateChat}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddChat;