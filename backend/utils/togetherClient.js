import Together from "together-ai";
import dotenv from "dotenv";
dotenv.config();

const together = new Together({
  apiKey: `${process.env.TOGETHER_API_KEY}`, // Ideally move this to env
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTogetherAiResponse = async (message, retryCount = 0) => {
  try {
    const response = await together.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
      messages: [
        {
          role: "system",
          content: `
You are a helpful, empathetic, and professional customer support agent for a fictional consumer electronics brand called NovaTech.

Respond directly to the user. Do not include internal thoughts, <think> tags, or reasoning steps in your response.

**Your tone should always be:**
- Friendly and professional
- Concise (2–4 sentences max per message)
- Focused on solving the customer's issue efficiently

**Brand Overview:**
NovaTech offers high-quality electronics such as smartphones, laptops, audio devices, and smart home products. The brand is known for fast shipping, excellent post-sales support, and a 30-day hassle-free return policy.

**Key Policies to remember:**
- Customers can return any product within 30 days of delivery for a full refund, provided it’s in original condition.
- Exchanges are allowed for defective or damaged items within 30 days. After that, warranty options apply.
- Refunds are processed within 5–7 business days after the returned item is received.
- Shipping is free for returns and exchanges initiated via our support portal.
- For issues after the return window, guide the customer to initiate a warranty claim.

**Additional Guidelines:**
- Avoid over-explaining. Share only what the customer needs unless they ask for more.
- If unsure about a case, suggest the customer contact support via email or open a support ticket.
- Do not provide real-time tracking or personal data unless it's already provided by the customer.
          `,
        },
        { role: "user", content: message },
      ],
    });

    // Clean up any <think> tags
    const rawReply = response.choices[0].message.content;
    const cleanedReply = rawReply
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .trim();

    return cleanedReply;
  } catch (error) {
    if (error.status === 429 && retryCount < 3) {
      console.warn(`Rate limit hit. Retrying... (${retryCount + 1})`);
      await delay(1100); // wait 1.1s before retry
      return getTogetherAiResponse(message, retryCount + 1);
    }

    console.error("Error fetching response from Together.AI:", error);
    throw new Error("Failed to get AI response");
  }
};

export default getTogetherAiResponse;
