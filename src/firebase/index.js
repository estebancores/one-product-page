import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAXygxz8ZbsNuNy9L3ugoCEFlKy383Osd8",
  authDomain: "planner-selling.firebaseapp.com",
  projectId: "planner-selling",
  storageBucket: "planner-selling.firebasestorage.app",
  messagingSenderId: "871174889145",
  appId: "1:871174889145:web:4c26fdad12c0839c4c8568",
  measurementId: "G-X28819WWXE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Helper function to log events
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  logEvent(analytics, eventName, eventParams);
};

export { analytics };
