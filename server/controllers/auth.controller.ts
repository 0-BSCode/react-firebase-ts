import { ResponseI } from "@server/types/ResponseI";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import {
  Auth,
  User as FirebaseUser,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as FirebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import backend from "@server/index";
import { UserRolesEnum } from "@server/types/enums/UserRolesEnum";
import { UserModelSchema } from "@server/models/user.model";
import { Timestamp } from "firebase/firestore";
import userService from "@server/services/user.service";

class AuthController {
  private auth: Auth;
  constructor(auth: Auth) {
    this.auth = auth;
  }

  signUpWithEmailAndPassword = async (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: "Passwords do not match"
      } as ResponseI<string>;
    }

    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      const userInfo: UserModelSchema = {
        uid: result.user.uid,
        email: result.user.email as string,
        roles: [UserRolesEnum.USER],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await userService.addItem(userInfo);
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: result.user
      } as ResponseI<FirebaseUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.message as string;
      return {
        status: ResponseStatusEnum.ERROR,
        body: errorMessage
      } as ResponseI<string>;
    }
  };

  signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: result.user
      } as ResponseI<FirebaseUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.message as string;
      return {
        status: ResponseStatusEnum.ERROR,
        body: errorMessage
      } as ResponseI<string>;
    }
  };

  signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with a pop-up window
      const result = await signInWithPopup(this.auth, provider);

      const userInfo: UserModelSchema = {
        uid: result.user.uid,
        email: result.user.email as string,
        roles: [UserRolesEnum.USER],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const user = await userService.getItem(userInfo.uid);

      if (!user.data()) {
        await userService.addItem(userInfo);
      }

      return {
        status: ResponseStatusEnum.SUCCESS,
        body: result.user
      } as ResponseI<FirebaseUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Handle errors here.
      const errorMessage = err.message as string;

      return {
        status: ResponseStatusEnum.ERROR,
        body: errorMessage
      } as ResponseI<string>;
    }
  };

  signOut = async () => {
    try {
      await FirebaseSignOut(this.auth);
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: "Signed out successfully"
      } as ResponseI<string>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.message as string;

      return {
        status: ResponseStatusEnum.ERROR,
        body: errorMessage
      } as ResponseI<string>;
    }
  };

  public isAuthorized = (userRoles: UserRolesEnum[], authorizedRoles: UserRolesEnum[]) => {
    return userRoles.every((role) => authorizedRoles.includes(role));
  };
}

const authController = new AuthController(backend.auth);

export default authController;
