// // import { createContext, useContext, useState } from 'react'

// // const AuthContext = createContext(null)

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null)

// //   function login(email, password) {
// //     // Mock auth — accepts any email/password
// //     const name = email.split('@')[0]
// //     setUser({ email, name: name.charAt(0).toUpperCase() + name.slice(1) })
// //     return true
// //   }

// //   function logout() {
// //     setUser(null)
// //   }

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   )
// // }

// // export function useAuth() {
// //   return useContext(AuthContext)
// // }
// import { createContext, useContext, useEffect, useState } from 'react'
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from 'firebase/auth'
// import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
// import { auth, db, googleProvider } from '../firebase'

// const AuthContext = createContext(null)

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         // Fetch extra profile data from Firestore
//         const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
//         setUser({ ...firebaseUser, profile: snap.data() || {} })
//       } else {
//         setUser(null)
//       }
//       setLoading(false)
//     })
//     return unsub
//   }, [])

//   // Create user doc in Firestore on first signup
//   const createUserDoc = async (firebaseUser, extraData = {}) => {
//     const ref = doc(db, 'users', firebaseUser.uid)
//     const snap = await getDoc(ref)
//     if (!snap.exists()) {
//       await setDoc(ref, {
//         uid: firebaseUser.uid,
//         email: firebaseUser.email,
//         displayName: firebaseUser.displayName || extraData.displayName || '',
//         photoURL: firebaseUser.photoURL || '',
//         createdAt: serverTimestamp(),
//         ...extraData,
//       })
//     }
//   }

//   const signUpWithEmail = async (email, password, displayName) => {
//     const result = await createUserWithEmailAndPassword(auth, email, password)
//     await updateProfile(result.user, { displayName })
//     await createUserDoc(result.user, { displayName })
//     return result
//   }

//   const signInWithEmail = async (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const signInWithGoogle = async () => {
//     const result = await signInWithPopup(auth, googleProvider)
//     await createUserDoc(result.user)
//     return result
//   }

//   const logout = () => signOut(auth)

//   return (
//     <AuthContext.Provider value={{ user, loading, signUpWithEmail, signInWithEmail, signInWithGoogle, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
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

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}