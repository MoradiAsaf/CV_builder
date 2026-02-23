const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// In-memory storage
let cvData = null;

// Save CV data
app.post("/api/cv/save", (req, res) => {
  cvData = req.body.cvData;
  res.json({ status: "saved" });
});

// Get CV data
app.get("/api/cv", (req, res) => {
  res.json({ cvData });
});

// Improve summary with AI
app.post("/api/improve-summary", async (req, res) => {
  try {
    const { summary } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Improve the following professional summary for a CV.\nMake it clear, concise and professional:\n${summary}`,
        },
      ],
    });
    const improvedText = completion.choices[0].message.content;
    res.json({ improvedText });
  } catch (error) {
    console.error("Error improving summary:", error.message);
    res.status(500).json({ error: "Failed to improve summary" });
  }
});

// Improve experience description with AI
app.post("/api/improve-experience", async (req, res) => {
  try {
    const { role, company, description } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Rewrite the following job experience description to sound professional and suitable for a CV.\nRole: ${role}\nCompany: ${company}\nDescription: ${description}`,
        },
      ],
    });
    const improvedText = completion.choices[0].message.content;
    res.json({ improvedText });
  } catch (error) {
    console.error("Error improving experience:", error.message);
    res.status(500).json({ error: "Failed to improve experience" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
