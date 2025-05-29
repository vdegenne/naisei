import {doc} from 'firebase/firestore';
import {userCtrl} from '../../firebase/UserController.js';
import {getFirestore} from '../../imports.js';

export async function updateDay<T>(dayId: string, properties: Partial<T>) {
	if (!userCtrl.isConnected) {
		throw new Error('User not connected');
	}
	if (dayId === undefined) {
		throw new Error('Invalid day ID');
	}
	const firestore = await getFirestore();
	const dayDocRef = doc(firestore, `users/${userCtrl.id}/days/${dayId}`);

	// COMPLETE
}
