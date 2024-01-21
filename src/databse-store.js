import { create } from "zustand"
import { allKeys } from "./database"

export const useAppDatabase = create((set) => ({
    database : [...allKeys],
    updatedDatabase (value) {
        set({
            database : [...value]
        })
    }
}))
