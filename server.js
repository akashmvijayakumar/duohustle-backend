const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Duohustle AI assistant helping users and guiding them to WhatsApp 9074221883."
          },
          {
            role: "user",
            content: userMsg
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.json({ reply: "API error, check key." });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.json({ reply: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running"));