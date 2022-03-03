import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaCircleNotch, FaUserTimes } from 'react-icons/fa'

const FriendShipDetails: NextPage = () => {
  const router = useRouter()

  const { uid } = router.query
  const [valid, setValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nickname, setNickname] = useState('')

  const [message, setMessage] = useState('')
  const [sender, setSender] = useState('')

  const messageHandler = (e: any) => {
    setMessage(e.target.value)
    console.log(message)
  }
  const senderHandler = (e: any) => {
    setSender(e.target.value)
    console.log(sender)
  }

  const submitHandler = async (e: any) => {
    if (message == '' || sender == '') {
      return
    }
    const res = await fetch('/api/addmessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: sender,
        message: message,
        slug: uid,
      }),
    })
    const data = await res.json()
    if (res.status == 500) {
      return console.log(data['message'])
    }
    setMessage('')
    setSender('')
    console.log('Done 😎')
    router.push('/friendship/done')
  }

  useEffect(() => {
    const fetchData = async (uid: string) => {
      const res = await fetch('/api/validuid?uid=' + uid)
      const data = await res.json()
      setValid(Boolean(data['data']))
      setNickname(data['nickname'])
      setLoading(false)
    }
    if (router.isReady) {
      setLoading(true)
      fetchData(String(uid))
    }
  }, [router.isReady])

  if (loading) {
    return (
      <div className="fixed h-screen w-screen items-center justify-center bg-white font-display opacity-75">
        <span className="flex h-screen w-screen items-center justify-center text-blue-500 opacity-75">
          <FaCircleNotch className="animate-spin" size={60} />
        </span>
      </div>
    )
  }
  if (!valid && !loading) {
    return (
      <div className="fixed h-screen w-screen items-center justify-center bg-white font-display opacity-75">
        <span className="flex h-screen w-screen items-center justify-center text-red-600 opacity-75">
          <FaUserTimes size={60} />
          ไม่พบผู้ใช้นี้น้าา~!
        </span>
      </div>
    )
  }

  return (
    <div className="main-bg">
      <Head>
        <title>Friendship | UTD108</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="mb-4 text-xl">{'ข้อความถึง ' + nickname}</h1>
          <div className="flex w-full items-center justify-center">
            <textarea
              placeholder="กรอกข้อความ"
              name="message"
              value={message}
              rows={8}
              className="text-md w-80 resize-none rounded-md
                p-3 caret-pink-500 shadow-sm ring-1 ring-slate-900/10 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={messageHandler}
            ></textarea>
          </div>
          <div className="flex w-full items-center justify-center">
            <h1 className="text-md mt-2 mr-4">โดย: </h1>
            <input
              type="text"
              name="author"
              value={sender}
              maxLength={16}
              className="mt-2 w-40 rounded p-2 text-center
                text-xs caret-pink-500 ring-0 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="ชื่อของคุณ"
              onChange={senderHandler}
            ></input>
          </div>
          <button
            className="mt-6 w-40 rounded-full bg-pink-300 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105 hover:bg-pink-400"
            onClick={submitHandler}
          >
            <div>ส่ง</div>
          </button>
          <a href="/" className="mt-2 text-xs text-red-400 underline">
            สร้าง friendship ของคุณ
          </a>
        </main>
      </div>
    </div>
  )
}

export default FriendShipDetails
