import {initializeApp} from 'firebase/app';
// import {DEV} from '../constants.js';

const firebaseConfig = {
	apiKey: 'AIzaSyD7iXcvZfLw7pUH6-aM3YGHZt7AUdPUdVo',
	authDomain: 'naisei-d4460.firebaseapp.com',
	projectId: 'naisei-d4460',
	storageBucket: 'naisei-d4460.firebasestorage.app',
	messagingSenderId: '1074513770403',
	appId: '1:1074513770403:web:6285fa93d1a8f80f12cc16',
};

export const firebase = initializeApp(firebaseConfig);

// Connect the emulators during development
// if (DEV) {
// 	Promise.all([
// 		import('firebase/firestore'),
// 		import('firebase/auth'),
// 		import('firebase/functions'),
// 	]).then(
// 		([
// 			{getFirestore, connectFirestoreEmulator},
// 			{getAuth, connectAuthEmulator},
// 			{getFunctions, connectFunctionsEmulator},
// 		]) => {
// 			const host = 'localhost';
// 			connectFirestoreEmulator(getFirestore(), host, 8080);
// 			connectAuthEmulator(getAuth(), `http://${host}:9099`);
// 			connectFunctionsEmulator(getFunctions(), host, 5001);
// 			document.body.querySelector('.firebase-emulator-warning')?.remove();
// 		}
// 	);
// }
