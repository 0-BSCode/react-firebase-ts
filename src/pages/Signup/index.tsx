import authController from "@server/controllers/auth.controller";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import useAuthStore from "@src/stores/auth.store";
import { User } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignup = async () => {
    const res = await authController.signUpWithEmailAndPassword(
      credentials.email,
      credentials.password,
      credentials.confirmPassword
    );
    if (res.status === ResponseStatusEnum.SUCCESS) {
      const user = res.body as User;
      authStore.setUser(user);
      navigate("/");
    } else {
      alert(res.body);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <input
        type="password"
        value={credentials.confirmPassword}
        onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupPage;
