import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyChLt67qj86Qus17UyInUYgdKa_qDXBaJo",
    authDomain: "firedux-todo-e522f.firebaseapp.com",
    databaseURL: "https://firedux-todo-e522f.firebaseio.com",
    projectId: "firedux-todo-e522f",
    storageBucket: "firedux-todo-e522f.appspot.com",
    messagingSenderId: "974996101776",
    appId: "1:974996101776:web:453a301043674215f75615"
}
firebase.initializeApp(config);

var userId = firebase.auth().currentUser;
console.log("ussuusussuusussusuus",userId);
export const databaseRef = firebase.database().ref();

export const todosRef = databaseRef.child("todos")  
export default firebase;