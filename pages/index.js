export default function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>EasyLog</h1>
      <p>Einfaches Logging und Change Management</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <a href="/kunden" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Kunden
        </a>
        
        <a href="/journal" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Journal
        </a>
      </div>
    </div>
  );
}
