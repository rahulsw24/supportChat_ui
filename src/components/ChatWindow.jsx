// src/components/ChatWindow.jsx
import React from 'react';

function ChatWindow({ customer }) {
    if (!customer) return <div className="w-2/4 bg-white p-6">No customer selected.</div>;

    return (
        <div className="flex flex-col w-2/4 bg-white p-6 border-r border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{customer.name}</h2>
                <button className="text-sm px-3 py-1 bg-gray-100 rounded-md">Close</button>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-auto">
                {customer.messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${msg.from === 'agent' ? 'self-end bg-blue-100' : 'bg-gray-100'} p-3 rounded-lg w-fit max-w-md`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border p-2 rounded-md"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Send</button>
            </div>
        </div>
    );
}

export default ChatWindow;
