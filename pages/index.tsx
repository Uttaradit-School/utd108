import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="main-bg">
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <Head>
          <title>Home | UTD108</title>
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-6xl font-bold">
            Hello <a className="text-blue-600">UTD108!</a>
          </h1>

          <p className="mt-3 text-2xl">It's been a long journey..</p>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <Link href="/friendship/login">
              <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Friendship &rarr;</h3>
                <p className="mt-4 text-xl">ร่วมเขียนความทรงจำของกันและกัน</p>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
