import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { getAvatarColor } from '../utils/getAvatarColor';

function SidebarComponent({ customers, onSelectCustomer, selectedCustomer, isOpen, onClose }) {
    return (
        <>
            {/* Sidebar for Desktop */}
            <div className="hidden md:block w-1/4 bg-white border-r border-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-4">Your inbox</h2>
                <ul>
                    {customers.map((msg, i) => {
                        const isActive = selectedCustomer?.id === msg.id;
                        const lastMessage = msg.messages[msg.messages.length - 1];
                        const timeAgo = lastMessage?.timestamp ? dayjs(lastMessage.timestamp).fromNow() : '';

                        return (
                            <li
                                key={msg.id || i}
                                onClick={() => onSelectCustomer(msg)}
                                className={`flex gap-3 p-3 rounded-lg cursor-pointer mb-2 items-start ${isActive ? 'bg-indigo-100' : ''
                                    } hover:bg-gray-100`}
                            >
                                <div className="relative">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${getAvatarColor(msg.name)}`}>
                                        {msg.name?.charAt(0) || 'U'}
                                    </div>
                                    {msg.status && (
                                        <span
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${msg.status === 'urgent'
                                                ? 'bg-red-500'
                                                : msg.status === 'waiting'
                                                    ? 'bg-yellow-400'
                                                    : 'bg-green-500'
                                                }`}
                                        ></span>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="font-medium text-sm">{msg.name}</div>
                                        <div className="text-xs text-gray-400 whitespace-nowrap ml-2">{timeAgo}</div>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">{lastMessage?.text || 'No messages yet'}</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Sidebar Drawer for Mobile */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex md:hidden">
                    <div className="w-full bg-white p-4 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Your inbox</h2>
                            <button onClick={onClose} className="text-sm text-gray-500">Close</button>
                        </div>
                        <ul>
                            {customers.map((msg, i) => {
                                const isActive = selectedCustomer?.id === msg.id;
                                const lastMessage = msg.messages[msg.messages.length - 1];
                                const timeAgo = lastMessage?.timestamp ? dayjs(lastMessage.timestamp).fromNow() : '';

                                return (
                                    <li
                                        key={msg.id || i}
                                        onClick={() => onSelectCustomer(msg)}
                                        className={`flex gap-3 p-3 rounded-lg cursor-pointer mb-2 items-start ${isActive ? 'bg-indigo-100' : ''
                                            } hover:bg-gray-100`}
                                    >
                                        <div className="relative">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${getAvatarColor(msg.name)}`}>
                                                {msg.name?.charAt(0) || 'U'}
                                            </div>
                                            {msg.status && (
                                                <span
                                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${msg.status === 'urgent'
                                                        ? 'bg-red-500'
                                                        : msg.status === 'waiting'
                                                            ? 'bg-yellow-400'
                                                            : 'bg-green-500'
                                                        }`}
                                                ></span>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{msg.name}</div>
                                            <div className="text-xs text-gray-500 truncate">
                                                {lastMessage?.text || 'No messages yet'}
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400">{timeAgo}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex-1" onClick={onClose} />
                </div>
            )}
        </>
    );
}

export default SidebarComponent;
