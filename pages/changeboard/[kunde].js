export default function Kunden() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Kunden</h1>
      <p>Hier werden Ihre Kunden angezeigt.</p>
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          marginBottom: '10px',
          borderRadius: '5px'
        }}>
          <h3>Kunde 1</h3>
          <p>Email: kunde1@example.com</p>
          <p>Letzte Änderung: 25.04.2025</p>
          <span style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '3px 8px',
            borderRadius: '10px',
            fontSize: '12px'
          }}>2 neue Änderungen</span>
        </div>
        
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          marginBottom: '10px',
          borderRadius: '5px'
        }}>
          <h3>Kunde 2</h3>
          <p>Email: kunde2@example.com</p>
          <p>Letzte Änderung: 24.04.2025</p>
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
