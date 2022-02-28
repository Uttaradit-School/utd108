import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Link from 'next/link'

const FriendShipDetails: NextPage = () => {
  const router = useRouter()
  const { uid } = router.query
  console.log(uid)
  return (
    <div className="main-bg">
      <Head>
        <title>Messages | UTD108</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center p-8 font-display">
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <div className="flex items-center justify-center">
            <div className="text-md w-80 rounded-lg bg-white shadow-xl ring-1 ring-slate-900/5">
              <div className="space-y-2 p-6 2xl:p-8">
                <p className="text-sm leading-6 text-slate-600">
                  ดีใจด้วยนะที่เธอเริ่มต้นใหม่สักที
                  ดีใจด้วยนะที่พบเจอความสุขสักที ต่างกันกับฉันที่ยังคงจมอยู่
                  เหมือนว่ายังมีเธออยู่
                  ฉันต้องการจะลืมมันเหมือนที่เธอลืมฉันวันนี้{' '}
                </p>
                <div className="text-right text-sm font-medium italic leading-6 text-pink-400 duration-300 ease-in-out hover:text-pink-600">
                  Ink Waruntorn
                </div>
              </div>
            </div>
          </div>
          <nav>
            <ul className="mt-4 inline-flex">
              <li>
                <button className="focus:shadow-outline h-10 rounded-l-lg border bg-white px-5 duration-300 ease-in-out hover:scale-105">
                  <BsArrowLeft />
                </button>
              </li>
              <li>
                <div className="focus:shadow-outline h-10 border bg-white px-5">
                  <div className="mt-2 mb-2">1/2</div>
                </div>
              </li>
              <li>
                <button className="focus:shadow-outline h-10 rounded-r-lg border bg-white px-5 duration-300 ease-in-out hover:scale-105">
                  <BsArrowRight />
                </button>
              </li>
            </ul>
          </nav>
          <Link href="/friendship/details">
            <button className="mt-10 w-40 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105">
              กลับ
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FriendShipDetails
