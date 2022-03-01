import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST') {
    return res.status(405).json({ message: 'Wrong method 😴' })
  }
  try {

    const slugRef = doc(db, 'member', req.body['slug'])
    await updateDoc(slugRef, {
      messages: arrayUnion({
        sender: req.body['sender'],
        message: req.body['message']
      })
    })
    return res.status(200).json({ message: 'Done 😎' })
  } catch (e) {
    return res.status(500).json({ message: 'Failed 😅' })
  }
}
