import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST') {
    return res.status(405).json({ message: 'Wrong method 😴' })
  }
  try {
    const slugRef = doc(db, 'member', String(req.query['slug']))
    await setDoc(
      slugRef,
      {
        nickname: req.query['nickname'],
      },
      { merge: true }
    )

    return res
      .status(200)
      .json({ message: 'found 😎', data: req.query['nickname'] })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
