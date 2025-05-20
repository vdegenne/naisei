import {getElement} from 'html-vision';
import {type SettingsDialog} from './settings/settings-dialog.js';
import {userCtrl} from './firebase/UserController.js';

export async function getThemeStore() {
	const {themeStore} = await import('./styles/themeStore.js');
	return themeStore;
}

export async function getSettingsDialog(importIfNotFound = false) {
	try {
		const dialog = await getElement<SettingsDialog>('settings-dialog');
		return dialog;
	} catch {
		if (importIfNotFound) {
			const {settingsDialog} = await import('./settings/settings-dialog.js');
			return settingsDialog;
		}
	}
	return undefined;
}

export async function openSettingsDialog() {
	const dialog = await getSettingsDialog();
	dialog.show();
}

export async function getFirestore() {
	if (userCtrl.isConnected) {
		const {firebase} = await import('./firebase/firebase.js');
		const {getFirestore} = await import('firebase/firestore');
		return getFirestore(firebase);
	}
}
