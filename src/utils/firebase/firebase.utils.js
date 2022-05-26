import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCxmw3bPmEN14SeBn4xKWqUc23A7dU9g28',
  authDomain: 'clothes-e-commerce-db.firebaseapp.com',
  projectId: 'clothes-e-commerce-db',
  storageBucket: 'clothes-e-commerce-db.appspot.com',
  messagingSenderId: '526256144780',
  appId: '1:526256144780:web:b23039efea413be6d856a9',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log('userDocRef', userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log('userSnapshot', userSnapshot)
  console.log('userSnapshot exists', userSnapshot.exists())

  // If user data does not exists
  // Create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  // If user data exists
  // Return userDocRef
  return userDocRef
}
