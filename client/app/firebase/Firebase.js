import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCpSfnDkuxWZ8W0tsxt43rceqH5tobY_Lk',
  authDomain: 'blwuccapp-56e5f.firebaseapp.com',
  projectId: 'blwuccapp-56e5f',
  storageBucket: 'blwuccapp-56e5f.appspot.com',
  messagingSenderId: '604213821161',
  appId: '1:604213821161:web:67831da4779cd43d90fa78',
};

if (firebase.apps.length >= 1) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
