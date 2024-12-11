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

app.post('/analyze', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const result = sentimentAnalyzer.analyze(text);
  let classification = 'Neutral';

  if (result.score > 0) {
    classification = 'Positive';
  } else if (result.score < 0) {
    classification = 'Negative';
  }

  return res.json({ sentiment: classification });
});

app.listen(port, () => {
  console.log(`Sentiment server running on http://localhost:${port}`);
});
