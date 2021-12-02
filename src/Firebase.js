import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDnu7oli9KwmwGp6UXwDBuogBI9RKweVek",
//   authDomain: "e-commerce-3c855.firebaseapp.com",
//   projectId: "e-commerce-3c855",
//   storageBucket: "e-commerce-3c855.appspot.com",
//   messagingSenderId: "790972810779",
//   appId: "1:790972810779:web:ba3c89d68248bac1375abe",
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
