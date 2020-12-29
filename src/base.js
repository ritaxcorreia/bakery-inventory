// This is a Firebase specific package from React, it allows us to mirror our state to our Firebase database
import Rebase from "re-base";

// This is the official Firebase package for React
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyA0JNTHViXQFq0aW9S0KDQ4LWSiqTWrdsM",
	authDomain: "bakery-inventory.firebaseapp.com",
	projectId: "bakery-inventory",
	storageBucket: "bakery-inventory.appspot.com",
	messagingSenderId: "1064417565914",
	appId: "1:1064417565914:web:031d52b83dc830ef0999e3",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
