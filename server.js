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
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `You are Duohustle AI assistant. Help users and guide them to WhatsApp 9074221883.\nUser: ${userMsg}`
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2)); // DEBUG

    let reply = data.output_text || "No response";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running"));