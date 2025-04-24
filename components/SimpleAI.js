// components/SimpleAI.js
import { useState } from 'react';

export default function SimpleAI({ onContentGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function generateContent() {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      onContentGenerated(data.content);
      setPrompt('');
    } catch (error) {
      console.error('Fehler:', error);
      alert('Fehler bei der Generierung');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="card mb-3">
      <div className="card-header bg-primary text-white">KI-Assistent</div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Was soll generiert werden?</label>
          <textarea 
            className="form-control" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={generateContent}
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generiere...' : 'Mit KI generieren'}
        </button>
      </div>
    </div>
  );
}
