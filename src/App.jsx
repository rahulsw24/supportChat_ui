import React, { useState } from 'react';
import SidebarComponent from './components/SidebarComponent';
import ChatWindow from './components/ChatWindow';
import CopilotSidebar from './components/CopilotSidebar';
import { customers } from './data/customers'; //

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]); // Default to first
  const [composerText, setComposerText] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);

  return (
    <div className='flex h-screen bg-[#ede9fe]'>
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white px-3 py-2 rounded-md"
      >
        ☰ Inbox
      </button>
      <SidebarComponent
        customers={customers}
        onSelectCustomer={setSelectedCustomer}
        selectedCustomer={selectedCustomer}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ChatWindow customer={selectedCustomer} composerText={composerText}
        setComposerText={setComposerText} />
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-purple-600 text-white px-3 py-1 rounded-md shadow-lg"
        onClick={() => setShowCopilot(!showCopilot)}
      >
        {showCopilot ? "Hide Copilot" : "Show Copilot"}
      </button>

      {/* Copilot Sidebar */}
      <div
        className={`
    ${showCopilot ? "block" : "hidden"}
    fixed md:static top-0 right-0 z-40 h-full w-full md:w-1/3 bg-white shadow-lg
    md:block
  `}
      >
        <CopilotSidebar
          customer={selectedCustomer}
          setComposerText={setComposerText}
          onClose={() => setShowCopilot(false)}
        />
      </div>

    </div>
  );
}

export default App;
