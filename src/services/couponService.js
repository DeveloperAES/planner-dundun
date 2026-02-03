import {
    collection,
    addDoc,
    getDocs,
    doc,
    query,
    where,
    updateDoc,
    increment,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const getCouponsByCouple = async (coupleId) => {
    const q = query(
        collection(db, "coupons"),
        where("coupleId", "==", coupleId)
    );

    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const createCoupon = async (coupon) => {
    const docRef = await addDoc(collection(db, "coupons"), {
        ...coupon,
        redeemedCount: 0,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

export const redeemCoupon = async (couponId) => {
    const couponRef = doc(db, "coupons", couponId);
    await updateDoc(couponRef, {
        redeemedCount: increment(1),
        updatedAt: serverTimestamp(),
    });
};
