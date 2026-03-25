const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `You are a Duohustle AI assistant. Help users and guide them to WhatsApp 9074221883.\nUser: ${userMsg}`
      })
    });

    const data = await response.json();

    const reply = data.output?.[0]?.content?.[0]?.text || "Error getting response";

    res.json({ reply });

  } catch (err) {
    res.json({ reply: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running"));