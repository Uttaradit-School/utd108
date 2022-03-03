import type { NextPage } from 'next'
import Head from 'next/head'

import { useRouter } from 'next/router'

const DonePage: NextPage = () => {
  const router = useRouter()
  const createFriendShip = (e: any) => {
    router.push('/')
  }

  return (
    <div className="main-bg">
      <Head>
        <title>Friendship | UTD108</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-3xl font-bold">ส่งข้อความสำเร็จ!</h1>
          <button
            onClick={createFriendShip}
            className="mt-6 w-80 rounded-full bg-pink-300 px-6 py-4 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105 hover:bg-pink-400"
          >
            <div>สร้าง Friendship ของคุณ</div>
          </button>
        </main>
      </div>
    </div>
  )
}

export default DonePage
