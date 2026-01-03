import Head from 'next/head'
import Chat from '../components/Chat'

export default function Home() {
  return (
    <>
      <Head>
        <title>ArcheoHub — Prototype</title>
      </Head>
      <main style={{ padding: 20, fontFamily: 'Inter, sans-serif' }}>
        <h1>ArcheoHub (Prototype)</h1>
        <p>Ask a question and get answers with sources (prototype).</p>
        <Chat />
      </main>
    </>
  )
}
