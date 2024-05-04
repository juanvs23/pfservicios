import { createWithEqualityFn } from 'zustand/traditional'

const useServiceStore = createWithEqualityFn((set) => ({

    servicesSelected: 123123,
    setservicesSelected: (_new) => set(() => ({
        servicesSelected: _new
    })),
    amount: null,
    setAmount: (_new) => set(() => ({
        amount: _new
    }))
}))

export default useServiceStore