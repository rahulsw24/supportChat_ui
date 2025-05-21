import React, { useRef, useState, useEffect } from 'react';
import { getAvatarColor } from '../utils/getAvatarColor';
import { FiChevronDown } from "react-icons/fi";

function ChatWindow({ customer, composerText, setComposerText }) {
    const [selection, setSelection] = useState({ start: 0, end: 0, text: '' });
    const textareaRef = useRef(null);

    // Handle selection
    const handleSelection = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value.slice(start, end);

        if (text) {
            setSelection({ start, end, text });
        } else {
            setSelection({ start: 0, end: 0, text: '' });
        }
    };

    // Auto resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [composerText]);

    // Formatting functions
    const applyFormatting = (wrapper) => {
        const before = composerText.slice(0, selection.start);
        const after = composerText.slice(selection.end);
        const formatted = `${wrapper}${selection.text}${wrapper}`;
        setComposerText(before + formatted + after);
        setSelection({ start: 0, end: 0, text: '' });
    };

    const handleBold = () => applyFormatting('**');
    const handleItalic = () => applyFormatting('*');

    const handleCopilot = async () => {
        // Mock AI paraphrasing
        const paraphrased = `(${selection.text} - AI revised)`;
        const before = composerText.slice(0, selection.start);
        const after = composerText.slice(selection.end);
        setComposerText(before + paraphrased + after);
        setSelection({ start: 0, end: 0, text: '' });
    };

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
                <div className="flex flex-row items-end gap-3 px-4 py-3 rounded-2xl border border-gray-200 shadow-sm bg-white w-full relative">
                    {/* Floating toolbar */}
                    {selection.text && (
                        <div className="gabsolute bottom-[100px] left-4 flex gap-2 bg-white border shadow-md px-3 py-1 rounded-lg z-50">
                            <button onClick={handleCopilot} className="text-purple-600 border-r border-gray-200 px-3">AI</button>
                            <button onClick={handleBold} className="font-bold border-r border-gray-200 px-3">B</button>
                            <button onClick={handleItalic} className="font-bold px-3">I</button>

                        </div>
                    )}
                    <div className="flex flex-col w-full">
                        <p className="text-gray-600 font-medium text-sm">Chat</p>
                        <textarea
                            ref={textareaRef}
                            placeholder="Use ⌘K for shortcuts"
                            onMouseUp={handleSelection}
                            onKeyUp={handleSelection}
                            value={composerText}
                            onChange={(e) => {
                                setComposerText(e.target.value);
                                if (textareaRef.current) {
                                    textareaRef.current.style.height = "auto";
                                    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                                }
                            }}
                            rows={1}
                            className="w-full bg-transparent outline-none text-base overflow-hidden placeholder-gray-400 resize-none"
                            style={{ minHeight: '40px', maxHeight: '200px' }}
                        />
                    </div>

                    <button className="text-gray-600 hover:text-black font-medium text-sm px-3 border-r border-gray-300">
                        Send
                    </button>
                    <button className="text-gray-600 hover:text-black font-medium text-sm">
                        <FiChevronDown size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
