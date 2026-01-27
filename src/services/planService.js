import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const getPlansByCouple = async (coupleId) => {
    const q = query(
        collection(db, "plans"),
        where("coupleId", "==", coupleId)
    );

    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const createPlan = async (plan) => {
    await addDoc(collection(db, "plans"), {
        ...plan,
        createdAt: new Date().toISOString(),
        status: 'pending' // Default status
    });
};

