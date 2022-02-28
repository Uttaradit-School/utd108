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
          <h1 className="text-4xl">Write Page</h1>
        </main>
      </div>
    </div>
  ) : (
    <div>Invalid</div>
  )
}

export default FriendShipDetails
