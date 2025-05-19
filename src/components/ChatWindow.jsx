import React from 'react';
import { getAvatarColor } from '../utils/getAvatarColor';


function ChatWindow({ customer }) {
    if (!customer) {
        return <div className="w-2/4 bg-white p-6">No customer selected.</div>;
    }

    const customerInitial = customer.name.charAt(0).toUpperCase();
    const avatarColor = getAvatarColor(customer.name);

    return (
        <div className="flex flex-col w-2/4 bg-white border-r border-gray-200 relative">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-lg font-semibold">{customer.name}</h2>
                <button className="text-sm px-3 py-1 bg-gray-100 rounded-md">Close</button>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-4 p-6 overflow-y-auto flex-1">
                {customer.messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
                        {msg.from !== 'agent' && (
                            <div
                                className={`mr-2 flex-shrink-0 w-8 h-8 text-white flex items-center justify-center rounded-full font-medium text-sm ${avatarColor}`}
                            >
                                {customerInitial}
                            </div>
                        )}

                        <div className="max-w-xs">
                            <div
                                className={`p-3 rounded-lg ${msg.from === 'agent' ? 'bg-[#e5e7fb] text-right' : 'bg-gray-100 text-left'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            {msg.from === 'agent' && (
                                <div className="text-xs text-gray-500 mt-1 flex justify-end items-center gap-1">
                                    Seen · 1min
                                    <img
                                        src="https://i.pravatar.cc/24?img=3"
                                        alt="Agent"
                                        className="w-5 h-5 rounded-full ml-2"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat input */}
            <div className="border-t px-4 py-3 bg-white">
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 shadow-sm">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 outline-none"
                    />
                    <button className="text-blue-600 font-medium">Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
