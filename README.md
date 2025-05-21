# SupportChat UI

A React-based user interface for the SupportChat application, designed to provide seamless customer support chat functionality.

## Features

- Real-time chat interface
- User authentication
- Responsive design
- Easy integration with backend APIs

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/supportChat_ui.git
cd supportChat_ui
npm install
```

### Running the App

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
supportChat_ui/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

# CopilotSidebar Component

A React sidebar component for integrating an AI Copilot chat experience into your support or messaging UI. This component provides a conversational interface powered by an AI backend, allowing users to interact with an AI assistant, view AI-generated replies, and easily add AI suggestions to their message composer.

## Features

- **AI Copilot Chat**: Displays a chat interface where users can interact with an AI assistant.
- **Initial AI Greeting**: Shows an intro message while the AI reads the conversation.
- **AI Reply Generation**: Sends the latest customer message to an AI backend and displays the AI's reply.
- **Add to Composer**: Allows users to add AI-generated replies directly to their message composer with a single click.
- **Responsive Design**: Works well on both desktop and mobile layouts.
- **Loading States**: Shows a "Thinking..." indicator or a branded intro while waiting for AI responses.
- **Customizable Tabs**: Includes tabs for "AI Copilot" and "Details" (expandable for more features).

## Usage

### Import

```bash
import CopilotSidebar from './components/CopilotSidebar';
```

Props
customer (object): The selected customer object, including their messages.
setComposerText (function): Function to set the text in your main message composer.
onClose (function): (Optional) Function to close the sidebar (useful for mobile).

<CopilotSidebar
  customer={selectedCustomer}
  setComposerText={setComposerText}
  onClose={handleCloseSidebar}
/>

API Requirements
This component expects an API endpoint at http://localhost:3000/api/generate-reply that accepts a POST request with a JSON body:

```bash
{ "message": "..." }
```

and returns:

```bash
{ "reply": "AI generated response" }
```

Customization
Styling: Uses Tailwind CSS utility classes for styling. You can adjust classes as needed.
Icons: Uses react-icons for the send and copy icons.
AI Branding: The AI avatar and intro message can be customized for your brand.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.

```

```
