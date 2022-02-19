import type { NextPage } from 'next'
import Head from 'next/head'
import { DirSection } from 'components/DirSection'
import { Footer } from 'components/Footer'
import { Heading } from 'components/Heading'
import { PreviewSection } from 'components/PreviewSection'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Head>
        <title>DirCmt</title>
        <meta
          name="description"
          content="ディレクトリ構成にコメントを振ることができるツールです。"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://dircmt.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DirCmt" />
        <meta
          property="og:description"
          content="ディレクトリ構成にコメントを振ることができるツールです。"
        />
        <meta property="og:site_name" content="DirCmt" />
        <meta
          property="og:image"
          content="https://dircmt.vercel.app/facebook.png"
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@HidakaRintaro" />
        <meta
          property="twitter:description"
          content="ディレクトリ構成にコメントを振ることができるツールです。"
        />
        <meta
          property="twitter:image:src"
          content="https://dircmt.vercel.app/twitter.png"
        />
      </Head>
      <header className="mt-2 text-center">
        <Heading title="DirCmt" />
      </header>
      <main className="container mx-auto mt-3 max-w-[90%] flex-1 sm:mt-6 lg:max-w-5xl">
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
