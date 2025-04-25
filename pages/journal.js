export default function Journal() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Journal</h1>
      <p>Hier werden Ihre Journal-Einträge angezeigt.</p>
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          marginBottom: '10px',
          borderRadius: '5px'
        }}>
          <h3>Eintrag 1</h3>
          <p>Datum: 25.04.2025</p>
          <p>Inhalt: Dies ist ein Beispiel-Journaleintrag.</p>
          <p><small>Erstellt von: admin</small></p>
        </div>
        
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          marginBottom: '10px',
          borderRadius: '5px'
        }}>
          <h3>Eintrag 2</h3>
          <p>Datum: 24.04.2025</p>
          <p>Inhalt: Ein weiterer Beispiel-Journaleintrag.</p>
          <p><small>Erstellt von: staff</small></p>
        </div>
      </div>
      
      <a href="/" style={{ 
        padding: '10px 20px', 
        backgroundColor: '#0070f3', 
        color: 'white', 
        textDecoration: 'none',
        borderRadius: '5px',
        display: 'inline-block',
        marginTop: '20px'
      }}>
        Zurück zur Startseite
      </a>
    </div>
  );
}
