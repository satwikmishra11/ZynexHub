# sentiment_analysis_service.py
from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text', '')
    analysis = TextBlob(text)
    sentiment = analysis.sentiment.polarity
    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(port=5001)
