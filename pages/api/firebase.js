import firebase, { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../config/firebaseApp.config'

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export { firebase }
