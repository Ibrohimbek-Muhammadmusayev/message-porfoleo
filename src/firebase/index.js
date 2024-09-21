import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0CjQBioUjtIRSlV4oScqnqTspISulSqE",
    authDomain: "portfoleo-2b393.firebaseapp.com",
    projectId: "portfoleo-2b393",
    storageBucket: "portfoleo-2b393.appspot.com",
    messagingSenderId: "573661174144",
    appId: "1:573661174144:web:83482e9077307e4d86c965",
    measurementId: "G-GNVFG7SR63"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);