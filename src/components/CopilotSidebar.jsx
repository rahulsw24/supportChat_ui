import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";

const CopilotSidebar = ({ customer, setComposerText, onClose }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    useEffect(() => {
        if (!customer || !customer.messages.length) return;

        const latestMsg = [...customer.messages].reverse().find(msg => msg.from !== "agent");
        if (!latestMsg) return;

        const fetchInitialReply = async () => {
            setLoading(true);
            try {
                const res = await axios.post("http://localhost:3000/api/generate-reply", {
                    message: latestMsg.text,
                });
                const aiReply = res.data.reply;
                setChatHistory([{ role: "ai", text: aiReply }]);
            } catch (err) {
                setChatHistory([{ role: "ai", text: "Could not generate a reply." }]);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialReply();
    }, [customer]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newHistory = [...chatHistory, { role: "user", text: input }];
        setChatHistory(newHistory);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:3000/api/generate-reply", {
                message: input,
            });

            const aiReply = res.data.reply;
            setChatHistory([...newHistory, { role: "ai", text: aiReply }]);
        } catch {
            setChatHistory([...newHistory, { role: "ai", text: "Sorry, I couldn't process that." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToComposer = (text) => {
        setComposerText(text);
    };

    return (
        <div className="relative flex flex-col h-full w-full md:w-full lg:w-full bg-gradient-to-b from-[#ffffff] via-[#fdf9fc] to-[#fef3f3]">
            {/* Close Button for Mobile */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 md:hidden text-gray-500 hover:text-black text-lg z-50"
            >
                ✕
            </button>

            {/* Tabs */}
            <div className="flex justify-between items-center p-3 border-gray-200 border-b">
                <div className="flex space-x-4">
                    <button className="border-b-2 border-purple-500 text-purple-600 font-semibold pb-1">
                        AI Copilot
                    </button>
                    <button className="text-gray-500 hover:text-black">Details</button>
                </div>
                <BiCopy className="text-gray-400 hover:text-black cursor-pointer" size={20} />
            </div>

            {/* Chat Section */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                        {msg.role === "ai" ? (
                            <div className="flex flex-col max-w-[80%] bg-gradient-to-br from-[#f2e9fb] to-[#f8f2ff] p-4 rounded-2xl shadow-md text-sm text-gray-800 space-y-2">
                                <div className="flex items-start space-x-2">
                                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                        🤖
                                    </div>
                                    <div className="whitespace-pre-wrap">{msg.text}</div>
                                </div>
                                <div className="w-full">
                                    <button
                                        onClick={() => handleAddToComposer(msg.text)}
                                        className="w-full text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                    >
                                        ✍️ Add to composer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-xs bg-[#e5e7fb] text-right rounded-lg px-4 py-2 text-sm">
                                {msg.text}
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="text-sm text-gray-400 text-center">Thinking...</div>
                )}
            </div>

            {/* Input */}
            <div className="border-t p-3 flex items-center space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                        chatHistory.length > 0 ? "Ask a follow-up question..." : "Ask me anything..."
                    }
                    className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>
                    <FiSend className="text-gray-500 hover:text-purple-600" size={20} />
                </button>
            </div>
        </div>
    );
};

export default CopilotSidebar;
