import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../pages/api/firebase'
import { useRouter } from 'next/router'

const FriendShipDetails: NextPage = () => {
  const router = useRouter()
  const { slug, uid } = router.query

  const [nickname, setNickname] = useState('')
  const logout = async () => {
    try {
      signOut(auth)
    } catch (e) {
      console.log(String(e))
    }
  }

  useEffect(() => {
    const fetchData = async (slug: string) => {
      try {
        const res = await fetch('/api/getNickname?slug=' + slug)
        const data = await res.json()
        setNickname(data['data'])
        window.localStorage.setItem('nickname', data['data'])
      } catch (e) {
        console.log(String(e))
      }
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
            fetchData(String(storage_slug))
          } else {
            router.push('/friendship/login')
          }
        } else {
          router.push('/friendship/login')
        }
      })
    }
  }, [slug])

  const [copySuccess, setCopySuccess] = useState('')

  const friendshipHandler = (e: any) => {
    router.push('/friendship/message')
  }

  const nicknameHandler = (e: any) => {
    setNickname(e.target.value)
  }

  const postNickname = async () => {
    try {
      const storage_slug = slug || window.localStorage.getItem('slug')
      const storage_nickname =
        nickname || window.localStorage.getItem('nickname')
      const res = await fetch(
        `/api/setNickname?slug=${storage_slug}&nickname=${storage_nickname}`,
        {
          method: 'POST',
        }
      )
      const data = await res.json()
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
              className="cursor-pointer"
              onClick={() =>
                copyToClipBoard(
                  'https://utd108.vercel.app/friendship/' +
                    (router.isReady
                      ? slug != undefined
                        ? slug
                        : window.localStorage.getItem('slug')
                      : 'xxxxxx')
                )
              }
            >
              <div className="inline-flex select-none rounded-lg bg-slate-800 px-6 py-4 text-center font-sans text-sm font-semibold text-slate-200 shadow-lg ring-0 ring-slate-900/5 duration-300 ease-in-out hover:scale-105">
                {'https://utd108.vercel.app/friendship/' +
                  (router.isReady
                    ? slug != undefined
                      ? slug
                      : window.localStorage.getItem('slug')
                    : 'xxxxxx')}
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
          <button
            className="mt-3 w-80 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105"
            onClick={friendshipHandler}
          >
            อ่าน Friendship
          </button>
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
