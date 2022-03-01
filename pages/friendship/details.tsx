import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../pages/api/firebase'
import { useRouter } from 'next/router'

const FriendShipDetails: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const [nickname, setNickname] = useState('')

  const logout = async () => {
    try {
      signOut(auth)
    } catch (e) {
      console.log(String(e))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/getNickname?slug=' + slug)
        const data = await res.json()
        setNickname(data['data'])
      } catch (e) {
        console.log(String(e))
      }
    }

    if (router.isReady) {
      onAuthStateChanged(auth, (user) => {
        if (!user || slug == undefined) {
          router.push('/friendship/login')
        } else {
          fetchData()
        }
      })
    }
  }, [slug])

  const [copySuccess, setCopySuccess] = useState('')

  const nicknameHandler = (e: any) => {
    setNickname(e.target.value)
  }

  const postNickname = async () => {
    try {
      const res = await fetch(
        `/api/setNickname?slug=${slug}&nickname=${nickname}`,
        {
          method: 'POST',
        }
      )
      const data = await res.json()
      if (data['data'] == nickname) {
        console.log('Done 😘')
      }
    } catch (e) {
      console.log(String(e))
    }
  }

  const submitHandler = (e: any) => {
    postNickname()
  }

  const copyToClipBoard = async (copyMe: any) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      setCopySuccess('Copied!')
      console.log('✔ Copied')
    } catch (err) {
      console.log('🤦‍♂️ Failed to copy!')
    }
  }
  return (
    <div className="main-bg">
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <Head>
          <title>Details | UTD108</title>
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="mb-4 text-xl">Link Friendship ของคุณ</h1>
          {copySuccess ? (
            <span className="text-pink-400">ก๊อปให้แล้วจ้าา~!</span>
          ) : null}
          <div>
            <a
              href="#"
              onClick={() =>
                copyToClipBoard('haiiyaaa this one is copied text!')
              }
            >
              <div className="inline-flex select-none rounded-lg bg-slate-800 px-6 py-4 text-center font-sans text-sm font-semibold text-slate-200 shadow-lg ring-0 ring-slate-900/5 duration-300 ease-in-out hover:scale-105">
                {'https://utd108.social/friendship/' +
                  (router.isReady ? slug : 'xxxxxx')}
              </div>
            </a>
          </div>
          <div className="mt-3 mb-4 flex w-full items-center justify-center">
            <h1 className="text-md mt-2 mr-4">ชื่อ: </h1>
            <input
              type="text"
              name="author"
              maxLength={16}
              value={nickname}
              className="w-30 mt-2 rounded-full border p-2
            text-center text-xs caret-pink-500 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your nickname"
              required
              onChange={nicknameHandler}
            ></input>
            <button
              className="w-30 ml-2 mt-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105"
              onClick={submitHandler}
            >
              บันทึก
            </button>
          </div>
          <Link href={'/friendship/message?slug=' + slug}>
            <button className="mt-3 w-80 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105">
              อ่าน Friendship
            </button>
          </Link>
          <div onClick={logout}>
            <button className="mt-3 w-80 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105">
              ออกจากระบบ
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FriendShipDetails
