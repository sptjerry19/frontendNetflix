import { ref, reactive, computed } from "vue";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../plugins/firebase";

const notifications = ref([]);
const notificationPermission = ref(Notification.permission);
const registrationToken = ref(null);

export function useNotifications() {
  // Kiểm tra hỗ trợ service worker và notifications
  const isSupported = () => {
    return "serviceWorker" in navigator && "Notification" in window;
  };

  // Yêu cầu quyền thông báo
  const requestPermission = async () => {
    console.log("🔔 Bắt đầu request permission...");

    if (!isSupported()) {
      console.warn("Trình duyệt không hỗ trợ push notifications");
      return false;
    }

    try {
      console.log("📱 Đang yêu cầu Notification permission...");
      const permission = await Notification.requestPermission();
      console.log("🔐 Notification permission result:", permission);
      notificationPermission.value = permission;

      if (permission === "granted") {
        console.log("✅ Quyền thông báo đã được cấp");
        console.log("🔧 Đang register Service Worker...");
        await registerServiceWorker();
        console.log("🎯 Đang get Registration Token...");
        await getRegistrationToken();
        return true;
      } else {
        console.log("❌ Quyền thông báo bị từ chối");
        return false;
      }
    } catch (error) {
      console.error("💥 Lỗi khi yêu cầu quyền thông báo:", error);
      return false;
    }
  };

  // Đăng ký service worker
  const registerServiceWorker = async () => {
    try {
      console.log("⚙️ Đang đăng ký Service Worker...");
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("✅ Service Worker đã được đăng ký:", registration);
      console.log("📍 SW Scope:", registration.scope);
      console.log("📝 SW State:", registration.active?.state);
      return registration;
    } catch (error) {
      console.error("💥 Lỗi khi đăng ký Service Worker:", error);
      console.error("SW Error details:", error.message);
      throw error;
    }
  };

  // Lấy registration token
  const getRegistrationToken = async () => {
    try {
      console.log("🔑 Bắt đầu lấy FCM token...");
      console.log(
        "🔧 VAPID Key:",
        import.meta.env.VITE_FIREBASE_VAPID_KEY
          ? "✅ Có từ env"
          : "❌ Dùng fallback key"
      );
      console.log("🔧 Messaging object:", messaging);

      const token = await getToken(messaging, {
        vapidKey:
          import.meta.env.VITE_FIREBASE_VAPID_KEY ||
          "BJnxxyu-A79LKcjnuJ9k6VWhFS_bLnTV7DtDursl0OZzs7e3dTwgyWmGjb1dPuc-AgTb3Clp8eCoVJG4UX6vLq4", // Bạn cần tạo VAPID key từ Firebase Console
      });

      if (token) {
        console.log("🎉 FCM Registration token:", token);
        registrationToken.value = token;

        // Gửi token lên server của bạn để lưu trữ
        console.log("📤 Đang gửi token lên server...");
        await sendTokenToServer(token);

        return token;
      } else {
        console.log("❌ Không thể lấy registration token");
        return null;
      }
    } catch (error) {
      console.error("💥 Lỗi khi lấy registration token:", error);
      console.error("Error details:", error.message);
      console.error("Error code:", error.code);
      return null;
    }
  };

  // Gửi token lên server
  const sendTokenToServer = async (token) => {
    try {
      // Thay thế bằng API endpoint của bạn
      const response = await fetch("/api/save-fcm-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          userId: getCurrentUserId(), // Implement hàm này để lấy user ID
        }),
      });

      if (response.ok) {
        console.log("Token đã được gửi lên server thành công");
      }
    } catch (error) {
      console.error("Lỗi khi gửi token lên server:", error);
    }
  };

  // Lắng nghe tin nhắn foreground
  const setupForegroundMessaging = () => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);

      // Thêm thông báo vào danh sách
      const notification = {
        id: Date.now(),
        title: payload.notification?.title || "Thông báo mới",
        body: payload.notification?.body || "",
        icon: payload.notification?.icon,
        timestamp: new Date(),
        read: false,
        data: payload.data,
      };

      notifications.value.unshift(notification);

      // Hiển thị toast notification nếu ứng dụng đang được mở
      showToastNotification(notification);
    });
  };

  // Hiển thị toast notification
  const showToastNotification = (notification) => {
    // Bạn có thể sử dụng thư viện toast hoặc tự tạo
    if ("Notification" in window && Notification.permission === "granted") {
      const browserNotification = new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || "/favicon.ico",
        tag: `notification-${notification.id}`,
      });

      // Tự động đóng sau 5 giây
      setTimeout(() => {
        browserNotification.close();
      }, 5000);

      // Xử lý click
      browserNotification.onclick = () => {
        window.focus();
        browserNotification.close();
        // Có thể điều hướng đến trang cụ thể
      };
    }
  };

  // Đánh dấu thông báo đã đọc
  const markAsRead = (notificationId) => {
    const notification = notifications.value.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.read = true;
    }
  };

  // Xóa thông báo
  const removeNotification = (notificationId) => {
    const index = notifications.value.findIndex((n) => n.id === notificationId);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  // Xóa tất cả thông báo
  const clearAllNotifications = () => {
    notifications.value = [];
  };

  // Lấy số thông báo chưa đọc
  const unreadCount = computed(() => {
    return notifications.value.filter((n) => !n.read).length;
  });

  // Helper function - bạn cần implement dựa trên hệ thống auth của mình
  const getCurrentUserId = () => {
    // Lấy từ store hoặc localStorage
    return localStorage.getItem("userId") || "anonymous";
  };

  // Khởi tạo notifications
  const initialize = async () => {
    if (!isSupported()) {
      console.warn("Push notifications không được hỗ trợ");
      return false;
    }

    // Kiểm tra permission hiện tại
    if (notificationPermission.value === "granted") {
      await registerServiceWorker();
      await getRegistrationToken();
      setupForegroundMessaging();
      return true;
    }

    return false;
  };

  return {
    // State
    notifications,
    notificationPermission,
    registrationToken,
    unreadCount,

    // Methods
    isSupported,
    requestPermission,
    initialize,
    markAsRead,
    removeNotification,
    clearAllNotifications,
    setupForegroundMessaging,
  };
}
