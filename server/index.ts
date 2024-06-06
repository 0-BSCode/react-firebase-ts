// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore
  // connectFirestoreEmulator,
} from "firebase/firestore";
import {
  Auth,
  getAuth
  // connectAuthEmulator
  // signInWithCredential,
  // EmailAuthProvider
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig.json";

class Backend {
  private app: FirebaseApp;
  public db: Firestore;
  public auth: Auth;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(firebaseConfig: any) {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
  }

  public ok() {
    console.log("Running");
    return "ok";
  }
}

const backend = new Backend(firebaseConfig);
export default backend;
// const app = initializeApp(firebaseConfig)
// export const firestoreDb = getFirestore(app)
// export const firestoreAuth = getAuth(app)
