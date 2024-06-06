import {Navigate, useLocation} from "react-router-dom"
import backend from "@server/index";
import { useEffect } from "react";
import useAuthStore from "@src/stores/auth.store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const authStore = useAuthStore();
    const location = useLocation();
    
    useEffect(() => {
        // Listen for auth state changes and update the user in the store
        backend.auth.onAuthStateChanged((user) => {
            authStore.setUser(user)
        })
    }, [])

    if (authStore.user === null) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return <>{children}</>;
};

export default ProtectedRoute