import {addDoc, collection} from 'firebase/firestore';
import {userCtrl} from '../../firebase/UserController.js';
import {getFirestore} from '../../imports.js';
import {type Day} from '../../objects/Day.js';

export async function addDay(day: Day) {
	if (!userCtrl.isConnected) {
		throw new Error('User not connected.');
	}
	if (day.id !== undefined) {
		throw new Error('This day already has an id.');
	}
	const firestore = await getFirestore();
	const colRef = collection(firestore, `users/${userCtrl.id}/days`);
	console.log(day.toJSON());
	const docRef = await addDoc(colRef, day.toJSON());
	day.id = docRef.id;
}
