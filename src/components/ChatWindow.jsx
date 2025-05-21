import React, { useRef, useState, useEffect } from 'react';
import { getAvatarColor } from '../utils/getAvatarColor';
import { FiChevronDown } from "react-icons/fi";
import axios from 'axios';

function ChatWindow({ customer, composerText, setComposerText }) {
    const [selection, setSelection] = useState({ start: 0, end: 0, text: '' });
    const [showCopilotOptions, setShowCopilotOptions] = useState(false);
    const textareaRef = useRef(null);

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
            setShowCopilotOptions(false);
        }
    };

    const applyFormatting = (wrapper) => {
        const before = composerText.slice(0, selection.start);
        const after = composerText.slice(selection.end);
        const formatted = `${wrapper}${selection.text}${wrapper}`;
        setComposerText(before + formatted + after);
        setSelection({ start: 0, end: 0, text: '' });
    };

    const handleBold = () => applyFormatting('**');
    const handleItalic = () => applyFormatting('*');


    const handleCopilotOption = async (type) => {
        const promptMap = {
            'paraphrase': `Paraphrase this: ${selection.text}`,
            'tone': `Change the tone of this to be more friendly: ${selection.text}`,
            'polite': `Make this message more polite: ${selection.text}`
        };

        const prompt = promptMap[type];
        const before = composerText.slice(0, selection.start);
        const after = composerText.slice(selection.end);

        try {
            const response = await axios.post('http://localhost:3000/api/generate-reply', {
                message: prompt
            });

            const aiText = response.data.reply?.trim() || '[AI: no response]';
            setComposerText(before + aiText + after);
        } catch (err) {
            console.error("Error fetching response from Together.AI:", err);
            alert("Failed to generate AI reply.");
        }

        setSelection({ start: 0, end: 0, text: '' });
        setShowCopilotOptions(false);
    };

    const mockTogetherAiCall = async (prompt) => {
        // Simulate AI delay and response
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`[AI: ${prompt}]`);
            }, 600);
        });
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [composerText]);

    if (!customer) return <div className="flex-1 bg-white p-6">No customer selected.</div>;

    const avatarColor = getAvatarColor(customer.name);
    const customerInitial = customer.name.charAt(0).toUpperCase();

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
                            <div className={`mr-2 flex-shrink-0 w-8 h-8 text-white flex items-center justify-center rounded-full font-medium text-sm ${avatarColor}`}>
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
                                    <img src="https://i.pravatar.cc/24?img=3" alt="Agent" className="w-5 h-5 rounded-full ml-2" />
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
                        <div className="absolute bottom-[100px] left-4 flex gap-2 bg-white border shadow-md px-3 py-1 rounded-lg z-50">
                            {/* AI button with dropdown */}
                            <div className="relative">
                                <button onClick={() => setShowCopilotOptions(prev => !prev)} className="text-purple-600 border-r border-gray-200 px-3">
                                    🤖
                                </button>
                                {showCopilotOptions && (
                                    <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg z-50">
                                        <button onClick={() => handleCopilotOption('paraphrase')} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Paraphrase</button>
                                        <button onClick={() => handleCopilotOption('tone')} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Change Tone</button>
                                        <button onClick={() => handleCopilotOption('polite')} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Make Polite</button>
                                    </div>
                                )}
                            </div>

                            <button onClick={handleBold} className="font-bold border-r border-gray-200 px-3">B</button>
                            <button onClick={handleItalic} className="italic px-3">I</button>
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
