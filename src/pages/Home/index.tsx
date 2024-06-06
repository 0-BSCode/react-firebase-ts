import authController from "@server/controllers/auth.controller"
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum"
import useAuthStore from "@src/stores/auth.store"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    const authStore = useAuthStore()
    const handleSignout = async () => {
        const res = await authController.signOut()
        if (res.status === ResponseStatusEnum.SUCCESS) {
            authStore.setUser(null)
            navigate('/login')
        }
    }
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    )
}

export default HomePage