import React from 'react';
import { getAvatarColor } from '../utils/getAvatarColor';

function ChatWindow({ customer, composerText, setComposerText }) {
    if (!customer) {
        return <div className="flex-1 bg-white p-6">No customer selected.</div>;
    }

    const customerInitial = customer.name.charAt(0).toUpperCase();
    const avatarColor = getAvatarColor(customer.name);

    return (
        <div className="flex flex-col w-full md:w-2/4 bg-white border-r border-gray-200 relative">
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
                            <div className={`p-3 rounded-lg ${msg.from === 'agent' ? 'bg-[#e5e7fb] text-right' : 'bg-gray-100 text-left'}`}>
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

            {/* Composer */}
            <div className="px-4 py-3 bg-white">
                <div className="flex flex-row items-center gap-3 px-4 py-3 rounded-2xl border border-gray-200 shadow-sm bg-white w-full min-h-[64px]">
                    <textarea
                        placeholder="Use ⌘K for shortcuts"
                        value={composerText}
                        onChange={(e) => setComposerText(e.target.value)}
                        rows={3}
                        className="flex-1 bg-transparent outline-none px-3 text-base resize-none placeholder-gray-400"
                    />
                    <button className="text-gray-600 hover:text-black font-medium text-sm">Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
