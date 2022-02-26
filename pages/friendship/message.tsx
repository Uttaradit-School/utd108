import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../../components/SideBar'

const FriendShipDetails: NextPage = () => {
  return (
    <div className="main-bg">
      <Head>
        <title>Friendship | UTD108</title>
      </Head>
      <SideBar />
      <div className="flex min-h-screen flex-col items-center justify-center py-2 font-display">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-4xl">Message Page</h1>
        </main>
      </div>
    </div>
  )
}

export default FriendShipDetails
