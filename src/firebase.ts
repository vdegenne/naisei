import {
	createFirebase,
	AuthManagerBase,
	type UserController,
} from '@vdegenne/firebase';
import {daysManager} from './managers/daysManager/daysManager.js';
import toast from 'toastit';

export const firebase = createFirebase({
	apiKey: 'AIzaSyD7iXcvZfLw7pUH6-aM3YGHZt7AUdPUdVo',
	authDomain: 'naisei-d4460.firebaseapp.com',
	projectId: 'naisei-d4460',
	storageBucket: 'naisei-d4460.firebasestorage.app',
	messagingSenderId: '1074513770403',
	appId: '1:1074513770403:web:6285fa93d1a8f80f12cc16',
});

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
