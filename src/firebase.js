
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4-mgQqMoHXGOl8ANqHF87lZOaf1DsRmk",
  authDomain: "invoice-5dba8.firebaseapp.com",
  projectId: "invoice-5dba8",
  storageBucket: "invoice-5dba8.appspot.com",
  messagingSenderId: "394112632414",
  appId: "1:394112632414:web:8e95b8b26000a84e0bd6cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);