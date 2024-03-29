import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api/firebase'

const FriendShipDetails: NextPage = () => {
  const router = useRouter()
  let { slug, uid } = router.query

  const [messages, setMessages] = useState<{
    gmail: string
    uid: string
    messages: {
      message: string
      sender: string
    }[]
  }>({
    uid: '',
    gmail: '',
    messages: [
      {
        message: '',
        sender: '',
      },
    ],
  })
  const [index, setIndex] = useState(0)

  const backHandler = (e: any) => {
    router.push('/friendship/details')
  }

  const forwardClick = (e: any) => {
    setIndex((index + 1) % messages.messages.length)
  }

  const backClick = (e: any) => {
    if (index - 1 < 0) {
      setIndex(messages.messages.length - 1)
    } else {
      setIndex(index - (1 % messages.messages.length))
    }
  }

  useEffect(() => {
    const fetchData = async (slug: string) => {
      const res = await fetch('/api/getmessages?slug=' + slug)
      if (res.status === 404) {
        router.push('/friendship/login')
      }
      const data = await res.json()
      setMessages(data['data'])
    }

    if (router.isReady) {
      const storage_slug = slug || window.localStorage.getItem('slug')
      const storage_uid = uid || window.localStorage.getItem('uid')
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (
            storage_slug != undefined &&
            storage_uid != undefined &&
            storage_uid == user.uid
          ) {
            return fetchData(String(storage_slug))
          }
        }
        router.push('/friendship/login')
      })
    }
  }, [slug])

  return (
    <div className="main-bg">
      <Head>
        <title>Messages | UTD108</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center p-8 font-display">
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <div className="flex items-center justify-center">
            <div className="text-md w-80 rounded-lg bg-white shadow-xl ring-1 ring-slate-900/5">
              {messages && (
                <div className="space-y-2 p-6 2xl:p-8">
                  <p className="text-sm leading-6 text-slate-600">
                    {
                      messages.messages[messages.messages.length - index - 1]
                        .message
                    }
                  </p>
                  <div className="text-right text-sm font-medium italic leading-6 text-pink-400 duration-300 ease-in-out hover:text-pink-600">
                    {
                      messages.messages[messages.messages.length - index - 1]
                        .sender
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
          <nav>
            <ul className="mt-4 inline-flex">
              <li>
                <button
                  className="focus:shadow-outline h-10 rounded-l-lg border bg-white px-5 duration-300 ease-in-out hover:scale-105"
                  onClick={backClick}
                >
                  <BsArrowLeft />
                </button>
              </li>
              <li>
                <div className="focus:shadow-outline h-10 border bg-white px-5">
                  <div className="mt-2 mb-2">
                    {index + 1 + '/' + messages.messages.length}
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="focus:shadow-outline h-10 rounded-r-lg border bg-white px-5 duration-300 ease-in-out hover:scale-105"
                  onClick={forwardClick}
                >
                  <BsArrowRight />
                </button>
              </li>
            </ul>
          </nav>

          <button
            className="mt-10 w-40 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105"
            onClick={backHandler}
          >
            กลับ
          </button>
        </div>
      </div>
    </div>
  )
}

export default FriendShipDetails
