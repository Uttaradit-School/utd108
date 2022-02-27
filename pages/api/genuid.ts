import { nanoid } from 'nanoid'
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
} from 'firebase/firestore'
import { db } from './firebase'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST') {
    return res.status(405).json({ message: 'Wrong method 😴' })
  }
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'member'), where('gmail', '==', req.body['gmail']))
    )
    var refid = nanoid(8)
    if (querySnapshot.empty) {
      const docData = {
        gmail: req.body['gmail'],
        uid: req.body['uid'],
        messages: [],
      }
      await setDoc(doc(db, 'member', refid), docData)
    } else {
      querySnapshot.forEach((member) => {
        refid = member.id
      })
    }
    return res.status(200).json({ message: 'Done 😎', refid: refid })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
