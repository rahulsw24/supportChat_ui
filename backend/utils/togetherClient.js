import Together from "together-ai";

const together = new Together({
  apiKey: "tgp_v1_CWcDAPxieC5oTxBhy2sMt5NQylisPXCsekcP_zrLIQo",
});

const getTogetherAiResponse = async (message) => {
  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        { role: "system", content: "You are a helpful travel guide." },
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

// const response = await together.chat.completions.create({
//   model: "meta-llama/Llama-3-8b-chat-hf",
//   messages: [
//     { role: "system", content: "You are a helpful travel guide." },
//     { role: "user", content: "What are some fun things to do in New York?" },
//   ],
// });

// console.log(response.choices[0].message.content);
