// components/JournalList.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JournalList() {
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch('/api/journal');
      const data = await res.json();
      setEntries(data);
    }
    fetchEntries();
  }, []);
  
  return (
    <div>
      <h2>Journal</h2>
      <Link href="/journal/new">
        <button className="btn btn-primary mb-3">Neuer Eintrag</button>
      </Link>
      
      <div className="row">
        {entries.map(entry => (
          <div key={entry._id} className="col-md-4 mb-3">
            <div className={`card h-100 ${entry.isPrivate ? 'border-warning' : 'border-info'}`}>
              <div className="card-header">
                {entry.client}
                {entry.isPrivate ? (
                  <span className="badge bg-warning float-end">Privat</span>
                ) : (
                  <span className="badge bg-info float-end">Team</span>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{entry.title}</h5>
                <p className="card-text">{entry.content.substring(0, 100)}...</p>
              </div>
              <div className="card-footer text-muted">
                {new Date(entry.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
