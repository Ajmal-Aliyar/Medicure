import { useState } from "react";
import { api } from "../../../utils/axiosInstance";
import SearchDoctors from "./SearchDoctors";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";


const AddChat = ({ onClose }: { onClose: () => void }) => {
    const [groupName, setGroupName] = useState("");
    const [participants, setParticipants] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { _id } = useSelector((state: RootState) => state.auth)

    const handleCreateChat = async () => {
        if (participants.length === 0) {
            return alert("Please add at least one participant.");
        }

        setLoading(true);
        setError("");

        try {

            const requestData = { groupName, participants: [...participants, _id], isGroup: true }

            console.log(requestData, 'rqdt');
            const response = await api.post("/api/chat", requestData);
            console.log(response);
            console.log("Chat created successfully!");
            setGroupName("");
            setParticipants([]);
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
                <h2 className="text-xl font-semibold text-gray-800">{"Create Group Chat"}</h2>




                <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none my-3"
                />


                <SearchDoctors candidates={participants} setCandidates={setParticipants} />

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
                        className="px-4 py-2 bg-[#6A9C89] text-white rounded-md hover:bg-[#5a8574]"
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