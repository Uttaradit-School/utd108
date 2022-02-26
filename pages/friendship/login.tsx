import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const FriendShipAuth: NextPage = () => {
  return (
    <div className="main-bg">
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <Head>
          <title>เข้าสู่ระบบ | UTD108</title>
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-4xl">UTD Friendship</h1>
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <Link href="/friendship/details">
              <a className="mt-6 w-64 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">
                  เข้าสู่ระบบด้วย Google &rarr;
                </h3>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FriendShipAuth
