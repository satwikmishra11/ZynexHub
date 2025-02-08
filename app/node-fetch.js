const axios = require('axios');

async function getSentimentAnalysis(text) {
    try {
        const response = await axios.post('http://localhost:5001/analyze-sentiment', { text });
        return response.data.sentiment;
    } catch (error) {
        console.error('Error in sentiment analysis:', error);
    }
}

// Example usage in a route
app.post('/api/analyze-message', async (req, res) => {
    const { message } = req.body;
    const sentiment = await getSentimentAnalysis(message);
    res.json({ sentiment });
});
