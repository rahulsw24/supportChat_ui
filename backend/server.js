const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { default: getTogetherAiResponse } = require("./utils/togetherClient");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(process.env.TOGETHER_API_KEY);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
