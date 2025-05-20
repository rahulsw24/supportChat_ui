import Together from "together-ai";

const together = new Together({
  apiKey: "tgp_v1_CWcDAPxieC5oTxBhy2sMt5NQylisPXCsekcP_zrLIQo",
});

const getTogetherAiResponse = async (message) => {
  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, empathetic, and professional customer support agent for a fictional brand called NovaTech. Keep responses concise (2–4 sentences max), friendly, and direct. Avoid unnecessary details unless asked. Focus on solving the customer's issue efficiently.",
        },
        { role: "user", content: message },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response from Together.AI:", error);
    throw new Error("Failed to get AI response");
  }
};

export default getTogetherAiResponse;
