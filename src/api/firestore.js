import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Firestore에 편지 저장
export const saveLetterToFirestore = async (userId, letter) => {
    try {
        await addDoc(collection(db, "users", userId, "letters"), {
            ...letter,
            createdAt: new Date(), // 작성일
        });
    } catch (err) {
        console.error("Firestore 저장 실패:", err);
        throw err;
    }
};

// 편지 불러오기
export const getLettersFromFirestore = async (userId) => {
    const snapshot = await getDocs(collection(db, "users", userId, "letters"));

    const letters = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
        };
    });

    // 최신 작성일순으로 정렬
    return letters.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
};

// 편지 잠금 해제 (isLock: false로 변경)
export const unlockLetterInFirestore = async (userId, letterId) => {
    try {
        const ref = doc(db, "users", userId, "letters", letterId);
        await updateDoc(ref, { isLock: false });
    } catch (error) {
        console.error("잠금 해제 실패:", error);
    }
};
