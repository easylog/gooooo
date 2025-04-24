// pages/customers/index.js
import Head from 'next/head';
import CustomerList from '../../components/CustomerList';

export default function CustomersPage() {
  return (
    <>
      <Head>
        <title>Kunden | EasyLog</title>
      </Head>
      <div className="container mt-4">
        <CustomerList />
      </div>
    </>
  );
}
