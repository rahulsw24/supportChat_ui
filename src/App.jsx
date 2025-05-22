import React, { useState } from 'react';
import SidebarComponent from './components/SidebarComponent';
import ChatWindow from './components/ChatWindow';
import CopilotSidebar from './components/CopilotSidebar';
import { customers } from './data/customers'; //
import { FiInbox } from "react-icons/fi";

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [composerText, setComposerText] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);

  return (
    <div className='flex h-[100dvh] bg-[#ede9fe] relative'>

      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-1/2 left-0 transform -translate-y-1/2 z-30 bg-white border border-indigo-300 text-indigo-600 hover:bg-indigo-100 px-2 py-1 rounded-r-md shadow-md"
      >
        ▷
      </button>

      {/* Copilot Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-purple-600 text-white px-3 py-1 rounded-md shadow-lg"
        onClick={() => setShowCopilot(!showCopilot)}
      >
        {showCopilot ? "Hide Copilot" : "Show Copilot"}
      </button>

      <SidebarComponent
        customers={customers}
        onSelectCustomer={(customer) => {
          setSelectedCustomer(customer);
          setSidebarOpen(false);
        }}
        selectedCustomer={selectedCustomer}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ChatWindow
        customer={selectedCustomer}
        composerText={composerText}
        setComposerText={setComposerText}
      />

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
