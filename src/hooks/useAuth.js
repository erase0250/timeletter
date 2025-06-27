import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import useUserStore from "../stores/userStore";
import { app } from "../lib/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    const { setUser } = useUserStore.getState();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userInfo = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL, // 프로필 이미지
        };

        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (error) {
        console.error("Google 로그인 실패:", error);
    }
};
