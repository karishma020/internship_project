import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYrl40o8H-cNRzwoWutIwt_Tr1UcH6hdo",
  authDomain: "kohi-ffcbf.firebaseapp.com",
  projectId: "kohi-ffcbf",
  storageBucket: "kohi-ffcbf.firebasestorage.app",
  messagingSenderId: "591956312911",
  appId: "1:591956312911:web:4a6ce6934f4b2b9805bb3a",
  measurementId: "G-FT07NEL4MB"
};

const app = initializeApp(firebaseConfig)

export const auth           = getAuth(app)
export const db             = getFirestore(app)

// Google provider — custom params improve UX
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })