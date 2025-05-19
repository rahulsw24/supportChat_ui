import React from 'react'

function CopilotSidebar() {
    return (
        <div className="w-1/4 bg-white p-6">
            <h2 className="font-semibold text-gray-800 mb-4">AI Copilot</h2>
            <p className="text-gray-500 mb-4">Hi, I'm Fin AI Copilot</p>
            <p className="text-sm text-gray-400 mb-6">Ask me anything about this conversation.</p>

            <div className="bg-gray-100 p-3 rounded-lg text-sm mb-4">
                💡 Suggested: <span className="underline cursor-pointer">How do I get a refund?</span>
            </div>

            <input
                type="text"
                className="border p-2 rounded-md w-full"
                placeholder="Ask a question..."
            />
        </div>
    );
}

export default CopilotSidebar
