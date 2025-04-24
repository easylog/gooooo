// pages/api/ai-generate.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  }
  
  try {
    const { prompt } = req.body;
    
    // Hier würden Sie normalerweise die OpenAI API aufrufen
    // Für dieses Beispiel verwenden wir eine einfache Simulation
    const generatedContent = `Hier ist ein professioneller Eintrag basierend auf Ihrer Anfrage: "${prompt}"
    
    ${new Date().toLocaleDateString()}
    
    Sehr geehrte Damen und Herren,
    
    bezugnehmend auf Ihre Anfrage möchte ich Ihnen mitteilen, dass wir die gewünschten Änderungen vorgenommen haben. Die Implementierung wurde erfolgreich abgeschlossen und alle Funktionen wurden getestet.
    
    Mit freundlichen Grüßen,
    Ihr EasyLog-Team`;
    
    return res.status(200).json({ content: generatedContent });
  } catch (error) {
    console.error('Fehler bei der KI-Generierung:', error);
    return res.status(500).json({ message: 'Fehler bei der KI-Generierung' });
  }
}
