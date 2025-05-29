import toast from 'toastit';
import {AuthManagerBase} from './firebase/AuthManagerBase.js';
import {UserController} from './firebase/UserController.js';
import {daysManager} from './managers/daysManager/daysManager.js';

class AuthManager extends AuthManagerBase {
	async onUserConnected(user: UserController) {
		if (user.isPremium) {
			const {app} = await import('./app-shell/app-shell.js');
			shell.appendChild(app);
			daysManager.loadDays();
		} else {
			toast('Access denied');
			await this.logout();
		}
	}

	async onUserDisconnected() {
		if (window.app && window.app.isConnected) {
			window.app.remove();
			toast('Disconnected');
		} else {
			toast('Authentication required.');
		}
		const {loginInterface} = await import(
			'./login-interface/login-interface.js'
		);
		shell.appendChild(loginInterface);
	}
}
export const authManager = new AuthManager();
