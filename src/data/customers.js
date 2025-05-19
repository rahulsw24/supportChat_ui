export const customers = [
  {
    id: 1,
    name: "Luis - Github",
    lastMessage: "Hey! I have a question...",
    timestamp: "45m",
    messages: [
      {
        from: "customer",
        text: "I bought a product from your store...",
        time: "1m",
      },
      { from: "agent", text: "Let me look into this...", time: "Just now" },
    ],
  },
  {
    id: 2,
    name: "Priya - Google",
    lastMessage: "Thank you for your help!",
    timestamp: "10m",
    messages: [
      { from: "customer", text: "Can you help me with my order?", time: "15m" },
      { from: "agent", text: "Sure, what seems to be the issue?", time: "12m" },
      { from: "customer", text: "I received the wrong item.", time: "11m" },
      {
        from: "agent",
        text: "I apologize for the mistake. We'll fix it.",
        time: "10m",
      },
    ],
  },
  {
    id: 3,
    name: "Alex - Amazon",
    lastMessage: "When will my refund be processed?",
    timestamp: "2h",
    messages: [
      { from: "customer", text: "I returned my order last week.", time: "2h" },
      { from: "agent", text: "Refunds take 3-5 business days.", time: "2h" },
      {
        from: "customer",
        text: "When will my refund be processed?",
        time: "2h",
      },
    ],
  },
];
