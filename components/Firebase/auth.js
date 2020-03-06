import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import { user, users, connectDb, disconnectDb, updateUser} from './db';
import { retrieveMyApp } from './firebase';
import { debug } from 'react-native-reanimated';

// auth(firebase.app("HavingFun"));
export const getMyAuth = () => auth();

export const loginWithEmail = (email, password) => {
	return auth().signInWithEmailAndPassword(email, password)
}

export const signupWithEmail = (email, password) => {
	return auth().createUserWithEmailAndPassword(email, password)
}

export const signOut = async () => {
	await auth().signOut();
	
	return 1;
}

export const checkUserAuth = user => {
	return auth().onAuthStateChanged(user)
}

export const isLoggedIn = () => {
	return auth().currentUser;
}

export function getUid() {
	return auth().currentUser ? auth().currentUser.uid : null;
}

export const updateDisplayName = (name) => {
	auth().currentUser? auth().currentUser.displayName = name : null;
	return console.log("work");

}

export const signInAnon = () =>  auth().signInAnonymously();

export const updateAccount = () => auth().currentUser.accountCreated = true;

export const onAuthUserListener = (next, fallback) => 
	auth().onAuthStateChanged(authUser => {
	if (authUser) {
		connectDb();
		// real user in
		user(authUser.uid).once('value', snapshot => {
			if (snapshot.exists()){
				const dbUser = snapshot.val();
				const acc = authUser.accountCreated ? authUser.accountCreated : false;
				authUser.displayName = dbUser.username
				user(authUser.uid).set({
					username: authUser.displayName,
					email: authUser.email,
					emailVerified: authUser.emailVerified,
					providerData: authUser.providerData,
					accountCreated: acc,
					...dbUser,
				})
				authUser.accountCreated = acc;
			}
			else{
				users().child(authUser.uid).set({
					uid: authUser.uid,
					username: authUser.username,
					email: authUser.email,
					emailVerified: authUser.emailVerified,
					providerData: authUser.providerData,
					accountCreated: false,
				});
				authUser.accountCreated = false;
			}
			 next(authUser);
		});
	}
	else fallback();
});

