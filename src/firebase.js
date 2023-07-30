import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBvztzq5AkZp2kmm9pdYrLJSyi0VXmN8PA",
    authDomain: "chat-app-403a3.firebaseapp.com",
    projectId: "chat-app-403a3",
    storageBucket: "chat-app-403a3.appspot.com",
    messagingSenderId: "157181840235",
    appId: "1:157181840235:web:b81a29586a66299144da2e",
    measurementId: "G-LG5144BYMB"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore()
// const db = app.firestore();

// const googleProvider = new firebase.auth.GoogleAuthProvider();

// export { auth, googleProvider, }
// export default db;
export { auth, firestore };
export default firebase;