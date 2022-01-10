import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAdA3IeXuCchfW1kLXFgmD17g3AQyAOqqw",
  authDomain: "mp-p-7f207.firebaseapp.com",
  projectId: "mp-p-7f207",
  storageBucket: "mp-p-7f207.appspot.com",
  messagingSenderId: "561981916500",
  appId: "1:561981916500:web:547a3d28301f441d1434c1",
  measurementId: "G-G04N7FT69G",
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
