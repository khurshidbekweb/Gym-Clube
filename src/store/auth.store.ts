import { create } from "zustand"

type PathType = "login" | "register"

interface IAutheLoging {
    authState: PathType,
    setAuth: (state: PathType) => void
}

export const useAuthState = create<IAutheLoging>(set => ({
    authState: "register",
    setAuth: state => set({authState: state})           
}))