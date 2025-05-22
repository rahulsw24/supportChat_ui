const express = require("express");
const axios = require("axios");
const cors = require("cors");
const {
  getTogetherAiResponse,
  getTogetherCustomerResponse,
} = require("./utils/togetherClient");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
console.log("PORT from env:", process.env.PORT);
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/api/generate-reply", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });
  try {
    const response = await getTogetherAiResponse(message);
    return res.status(200).json({ reply: response });
  } catch (err) {
    console.error("Together.AI Error", err.message);
    return res.status(500).json({ error: "Failed to get AI response" });
  }
});
app.post("/api/generate-customer", async (req, res) => {
  const { latestAgentMessage, persona } = req.body;

  if (!latestAgentMessage || typeof latestAgentMessage !== "string") {
    return res
      .status(400)
      .json({ error: "latestAgentMessage must be a string" });
  }

  try {
    const reply = await getTogetherCustomerResponse(
      latestAgentMessage,
      persona
    );
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Together.AI Error (customer)", err.message);
    return res
      .status(500)
      .json({ error: "Failed to generate customer message" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
