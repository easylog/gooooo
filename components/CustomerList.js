// components/CustomerList.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch('/api/customers');
      const data = await res.json();
      setCustomers(data);
    }
    fetchCustomers();
  }, []);
  
  return (
    <div>
      <h2>Kunden</h2>
      <Link href="/customers/new">
        <button className="btn btn-primary mb-3">Neuer Kunde</button>
      </Link>
      
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kontaktperson</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>
                <Link href={`/customers/${customer._id}`}>
                  {customer.name}
                  {customer.hasUnreadChanges && (
                    <span className="badge bg-danger ms-2">{customer.unreadChangesCount}</span>
                  )}
                </Link>
              </td>
              <td>{customer.contactPerson}</td>
              <td>
                {customer.hasUnreadChanges ? 
                  <span className="text-danger">Neue Änderungen</span> : 
                  <span className="text-success">Aktuell</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
