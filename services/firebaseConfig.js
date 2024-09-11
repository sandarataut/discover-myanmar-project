import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpVpDjAzZBWDKgTctRfRcybuqxo5XIpcw",
  authDomain: "discover-myanmar-project.firebaseapp.com",
  projectId: "discover-myanmar-project",
  storageBucket: "discover-myanmar-project.appspot.com",
  messagingSenderId: "976199231172",
  appId: "1:976199231172:web:b990c67e2c94a541974b91",
  measurementId: "G-PMFPKZ6MBZ"
  //   databaseURL: "https://project-id.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// initialize auth; only for native platforms (Android and iOS)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// const database = getDatabase(app);
const db = getFirestore(app);

export { auth, db };
