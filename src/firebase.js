import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDv3cJq8LNHNgmQaAEII-SCBaiX7F3YmNQ",
    authDomain: "reels-94015.firebaseapp.com",
    projectId: "reels-94015",
    storageBucket: "reels-94015.appspot.com",
    messagingSenderId: "216512200481",
    appId: "1:216512200481:web:ab33e1051c671f5083c860"
});


export const auth= firebase.auth();
export const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage=firebase.storage();
// export default firebase;