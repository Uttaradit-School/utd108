import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query
  const docRef = doc(db, 'member', String(uid))
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    return res.status(404).json({ message: 'Not found 😅', data: 0 })
  }
  const data = docSnap.data()
  return res
    .status(200)
    .json({
      message: 'found 😎',
      data: 1,
      nickname: data['nickname'] === '' ? data['gmail'] : data['nickname'],
    })
}
