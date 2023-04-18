import firebase from "firebase/compat/app";
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAEGgwPjxT_FTA7oKDFq_pJyKCTrSISx_w",
    authDomain: "newone-cb12d.firebaseapp.com",
    projectId: "newone-cb12d",
    storageBucket: "newone-cb12d.appspot.com",
    messagingSenderId: "100278864743",
    appId: "1:100278864743:web:dbaf8870c3d216336abdc2"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
