/* eslint-disable no-unused-vars */
import { create } from 'zustand'

export const useTransactionsStore = create((set) => ({
    transactions: {},
    setTransactions: (data) => set((state) => ({ isLogin: data }))
}))

window.store = useTransactionsStore