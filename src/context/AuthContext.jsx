import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
   updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
        setUser({
          uid:      firebaseUser.uid,
          email:    firebaseUser.email,
          name:     firebaseUser.displayName || snap.data()?.name || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL || null,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function saveUserDoc(firebaseUser, extraName) {
    const ref  = doc(db, 'users', firebaseUser.uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      await setDoc(ref, {
        uid:       firebaseUser.uid,
        email:     firebaseUser.email,
        name:      extraName || firebaseUser.displayName || firebaseUser.email.split('@')[0],
        createdAt: serverTimestamp(),
      })
    }
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    await saveUserDoc(cred.user)
    return cred.user
  }

  async function register(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    await saveUserDoc(cred.user, name)
    return cred.user
  }

  async function loginWithGoogle() {
    const cred = await signInWithPopup(auth, googleProvider)
    await saveUserDoc(cred.user)
    return cred.user
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}