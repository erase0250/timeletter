import { create } from "zustand";

const useLetterStore = create((set) => ({
    letters: [],
    setLetters: (letters) => set({ letters }),
    clearLetters: () => set({ letters: [] }),
}));

export default useLetterStore;
