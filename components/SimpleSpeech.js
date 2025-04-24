// components/SimpleSpeech.js
import { useState, useEffect } from 'react';

export default function SimpleSpeech({ onTranscriptChange }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);
  
  function toggleListening() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }
  
  function startListening() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'de-DE';
      recognition.continuous = true;
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        onTranscriptChange(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
      setIsListening(true);
      window.recognition = recognition;
    } catch (error) {
      console.error('Fehler:', error);
      alert('Spracherkennung wird nicht unterstützt');
    }
  }
  
  function stopListening() {
    if (window.recognition) {
      window.recognition.stop();
    }
    setIsListening(false);
  }
  
  if (!isSupported) {
    return <div className="alert alert-warning">Spracherkennung wird nicht unterstützt</div>;
  }
  
  return (
    <div className="card mb-3">
      <div className="card-header bg-info text-white">Spracherkennung</div>
      <div className="card-body">
        <button 
          className={`btn ${isListening ? 'btn-danger' : 'btn-info'}`}
          onClick={toggleListening}
        >
          {isListening ? 'Aufnahme stoppen' : 'Spracheingabe starten'}
        </button>
        
        {isListening && (
          <div className="alert alert-info mt-3">
            Aufnahme läuft... Sprechen Sie jetzt.
          </div>
        )}
        
        {transcript && (
          <div className="mt-3">
            <h6>Erkannter Text:</h6>
            <p className="border p-2">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
}
