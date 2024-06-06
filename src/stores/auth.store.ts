import { User } from 'firebase/auth'
import { create } from 'zustand'

// null = no user is logged in
// undefined = no user is set (used in case Firebase is still fetching user info)
type Store = {
  user: User | null | undefined
  setUser: (value: User | null | undefined) => void
}

const useAuthStore = create<Store>()((set) => ({
  user: undefined,
  setUser: (value: User | null | undefined) => set(({ user: value })),
}))

export default useAuthStore