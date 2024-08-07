// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpophneMdnuYXiKowzjMne6bWbxsZ4Z5E",
  authDomain: "inventory-management-p.firebaseapp.com",
  projectId: "inventory-management-p",
  storageBucket: "inventory-management-p.appspot.com",
  messagingSenderId: "209594883156",
  appId: "1:209594883156:web:e64db1cf117ab03e2d21c1",
  measurementId: "G-7JJ3TWB64G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);