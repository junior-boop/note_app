import { create } from "zustand";


export const useAppStore = create((set) => ({
    userInfo : null,
    updateUserInfo (userInfo){
        set({userInfo : userInfo})
    }
}))


export const useLoginState = create(set => ({
    login : false,
    updatedLogin (value) {
        set({ login : value})
    }
}))