import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Überprüfen, ob der Benutzer angemeldet ist
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }

    // Ungelesene Änderungen abrufen
    if (session) {
      fetchUnreadChanges();
    }
  }, [session, status, router]);

  // Funktion zum Abrufen ungelesener Änderungen
  const fetchUnreadChanges = async () => {
    try {
      const response = await fetch('/api/customers');
      const customers = await response.json();
      
      // Zählen der Kunden mit ungelesenen Änderungen
      const unread = customers.filter(customer => customer.hasUnreadChanges).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Fehler beim Abrufen der ungelesenen Änderungen:', error);
    }
  };

  if (status === 'loading') {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | EasyLog</title>
      </Head>
      <div className="container mt-4">
        <h1>Admin Dashboard</h1>
        <p className="lead">Willkommen im Admin-Bereich von EasyLog</p>

        {/* Admin-spezifische Funktionen */}
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Benutzer verwalten</h5>
                <p className="card-text">Benutzerkonten erstellen, bearbeiten und löschen.</p>
                <Link href="/users">
                  <button className="btn btn-primary">Zu den Benutzern</button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Systemeinstellungen</h5>
                <p className="card-text">Konfigurieren Sie die Anwendungseinstellungen.</p>
                <Link href="/settings">
                  <button className="btn btn-primary">Zu den Einstellungen</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Kunden- und Journal-Karten */}
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  Kunden
                  {unreadCount > 0 && (
                    <span className="badge bg-danger ms-2">{unreadCount}</span>
                  )}
                </h5>
                <p className="card-text">Verwalten Sie Ihre Kunden und sehen Sie Änderungen.</p>
                <Link href="/customers">
                  <button className="btn btn-primary">Zu den Kunden</button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Journal</h5>
                <p className="card-text">Erstellen und verwalten Sie Journal-Einträge.</p>
                <Link href="/journal">
                  <button className="btn btn-primary">Zum Journal</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
