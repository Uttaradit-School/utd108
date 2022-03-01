import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'GET') {
    return res.status(405).json({ message: 'Wrong method 😴' })
  }
  try {
    const slugRef = doc(db, 'member', String(req.query['slug']))
    const docSnap = await getDoc(slugRef)
    if (!docSnap.exists()) {
      return res.status(404).json({ message: 'Not found 😴' })
    }
    const result = docSnap.data()

    return res.status(200).json({ message: 'found 😎', data: result['nickname'] })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
