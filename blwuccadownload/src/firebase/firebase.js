import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCpSfnDkuxWZ8W0tsxt43rceqH5tobY_Lk',
  authDomain: 'blwuccapp-56e5f.firebaseapp.com',
  projectId: 'blwuccapp-56e5f',
  storageBucket: 'blwuccapp-56e5f.appspot.com',
  messagingSenderId: '604213821161',
  appId: '1:604213821161:web:67831da4779cd43d90fa78',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
