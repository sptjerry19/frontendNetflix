import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCvhBj3HKY6kTTzKvd4ctizmShph_gQrcg",
  authDomain: "yumic-83e7d.firebaseapp.com",
  projectId: "yumic-83e7d",
  storageBucket: "yumic-83e7d.firebasestorage.app",
  messagingSenderId: "939100829101",
  appId: "1:939100829101:web:1f2cd113d5bb771de69d24",
  measurementId: "G-MWQ68ZTMTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export { messaging };
