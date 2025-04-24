// pages/api/customers.js
import { connectToDatabase } from '../../lib/mongodb';
import Customer from '../../models/Customer';

export default async function handler(req, res) {
  await connectToDatabase();
  
  if (req.method === 'GET') {
    const customers = await Customer.find({});
    return res.status(200).json(customers);
  }
  
  if (req.method === 'POST') {
    const { name, contactPerson, email } = req.body;
    const customer = new Customer({ name, contactPerson, email, createdBy: req.session.user.id });
    await customer.save();
    return res.status(201).json(customer);
  }
  
  return res.status(405).json({ message: 'Methode nicht erlaubt' });
}
