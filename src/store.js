import { create } from "zustand";


export const useAppStore = create((set) => ({
    userInfo : null,
    updateUserInfo (userInfo){
        set({userInfo : userInfo})
    }
}))