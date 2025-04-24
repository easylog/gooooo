// pages/journal/index.js
import Head from 'next/head';
import JournalList from '../../components/JournalList';

export default function JournalPage() {
  return (
    <>
      <Head>
        <title>Journal | EasyLog</title>
      </Head>
      <div className="container mt-4">
        <JournalList />
      </div>
    </>
  );
}
