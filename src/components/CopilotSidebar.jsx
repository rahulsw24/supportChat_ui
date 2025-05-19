import React from "react";
import { FiSend } from "react-icons/fi";
import { BiCopy } from "react-icons/bi"; // top right icon

const CopilotSidebar = () => {
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

            {/* Main AI Copilot Section */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-12 flex-1">
                <div className="bg-black text-white rounded-full p-3 mb-4">
                    <span className="text-2xl font-bold">😃</span> {/* Optional icon */}
                </div>
                <h2 className="text-lg font-semibold mb-1">Hi, I’m Fin AI Copilot</h2>
                <p className="text-sm text-gray-500 mb-8">
                    Ask me anything about this conversation.
                </p>

                {/* Suggested Question */}
                <div className="text-sm text-left w-full">
                    <p className="mb-2 text-gray-500">Suggested</p>
                    <div className="bg-gray-100 text-sm text-gray-800 inline-flex items-center px-3 py-1 rounded-full">
                        💸 How do I get a refund?
                    </div>
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
