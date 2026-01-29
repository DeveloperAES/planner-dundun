import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    updateDoc,
    arrayUnion,
    serverTimestamp,
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

export const getPlanById = async (planId) => {
    const docRef = doc(db, "plans", planId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null; // or throw error
    }
};

export const createPlan = async (plan) => {

    const docRef = await addDoc(collection(db, "plans"), {
        ...plan,
        status: "pending",
        category: plan.category || "date",
        completedAt: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return docRef.id;
};


export const addPlanImages = async (planId, images) => {
    const planRef = doc(db, "plans", planId);

    await updateDoc(planRef, {
        imageUrls: arrayUnion(...images),
        updatedAt: serverTimestamp(),
    });
};

export const removePlanImage = async (planId, imageUrl) => {
    const planRef = doc(db, "plans", planId);
    const planSnap = await getDoc(planRef);

    if (planSnap.exists()) {
        const currentImages = planSnap.data().imageUrls || [];
        const updatedImages = currentImages.filter(url => url !== imageUrl);

        await updateDoc(planRef, {
            imageUrls: updatedImages,
            updatedAt: serverTimestamp(),
        });
    }
};

export const updatePlanStatus = async (planId, newStatus) => {
    const planRef = doc(db, "plans", planId);

    const updateData = {
        status: newStatus,
        updatedAt: serverTimestamp(),
    };

    // Add completedAt timestamp when marking as completed
    if (newStatus === 'completed') {
        updateData.completedAt = serverTimestamp();
    }

    await updateDoc(planRef, updateData);
};
