import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";

const CopilotSidebar = ({ customer }) => {
    const [aiReply, setAiReply] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!customer || customer.messages.length === 0) return;

        const latestMsg = [...customer.messages].reverse().find(msg => msg.from !== 'agent');

        if (!latestMsg) return;

        const fetchReply = async () => {
            setLoading(true);
            try {
                const res = await axios.post("http://localhost:3000/api/generate-reply", {
                    message: latestMsg.text,
                });
                setAiReply(res.data.reply);
            } catch (err) {
                setAiReply("Could not generate a reply.");
            } finally {
                setLoading(false);
            }
        };

        fetchReply();
    }, [customer]);

    return (
        <div className="flex flex-col h-full w-1/3 bg-gradient-to-b from-[#ffffff] via-[#fdf9fc] to-[#fef3f3]">
            {/* Top Tabs */}
            <div className="flex justify-between items-center p-3 border-b-1 border-gray-200">
                <div className="flex space-x-4">
                    <button className="border-b-2 border-purple-500 text-purple-600 font-semibold pb-1">
                        AI Copilot
                    </button>
                    <button className="text-gray-500 hover:text-black">Details</button>
                </div>
                <BiCopy className="text-gray-400 hover:text-black cursor-pointer" size={20} />
            </div>

            {/* AI Response */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-12 flex-1">
                <div className="bg-black text-white rounded-full p-3 mb-4">
                    <span className="text-2xl font-bold">🤖</span>
                </div>
                <h2 className="text-lg font-semibold mb-1">Hi, I’m Fin AI Copilot</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Here's a suggested reply based on the conversation.
                </p>

                <div className="bg-gray-100 text-sm text-gray-800 px-4 py-2 rounded-md max-w-xs w-full">
                    {loading ? "Thinking..." : aiReply}
                </div>
            </div>

            {/* Input Box */}
            <div className="border-t p-3 flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Ask a question..."
                    className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button>
                    <FiSend className="text-gray-500 hover:text-purple-600" size={20} />
                </button>
            </div>
        </div>
    );
};

export default CopilotSidebar;
