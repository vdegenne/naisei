import './firebase.js';
import {
	getAuth,
	onAuthStateChanged,
	type UserCredential,
	type UserInfo,
} from 'firebase/auth';
import {
	userCtrl,
	type FirebaseUser,
	type UserController,
} from './UserController.js';

interface LoginInformation {
	credential: UserCredential;
	user: UserInfo;
	isNewUser: boolean;
}

export interface AuthManagerImplInterface {
	onAuthStateChanged(user: FirebaseUser | null): void;
	// onAuthStateChangedComplete?(user: UserController): void;
	onUserConnected(user: UserController): void;
	onUserDisconnected(): void;
}

export class AuthManagerBase implements AuthManagerImplInterface {
	constructor() {
		onAuthStateChanged(getAuth(), async (user: FirebaseUser | null) => {
			this.onAuthStateChanged(user);
			await this._onAuthStateChanged(user);

			await userCtrl.updateComplete;
			if (userCtrl.isConnected) {
				this.onUserConnected(userCtrl);
			} else {
				this.onUserDisconnected();
			}
			// this.onAuthStateChangedComplete(userCtrl);
		});
	}

	onAuthStateChanged(user: FirebaseUser | null): void {}
	// onAuthStateChangedComplete(user: UserController): void {}
	onUserConnected(user: UserController): void {}
	onUserDisconnected(): void {}

	async _onAuthStateChanged(user: FirebaseUser | null): Promise<void> {
		if (user) {
			const jwtoken = await user.getIdTokenResult(true);
			userCtrl.user = user;
			userCtrl.isPremium = jwtoken.claims.isPremium === true;
		} else {
			userCtrl.reset();
		}
	}

	async isUserLogged() {
		await userCtrl.updateComplete;
		return userCtrl.isConnected;
	}

	async loginOrLogout() {
		if (!this.isUserLogged()) {
			return await this.login();
		} else {
			return await this.logout();
		}
	}

	/**
	 * Here's an example how to use it:
	 *
	 * ```javascript
	 * async #login() {
	 *   if (!authManager.isUserLogged()) {
	 *     try {
	 *       await authManager.login();
	 *       this.dialog.close();
	 *       // To get a fully updated user controller
	 *       const {getOnAuthStateChangedComplete} = await import('../firebase/onAuthStateChanged.js');
	 *       const userCtrl = await getOnAuthStateChangedComplete();
	 *       if (userCtrl.isAuthorized) {
	 *         // do something
	 *       }
	 *     } catch {
	 *       // canceled
	 *       return;
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * Check `onAuthStateChanged.ts` for more details.
	 */
	async login(): Promise<LoginInformation> {
		if (await this.isUserLogged()) {
			throw new Error('Already logged in');
		}
		const {signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo} =
			await import('firebase/auth');
		const credential = await signInWithPopup(
			getAuth(),
			new GoogleAuthProvider(),
		);
		const isNewUser = !!getAdditionalUserInfo(credential)?.isNewUser;
		userCtrl.isNewUser = isNewUser;
		return {
			credential,
			user: credential.user,
			isNewUser,
		};
	}

	/**
	 * Here's an example how to use it:
	 *
	 * ```javascript
	 * @confirm({content: 'You will be logged out'})
	 * private async logout() {
	 *   if (await authManager.isUserLogged()) {
	 *     try {
	 *       await authManager.logout();
	 *       this.dialog.close();
	 *       toastit('Logged out');
	 *     } catch {
	 *       return;
	 *     }
	 *   }
	 * }
	 * ```
	 */
	async logout() {
		if (!(await this.isUserLogged())) {
			throw new Error('Already logged out');
		}
		try {
			const {signOut} = await import('firebase/auth');
			await signOut(getAuth());
			// await getAuth().signOut();
		} catch {
			throw new Error('Something went wrong');
		}
	}
}
