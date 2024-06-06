import { ResponseI } from "@server/types/ResponseI";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import { Auth, User, signInWithPopup, GoogleAuthProvider, signOut as FirebaseSignOut, signInWithEmailAndPassword } from "firebase/auth";
import backend from "@server/index";

class AuthController {
    private auth: Auth;
    constructor(auth: Auth) {
        this.auth = auth
    }

    getCurrentUser() {
        console.log(`Current user: ${this.auth.currentUser}`)
        return this.auth.currentUser
    }

    signInWithEmailAndPassword = async (email: string, password: string) => {
        try {
          const result = await signInWithEmailAndPassword(this.auth, email, password);
          return {
            status: ResponseStatusEnum.SUCCESS,
            body: result.user
          } as ResponseI<User>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          const errorMessage = err.message as string;
          return {
            status: ResponseStatusEnum.ERROR,
            body: errorMessage
          } as ResponseI<string>
        }
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
            console.log(err)
            // Handle errors here.
            const errorMessage = err.message as string;

            return {
              status: ResponseStatusEnum.ERROR,
              body: errorMessage
            } as ResponseI<string>
          }
    }

    signOut = async () => {
        try {
          console.log("Sign off")
          await FirebaseSignOut(this.auth);
          return {
            status: ResponseStatusEnum.SUCCESS,
            body: "Signed out successfully"
          } as ResponseI<string>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          
          const errorMessage = err.message as string;

          return {
            status: ResponseStatusEnum.ERROR,
            body: errorMessage
          } as ResponseI<string>
        }
    }
}

const authController = new AuthController(backend.auth)

export default authController