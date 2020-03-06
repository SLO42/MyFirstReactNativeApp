import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';
import { iosConfig, androidConfig } from '../../constants/config.js';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// firebase.initializeApp( 
// 	Platform.OS === 'ios' ? iosConfig : androidConfig, "what" 
// ).then(app => console.log('initialized apps ->', firebase.apps));

// const checkIfInit = () => {
// 	if (firebase.apps.length == 1) {
// 		return firebase.initializeApp( 
// 			Platform.OS === 'ios' ? iosConfig : androidConfig, "HavingFun"
// 			).then(app => database(firebase.app('HavingFun')).setPersistenceEnabled(true));
// 	}
// 	else {
// 		database(firebase.app('HavingFun')).setPersistenceEnabled(true);
// 		return firebase.app('HavingFun');

// 	}

// }

// export const retrieveMyApp =  () => firebase.apps.length > 1 ? firebase.app('HavingFun') : checkIfInit(); 


// export default checkIfInit;