import {getFirestore} from '../../imports.js';
import {collection, getDocs} from 'firebase/firestore';
import {userCtrl} from '../../firebase/UserController.js';
import {Day} from '../../objects/Day.js';

export async function getDays() {
	if (!userCtrl.isConnected) throw new Error('User not connected');

	const firestore = await getFirestore();
	const colRef = collection(firestore, `users/${userCtrl.id}/days`);
	const snapshot = await getDocs(colRef);
	return snapshot.docs.map((doc) => new Day(null, {id: doc.id, ...doc.data()}));
}
