
// import checkIfInit, {retrieveMyApp} from './firebase';
import {connectDb, 
	disconnectDb, doDBRequest,
	user, users, updateUser, 
	onAccountListener, stopAccountListener, getDbUser,
	updateWithKeyAndValue, getAccountCreated,
} from './db';
import {
	loginWithEmail,
	signupWithEmail,
	signOut,
	checkUserAuth,
	isLoggedIn,
	onAuthUserListener,
	signInAnon,
	getUid,
	updateAccount,
	updateDisplayName,
} from './auth';
import {withFirebaseHOC, FirebaseContext} from './context';

export { 
	getUid,
	updateDisplayName,
	getAccountCreated,
	updateAccount,
	connectDb,
	disconnectDb,
	doDBRequest,
	onAccountListener,
	stopAccountListener,
	getDbUser,
	updateWithKeyAndValue,
	user,
	users,
	updateUser,
	loginWithEmail,
	signupWithEmail,
	signOut,
	isLoggedIn,
	signInAnon,
	checkUserAuth,
	onAuthUserListener,
	withFirebaseHOC,
	FirebaseContext} ;