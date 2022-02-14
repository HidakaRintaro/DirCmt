import type { NextPage } from 'next'
import Head from 'next/head'
import { DirSection } from 'components/DirSection'
import { Footer } from 'components/Footer'
import { Heading } from 'components/Heading'
import { PreviewSection } from 'components/PreviewSection'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>DirCmt</title>
        <meta
          name="description"
          content="ディレクトリ構成にコメントを振ることができるツールです。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="mt-2 text-center">
        <Heading title="DirCmt" />
      </header>
      <main className="container mx-auto mt-6 max-w-5xl">
        <div>
          <DirSection />
          <PreviewSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
