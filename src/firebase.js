
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
    apiKey: "AIzaSyD5bJf3cxz61cIoajFr5KAxN9okuzbdbgA",
    authDomain: "netflix-clone-60d07.firebaseapp.com",
    projectId: "netflix-clone-60d07",
    storageBucket: "netflix-clone-60d07.appspot.com",
    messagingSenderId: "509321813425",
    appId: "1:509321813425:web:0835ccb614d2f0dba6f190"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        // alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth);
}
export { auth, db, login, signup, logout };