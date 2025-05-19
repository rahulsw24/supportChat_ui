import React, { useState } from 'react';
import SidebarComponent from './components/SidebarComponent';
import ChatWindow from './components/ChatWindow';
import CopilotSidebar from './components/CopilotSidebar';
import { customers } from './data/customers'; //

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]); // Default to first

  return (
    <div className='flex h-screen bg-[#ede9fe]'>
      <SidebarComponent
        customers={customers}
        onSelectCustomer={setSelectedCustomer}
        selectedCustomer={selectedCustomer}
      />
      <ChatWindow customer={selectedCustomer} />
      <CopilotSidebar />
    </div>
  );
}

export default App;
