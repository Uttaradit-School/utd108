import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const FriendShipDetails: NextPage = () => {
  const router = useRouter()
  const { uid } = router.query
  const [valid, setValid] = useState(0)
  useEffect(() => {
    fetch('/api/validuid?uid=' + uid)
      .then((res) => res.json())
      .then((data) => {
        setValid(data['data'])
      })
    return () => {
      setValid(0)
    }
  }, [uid])

  return valid ? (
    <div className="main-bg">
      <Head>
        <title>Friendship | UTD108</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="mb-4 text-xl">ข้อความถึง ...</h1>
          <div className="flex w-full items-center justify-center">
            <textarea
              placeholder="กรอกข้อความ"
              name="message"
              rows={8}
              className="text-md w-80 resize-none rounded-md
              p-3 caret-pink-500 shadow-sm ring-1 ring-slate-900/10 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>
          <div className="flex w-full items-center justify-center">
            <h1 className="text-md mt-2 mr-4">โดย: </h1>
            <input
              type="text"
              name="author"
              maxLength={16}
              className="mt-2 w-40 rounded p-2 text-center
            text-xs caret-pink-500 ring-0 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="ชื่อของคุณ"
            ></input>
          </div>
          <button className="mt-6 w-40 rounded-full bg-pink-300 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105 hover:bg-pink-400">
            <div>ส่ง</div>
          </button>
          <a href="/" className="mt-2 text-xs text-red-400 underline">
            สร้าง friendship ของคุณ
          </a>
        </main>
      </div>
    </div>
  ) : (
    <div>Invalid</div>
  )
}

export default FriendShipDetails
