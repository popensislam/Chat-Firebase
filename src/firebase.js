
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

export const app = initializeApp({
  apiKey: "AIzaSyDWVWAOD49i-aL-e1eI62Ovu1_SjqkQd_E",
  authDomain: "chat-react-7ac97.firebaseapp.com",
  projectId: "chat-react-7ac97",
  storageBucket: "chat-react-7ac97.appspot.com",
  messagingSenderId: "165046898086",
  appId: "1:165046898086:web:989615c552da02c41d5367",
  measurementId: "G-W553F3W9W2"
});

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore()