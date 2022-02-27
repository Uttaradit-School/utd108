import type { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../api/firebase'

const FriendShipAuth: NextPage = () => {
  const login = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      if(!result){
        throw 'Login failed'
      }
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential ? credential.accessToken: null
      const user = result.user
      console.log(credential, token, user);
      Router.push('/friendship/details')
      
    } catch(e){
      return console.log(String(e));
    }
  }

  return (
    <div className="main-bg">
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <Head>
          <title>เข้าสู่ระบบ | UTD108</title>
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-4xl">UTD Friendship</h1>
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            {/* <Link href="/friendship/details"> */}
            <a
              onClick={login}
              className="mt-6 w-64 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">
                เข้าสู่ระบบด้วย Google &rarr;
              </h3>
            </a>
            {/* </Link> */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default FriendShipAuth
