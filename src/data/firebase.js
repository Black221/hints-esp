import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCar7XIlXakqD05jk7HYUgugPeglXwijFY",
    authDomain: "hint-esp.firebaseapp.com",
    projectId: "hint-esp",
    storageBucket: "hint-esp.appspot.com",
    messagingSenderId: "194251058028",
    appId: "1:194251058028:web:4e7d3aeeb65f776530a149",
    measurementId: "G-J5HJ9E2BNX"
};

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const fireDB = getFirestore(app);