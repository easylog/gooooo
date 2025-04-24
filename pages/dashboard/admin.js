import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | EasyLog</title>
      </Head>
      <div className="container mt-4">
        <h1>EasyLog Dashboard</h1>
        
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Kunden</h5>
                <p className="card-text">Verwalten Sie Ihre Kunden und sehen Sie Änderungen.</p>
                <Link href="/customers">
                  <a className="btn btn-primary">Zu den Kunden</a>
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
                  <a className="btn btn-primary">Zum Journal</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
