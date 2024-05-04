/* eslint-disable no-unused-vars */
import { create } from 'zustand'

export const useUserStore = create((set) => ({
    isLogin: false,
    userData: null,
    setIsLogin: (data) => set((state) => ({ isLogin: data })),
    setUserData: (data) => set((state) => ({ userData: data })),
}))

window.store = useUserStore
