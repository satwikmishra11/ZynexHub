from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/api/sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    text = data.get('text', '')
    analysis = TextBlob(text)
    sentiment = analysis.sentiment.polarity
    return jsonify({'sentiment': sentiment})

# This part is for local development, Vercel uses the 'app' variable directly
if __name__ == '__main__':
    app.run(port=5001)
