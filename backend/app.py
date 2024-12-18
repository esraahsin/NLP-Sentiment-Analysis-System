from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
import spacy

from flask_cors import CORS
app = Flask(__name__)
CORS(app)


# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Initialize VADER
analyzer = SentimentIntensityAnalyzer()

# Load and preprocess the Sentiment140 dataset
df = pd.read_csv('training.1600000.processed.noemoticon.csv', encoding='ISO-8859-1', header=None)
df.columns = ['target', 'ids', 'date', 'flag', 'user', 'text']
df['label'] = df['target'].apply(lambda x: 'Positive' if x == 4 else 'Negative')

# Train the logistic regression model
tfidf = TfidfVectorizer(max_features=5000)
X = tfidf.fit_transform(df['text'])
y = df['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')

    # Lexical Analysis
    lexicon_sentiment = analyzer.polarity_scores(text)['compound']
    lexicon_label = (
        "Positive" if lexicon_sentiment >= 0.05 else
        "Negative" if lexicon_sentiment <= -0.05 else
        "Neutral"
    )

    # Syntactic Analysis
    doc = nlp(text)
    syntax = {
        "tokens": [token.text for token in doc],
        "pos_tags": [token.pos_ for token in doc],
        "dependencies": [token.dep_ for token in doc],
        "named_entities": [(ent.text, ent.label_) for ent in doc.ents]
    }

    # Machine Learning Prediction
    tfidf_features = tfidf.transform([text])
    ml_prediction = model.predict(tfidf_features)[0]

    # Combine Results
    result = {
        "text": text,
        "lexical_analysis": lexicon_label,
        "syntactic_analysis": syntax,
        "ml_prediction": ml_prediction,
        "combined_sentiment": (
            "Positive" if lexicon_sentiment > 0.5 else
            "Negative" if lexicon_sentiment < -0.5 else
            ml_prediction
        )
    }

    return jsonify(result)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
