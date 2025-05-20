import {deleteDoc, doc} from 'firebase/firestore';
import {userCtrl} from '../../firebase/UserController.js';
import {getFirestore} from '../../imports.js';
import {type Day} from '../../objects/Day.js';

export async function removeDay(day: Day) {
	if (!userCtrl.isConnected) {
		throw new Error('User not connected');
	}
	if (!day.id) {
		throw new Error('Invalid day ID');
	}
	const firestore = await getFirestore();
	const dayDocRef = doc(firestore, `users/${userCtrl.id}/days/${day.id}`);
	await deleteDoc(dayDocRef);
}
