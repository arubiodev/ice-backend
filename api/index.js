// sentimentServer.js
const express = require('express');
const sentiment = require('sentiment');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware.
app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

const sentimentAnalyzer = new sentiment();

// Word lists
const positiveWords = ["kekw", "kekleo", "omegalul","nodders", "clap", "cheer", "laugh", "pog", "haha","lol","lul","ww","goat","cat","kat"];
const negativeWords = ["patrick","yoink","pussy","sleep","mf","police","shut", "angry","zz","lame", "patrik","broken","simp","lll","bot","nigg","stfu","cheat", "nontent","tent", "disapoint", "shit","**","croag","end","ass","bs", "fuck", "gay", "quit", "rigged", "scam", "boring", "kick", "leech", "fake", "dumb", "retard", "bs", "wtf", "pressed", "beta", "scam", "rob", "pdf", "pedo"];

// Analyze the message
app.post('/analyze', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  let classification = 'Neutral';

  // Normalize the message
  const normalizedMessage = text.toLowerCase();

  // Check for positive or negative words first
  if (negativeWords.some((word) => normalizedMessage.includes(word))) {
    classification = 'Negative';
  } else if (positiveWords.some((word) => normalizedMessage.includes(word))) {
    classification = 'Positive';
  } else {
    // If no match, use sentiment analysis
    const result = sentimentAnalyzer.analyze(text);

    if (result.score > 0) {
      classification = 'Positive';
    } else if (result.score < 0) {
      classification = 'Negative';
    }
  }

  return res.json({ sentiment: classification });
});

app.listen(port, () => {
  console.log(`Sentiment server running on http://localhost:${port}`);
});
