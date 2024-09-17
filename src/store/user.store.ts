import { User } from "firebase/auth";
import { create } from "zustand";

type userType = User | null

interface userStatus {
    user: userType,
    setUser: (user: userType) => void
}

export const useUserState = create<userStatus>(set => ({
    user: null,
    setUser: user => set({user})
}))