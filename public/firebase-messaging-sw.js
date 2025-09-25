// Import and configure Firebase
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCvhBj3HKY6kTTzKvd4ctizmShph_gQrcg",
  authDomain: "yumic-83e7d.firebaseapp.com",
  projectId: "yumic-83e7d",
  storageBucket: "yumic-83e7d.firebasestorage.app",
  messagingSenderId: "939100829101",
  appId: "1:939100829101:web:9c3d1ff11efcf1d3e69d24",
  measurementId: "G-EFX3EM988G",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/favicon.ico",
    badge: "/favicon.ico",
    tag: "notification-1",
    renotify: true,
    requireInteraction: false,
    actions: [
      {
        action: "view",
        title: "Xem chi tiết",
      },
      {
        action: "dismiss",
        title: "Bỏ qua",
      },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");

  event.notification.close();

  if (event.action === "view") {
    // Open the app when user clicks "Xem chi tiết"
    event.waitUntil(clients.openWindow("/"));
  } else if (event.action === "dismiss") {
    // Just close the notification
    console.log("Notification dismissed");
  } else {
    // Default action - open the app
    event.waitUntil(clients.openWindow("/"));
  }
});
