import authController from "@server/controllers/auth.controller"
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum"
import useAuthStore from "@src/stores/auth.store"
import { User } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const authStore = useAuthStore()
    const navigate = useNavigate()

    const handleLogin = async () => {
        const res = await authController.signInWithGoogle()

        if (res.status === ResponseStatusEnum.SUCCESS) {
            const user = res.body as User
            authStore.setUser(user)
            navigate('/')
        }
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginPage