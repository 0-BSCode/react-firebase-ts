import authController from "@server/controllers/auth.controller"
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum"
import useAuthStore from "@src/stores/auth.store"
import { User } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const authStore = useAuthStore()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const handleLoginWithGoogle = async () => {
        const res = await authController.signInWithGoogle()

        if (res.status === ResponseStatusEnum.SUCCESS) {
            const user = res.body as User
            authStore.setUser(user)
            navigate('/')
        }
    }

    const handleLoginWithCredentials = async () => {
        const res = await authController.signInWithEmailAndPassword(credentials.email, credentials.password)
        if (res.status === ResponseStatusEnum.SUCCESS) {
            const user = res.body as User
            authStore.setUser(user)
            navigate('/')
        } else {
            alert(res.body)
        }
    }
    return (
        <div>
            <div>
            <input type="email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
            <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}  />
            <button onClick={handleLoginWithCredentials}>Login</button>
            </div>
            <button onClick={handleLoginWithGoogle}>Login with Google</button>
        </div>
    )
}

export default LoginPage