import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { signOut } from 'firebase/auth'
import { auth } from '../../pages/api/firebase'

const FriendShipDetails: NextPage = () => {
  const logout = async () => {
    try {
      signOut(auth)
    } catch (e) {
      console.log(String(e))
    }
  }

  const [copySuccess, setCopySuccess] = useState('')

  const copyToClipBoard = async (copyMe: any) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      setCopySuccess('Copied!')
      console.log('Copied!')
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
                https://utd108.vercel.app/friendship/xxxxxxxx
              </div>
            </a>
          </div>
          <button className="mt-3 w-80 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105">
            <Link href="/friendship/message">อ่าน Friendship</Link>
          </button>
          <button className="mt-3 w-80 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm duration-300 ease-in-out hover:scale-105">
            <div onClick={logout}>ออกจากระบบ</div>
          </button>
        </main>
      </div>
    </div>
  )
}

export default FriendShipDetails
