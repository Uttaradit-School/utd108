import type { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'

import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../api/firebase'

const FriendShipAuth: NextPage = () => {
  const login = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      if (!result) {
        throw 'Login failed'
      }
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential ? credential.accessToken : null
      const user = result.user
      try {
        const payload = JSON.stringify({
          gmail: user['email'],
          uid: user['uid'],
        })

        const genid = await fetch('/api/genuid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        })
        const fetched = await genid.json()
        if (genid.status == 200) {
          console.log(fetched)
          window.localStorage.setItem('uid', user['uid'])
          window.localStorage.setItem('slug', fetched['refid'])

          Router.push('/friendship/details')
        } else {
          throw fetched['message']
        }
      } catch (e) {
        throw e
      }
    } catch (e) {
      return console.log(String(e))
    }
  }

  return (
    <div className="main-bg">
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <Head>
          <title>Login | UTD108</title>
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-4xl">UTD Friendship</h1>
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <a
              onClick={login}
              className="mt-6 w-64 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <FcGoogle size="40" />
              <h3 className="mt-2 text-2xl font-bold">
                เข้าสู่ระบบด้วย Google &rarr;
              </h3>
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FriendShipAuth
