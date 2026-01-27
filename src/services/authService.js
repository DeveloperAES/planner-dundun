import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const logoutFirebase = async () => {
    return await signOut(auth);
};

export const updateUserAvatar = async (uid, avatarUrl) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        avatarUrl: avatarUrl
    });
};


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
