import { createWithEqualityFn } from "zustand/traditional"

export const useLoadingStore = createWithEqualityFn((set) => ({
    loading: false,
    setLoading: (newLoading) => set(() => ({ loading: newLoading }))
}))