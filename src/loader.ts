// This needs to be before anything else
// because it sets a shared stylesheet used by
// elements' construtor.
import './styles/themeStore.js';
import './styles/shared.js';

import '@material/web/all.js';

import {AuthManagerBase} from './firebase/AuthManagerBase.js';

export const authManager = new (class extends AuthManagerBase {
	async onUserConnected(user: UserController) {
		if (user.isPremium) {
			const {app} = await import('./app-shell/app-shell.js');
			shell.appendChild(app);
		} else {
			toast('Access denied');
			await authManager.logout();
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
})();

import './global-listeners.js';
import {type UserController} from './firebase/UserController.js';
import toast from 'toastit';
// import './gamepad.js';
