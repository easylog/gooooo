// pages/journal/new.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SimpleAI from '../../components/SimpleAI';
import SimpleSpeech from '../../components/SimpleSpeech';

export default function NewJournalEntry() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    client: '',
    title: '',
    content: '',
    isPrivate: true
  });
  const [showAI, setShowAI] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
  
  function handleAIContent(content) {
    setFormData(prev => ({ ...prev, content }));
  }
  
  function handleTranscript(transcript) {
    setFormData(prev => ({ ...prev, content: transcript }));
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        router.push('/journal');
      } else {
        throw new Error('Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Fehler:', error);
      alert('Eintrag konnte nicht gespeichert werden');
    }
  }
  
  return (
    <>
      <Head>
        <title>Neuer Journal-Eintrag | EasyLog</title>
      </Head>
      <div className="container mt-4">
        <h2>Neuer Journal-Eintrag</h2>
        
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="card p-3">
              <div className="mb-3">
                <label htmlFor="client" className="form-label">Klient</label>
                <input
                  type="text"
                  className="form-control"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Titel</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Inhalt</label>
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  rows="6"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isPrivate"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isPrivate">
                  Privater Eintrag (nur für mich sichtbar)
                </label>
              </div>
              
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Eintrag speichern
                </button>
                
                <div>
                  <button 
                    type="button" 
                    className="btn btn-outline-primary me-2"
                    onClick={() => setShowAI(!showAI)}
                  >
                    KI-Assistent
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-outline-info"
                    onClick={() => setShowSpeech(!showSpeech)}
                  >
                    Spracheingabe
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          <div className="col-md-4">
            {showAI && <SimpleAI onContentGenerated={handleAIContent} />}
            {showSpeech && <SimpleSpeech onTranscriptChange={handleTranscript} />}
          </div>
        </div>
      </div>
    </>
  );
}
