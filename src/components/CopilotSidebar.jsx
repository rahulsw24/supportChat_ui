import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";

const CopilotSidebar = ({ customer, setComposerText, onClose }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatRef = useRef(null);
    const [showIntro, setShowIntro] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const lastHandledCustomerTextRef = useRef(null);



    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (!customer || !customer.messages.length) return;

        const latestMsg = [...customer.messages].reverse().find(msg => msg.from === "customer");
        if (!latestMsg || lastHandledCustomerTextRef.current === latestMsg.text) return;

        lastHandledCustomerTextRef.current = latestMsg.text;
        setLoading(true);

        const isInitial = chatHistory.length === 0;

        // Add intro + generating only once (initial load)
        if (isInitial) {
            setChatHistory([
                { role: "intro", text: "👋 Hi, I’m Fin’s Copilot! Give me a moment while I read the conversation…" },
                { role: "generating", text: "🤖 Generating response..." },
            ]);
        } else {
            setChatHistory(prev => [...prev, { role: "generating", text: "🤖 Generating response..." }]);
        }

        const fetchReply = async () => {
            try {
                const res = await axios.post(`${API_BASE_URL}/api/generate-reply`, {
                    message: latestMsg.text,
                });

                const aiReply = res.data.reply;

                setChatHistory(prev => [
                    ...prev.filter(msg => msg.role !== "generating" && msg.role !== "intro"),
                    { role: "ai", text: aiReply }
                ]);
            } catch (err) {
                setChatHistory(prev => [
                    ...prev.filter(msg => msg.role !== "generating" && msg.role !== "intro"),
                    { role: "ai", text: "Could not generate a reply." }
                ]);
            } finally {
                setLoading(false);
                setShowIntro(false);
            }
        };

        setTimeout(fetchReply, 800);
    }, [customer?.messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const newHistory = [...chatHistory, { role: "user", text: input }];
        setChatHistory(newHistory);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE_URL}/api/generate-reply`, {
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
            {/* Tabs */}
            <div className="flex justify-between items-center p-4 border-gray-200 border-b">
                <div className="flex space-x-4">
                    <button className="border-b-2 border-gray-500 text-base font-semibold">AI Copilot</button>
                    <button className="text-gray-500 hover:text-black">Details</button>
                </div>
                <BiCopy className="hidden md:inline text-gray-400 hover:text-black cursor-pointer" size={20} />
            </div>

            {/* Chat Section */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory
                    .filter(msg => msg.role !== "customer") // Hides customer messages
                    .map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            {(msg.role === "ai" || msg.role === "intro" || msg.role === "generating") ? (
                                <div className="flex flex-col max-w-[80%] bg-gradient-to-br from-[#f2e9fb] to-[#f8f2ff] p-4 rounded-2xl shadow-md text-sm text-gray-800 space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                            🤖
                                        </div>
                                        <div className="whitespace-pre-wrap">{msg.text}</div>
                                    </div>
                                    {msg.role === "ai" && (
                                        <div className="w-full">
                                            <button
                                                onClick={() => handleAddToComposer(msg.text)}
                                                className="w-full text-xs px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition font-bold"
                                            >
                                                ✍️ ADD TO COMPOSER
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="max-w-xs bg-[#e5e7fb] text-right rounded-lg px-4 py-2 text-sm">
                                    {msg.text}
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-gray-200">
                <div className="flex flex-row items-center px-3 py-3 rounded-2xl border border-gray-200 shadow-sm bg-white w-full">
                    <textarea
                        rows={1}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={chatHistory.length > 0 ? "Ask a follow-up question..." : "Ask me anything..."}
                        className="flex-1 bg-transparent outline-none px-3 text-base resize-none placeholder-gray-400"
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend}>
                        <FiSend className="text-gray-500 hover:text-purple-600" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CopilotSidebar;
