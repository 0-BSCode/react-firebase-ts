// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
    getFirestore,
    // connectFirestoreEmulator,
  } from 'firebase/firestore'
  import {
    Auth,
    getAuth,
    // connectAuthEmulator
    // signInWithCredential,
    // EmailAuthProvider
  } from 'firebase/auth'
import firebaseConfig from './firebaseConfig.json'


// // Initialize Firebase
// const initFirebase = async () => {
//     try {
//       const app = initializeApp(firebaseConfig)
//       getFirestore(app)
//       getAuth(app)
  
//       if (process.env.NODE_ENV !== 'production') {
//         // connectAuthEmulator(auth, 'http://localhost:9099')
//         // connectFirestoreEmulator(firestore, 'localhost', 8080)
//         // enableMultiTabIndexedDbPersistence(firestore)
//         /**
//          * The following code logins the user automatically to speed up development.
//          * For this to work you first need to create a user and then run the command
//          * yarn emulator:export, then import the data when starting the emulator
//          * yarn firebase emulators:start --only firestore,auth --import=firestore_mock_data
//          */
//         // signInWithCredential(
//         //   auth,
//         //   EmailAuthProvider.credential('john@doe.com', '123123')
//         // )
//       }
//       console.log('Firebase initialized')
//     } catch (err) {
//       console.error(err)
//       return err
//     }
//   }
  
//   export default initFirebase

class Backend {
  private app: FirebaseApp
  public db: Firestore
  public auth: Auth

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(firebaseConfig: any) {
    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)
    this.auth = getAuth(this.app)
  }

  public ok() {
    console.log("Running")
    return 'ok'
  }
}

const backend = new Backend(firebaseConfig)
export default backend
// const app = initializeApp(firebaseConfig)
// export const firestoreDb = getFirestore(app)
// export const firestoreAuth = getAuth(app)
