import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const loginWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);

    const uid = res.user.uid;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    return {
        uid,
        ...userSnap.data()
    };
};
