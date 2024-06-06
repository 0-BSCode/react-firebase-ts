import { ResponseI } from "@server/types/ResponseI";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import { Auth, User, getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

class AuthController {
    private auth: Auth;
    constructor() {
        this.auth = getAuth()
    }

    signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // Sign in with a pop-up window
            const result = await signInWithPopup(this.auth, provider);

            // Pull signed-in user credential.
            return {
              status: ResponseStatusEnum.SUCCESS,
              body: result.user
            } as ResponseI<User>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
            // Handle errors here.
            const errorMessage = err.message as string;

            return {
              status: ResponseStatusEnum.ERROR,
              body: errorMessage
            } as ResponseI<string>
          }
    }
}

const authController = new AuthController()

export default authController