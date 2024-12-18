import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze', { text });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sentiment Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Analyze</button>
      </form>

      {analysis && (
        <div style={{ marginTop: '20px' }}>
          <h2>Analysis Result</h2>
          <p><strong>Text:</strong> {analysis.text}</p>
          <p><strong>Lexical Analysis:</strong> {analysis.lexical_analysis}</p>
          <p><strong>Machine Learning Prediction:</strong> {analysis.ml_prediction}</p>
          <h3>Syntactic Analysis</h3>
          <ul>
            {analysis.syntactic_analysis.tokens.map((token, index) => (
              <li key={index}>
                <strong>{token}</strong> (POS: {analysis.syntactic_analysis.pos_tags[index]}, Dependency: {analysis.syntactic_analysis.dependencies[index]})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
