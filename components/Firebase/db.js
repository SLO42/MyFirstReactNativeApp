import database from '@react-native-firebase/database';

import {retrieveMyApp} from './firebase';
import { getUid } from './auth';

export const connectDb = async () => await database().goOnline();

export const disconnectDb = async () => await database().goOffline();

export const setPersistance = () => database().setPersistenceEnabled(true);

export const doDBRequest = async (func) => {
	connectDb();
	console.log("database", database());
	func();
	return disconnectDb();
}

export const user = uid => database().ref(`users/${uid}`);

export const updateWithKeyAndValue = async (key, value) => {
	connectDb();
	const uid = getUid();
	user(uid).child(key).set(value);
}

export const getAccountCreated = () => {
	connectDb();
	const uid = getUid();
	return user(uid).once('value', snapshot => {
		const dbUser = snapshot.val();
		return dbUser.accountCreated;
	});
}

export const matches = uid => database().ref(`users/${uid}/match`)

export const seen = uid => database().ref(`users/${uid}/seen`)

export const users = () => database().ref('users');

export const convos = () => database().ref(`convos`);

export const convo = mid => database().ref(`convos/${mid}`);

export const convoUsers = mid => database().ref(`convos/${mid}/users`);

export const messages = mid => database().ref(`convos/${mid}/messages`);

export const message = (mid, n) => database().ref(`convos/${mid}/messages/${n}`);

export const getDbUser = async () => {
	const uid = getUid();
	const snapshot = await user(uid).once('value');
	const defaultDBUSER = snapshot.val();
	return defaultDBUSER;
}


export const onAccountListener = async (next, fallback) => {
	connectDb();
	const uid = getUid();
	console.log('uid', uid);
	const snapshot = await user(uid).once('value');
	const defaultDBUSER = snapshot.val();
	user(uid).on('child_changed', (snapshot) => {
		if (snapshot){
			let dbUser = snapshot.val();
			if(dbUser.accountVerified){
				console.log("account is ", dbUser.accountVerified);
			}
			next(defaultDBUSER)
		}
		else fallback();
	});
	if (snapshot.exists()){
		next(defaultDBUSER);
	}
	else fallback();
}

export const stopAccountListener = () => users().child(getUid).off('child_changed');

export const updateUser = (uid, data) => database().ref(`users`).child(uid).set(data);

// unused for anon...

export const anonUser = uid => database().ref(`anon/${uid}`);

export const anonUsers = () => database().ref(`anon`);