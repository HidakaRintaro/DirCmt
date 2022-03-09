import type { NextPage } from 'next'
import Head from 'next/head'
import { DirSection } from 'components/DirSection'
import { Footer } from 'components/Footer'
import { Heading } from 'components/Heading'
import { PreviewSection } from 'components/PreviewSection'
import { useRecoilValue } from 'recoil'
import { isSelectNoneState } from 'store/atoms/isSelectNoneAtome'
import { GA_TRACKING_ID } from 'utils/gtag'

const Home: NextPage = () => {
  const isSelectNone = useRecoilValue(isSelectNoneState)
  return (
    <div
      className={`flex min-h-screen flex-col bg-gray-50 ${
        isSelectNone ? 'select-none' : ''
      }`}
    >
      <Head>
        <title>TreeDesc</title>
        <meta
          name="description"
          content="ディレクトリ構成にコメントを振ることができるツールです。"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://treedesc.rintaro.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TreeDesc" />
        <meta
          property="og:description"
          content="ディレクトリ構成にコメントを振ることができるツールです。"
        />
        <meta property="og:site_name" content="TreeDesc" />
        <meta
          property="og:image"
          content="https://treedesc.rintaro.dev/facebook.png"
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@HidakaRintaro" />
        <meta
          property="twitter:description"
          content="ディレクトリ構成にコメントを振ることができるツールです。"
        />
        <meta
          property="twitter:image:src"
          content="https://treedesc.rintaro.dev/twitter.png"
        />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          `,
          }}
        />
      </Head>
      <header className="mt-2 text-center">
        <Heading title="TreeDesc" />
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
