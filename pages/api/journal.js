// pages/api/journal.js
import { connectToDatabase } from '../../lib/mongodb';
import Journal from '../../models/Journal';

export default async function handler(req, res) {
  await connectToDatabase();
  
  if (req.method === 'GET') {
    // Nur eigene oder öffentliche Einträge abrufen
    const entries = await Journal.find({
      $or: [
        { createdBy: req.session.user.id },
        { isPrivate: false }
      ]
    });
    return res.status(200).json(entries);
  }
  
  if (req.method === 'POST') {
    const { client, title, content, isPrivate } = req.body;
    const entry = new Journal({
      client,
      title,
      content,
      isPrivate: isPrivate !== undefined ? isPrivate : true,
      createdBy: req.session.user.id
    });
    await entry.save();
    return res.status(201).json(entry);
  }
  
  return res.status(405).json({ message: 'Methode nicht erlaubt' });
}
