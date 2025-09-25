# 🔔 Push Notifications Setup - BookingSport

## Tổng quan

Hệ thống push notifications đã được tích hợp vào ứng dụng BookingSport sử dụng Firebase Cloud Messaging (FCM). Tính năng này cho phép gửi thông báo đến người dùng ngay cả khi họ không đang sử dụng ứng dụng.

## 📁 Cấu trúc files

```
src/
├── plugins/
│   └── firebase.js                 # Cấu hình Firebase
├── composables/
│   └── useNotifications.js         # Logic quản lý notifications
├── components/
│   └── UI/
│       ├── NotificationBell.vue    # Component hiển thị notifications
│       └── NotificationPermission.vue # Modal yêu cầu quyền thông báo
public/
└── firebase-messaging-sw.js        # Service Worker cho background notifications
```

## 🚀 Tính năng đã triển khai

### ✅ Đã hoàn thành

- [x] Cấu hình Firebase SDK
- [x] Service Worker để xử lý background notifications
- [x] Composable quản lý notifications state
- [x] Component bell icon hiển thị thông báo
- [x] Modal yêu cầu quyền thông báo người dùng
- [x] Tích hợp vào Navbar và App.vue
- [x] Xử lý foreground và background notifications
- [x] UI/UX hoàn chỉnh với transitions và responsive

### 🔧 Tính năng chính

1. **Permission Request**: Tự động yêu cầu quyền thông báo
2. **Foreground Notifications**: Hiển thị thông báo khi ứng dụng đang mở
3. **Background Notifications**: Nhận thông báo khi ứng dụng đóng
4. **Notification Bell**: Icon chuông với badge số lượng chưa đọc
5. **Notification Center**: Dropdown hiển thị danh sách thông báo
6. **Mark as Read**: Đánh dấu đã đọc/chưa đọc
7. **Delete Notifications**: Xóa thông báo riêng lẻ hoặc tất cả

## 🛠 Setup cần thiết

### 1. VAPID Key (QUAN TRỌNG!)

Bạn cần tạo VAPID key từ Firebase Console:

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Chọn project `yumic-83e7d`
3. Vào **Project Settings** → **Cloud Messaging** → **Web configuration**
4. Tạo **Web push certificates** nếu chưa có
5. Copy VAPID key và thay thế trong `src/composables/useNotifications.js`:

```javascript
const token = await getToken(messaging, {
  vapidKey: "YOUR_VAPID_KEY_HERE", // Thay thế dòng này
});
```

### 2. Backend API Endpoint

Cần tạo API endpoint để lưu FCM tokens:

```javascript
// API endpoint cần có: POST /api/save-fcm-token
{
  "token": "FCM_REGISTRATION_TOKEN",
  "userId": "USER_ID"
}
```

### 3. Cấu hình Domain

Thêm domain của bạn vào Firebase Console:

- Project Settings → General → Your apps → Web app → Add domain

## 📝 Cách sử dụng

### 1. Trong Component

```vue
<template>
  <!-- Notification Bell sẽ tự động hiển thị khi user đã login -->
</template>

<script setup>
import { useNotifications } from "@/composables/useNotifications";

const { notifications, unreadCount, requestPermission, markAsRead } =
  useNotifications();

// Yêu cầu permission thủ công (nếu cần)
const enableNotifications = async () => {
  const success = await requestPermission();
  if (success) {
    console.log("Notifications enabled!");
  }
};
</script>
```

### 2. Gửi thông báo từ server

```javascript
// Node.js example với Firebase Admin SDK
const message = {
  notification: {
    title: "Đặt sân thành công!",
    body: "Sân tennis A đã được đặt cho ngày 20/09/2025",
    icon: "/favicon.ico",
  },
  data: {
    bookingId: "12345",
    url: "/bookings/12345",
  },
  token: USER_FCM_TOKEN,
};

await admin.messaging().send(message);
```

## 🎨 UI/UX Features

### Notification Bell

- Badge hiển thị số thông báo chưa đọc
- Hover effects và transitions mượt mà
- Dropdown với danh sách thông báo
- Responsive trên mobile

### Permission Modal

- Hiển thị sau 3 giây khi vào trang (chỉ lần đầu)
- Option "Không hỏi lại"
- Loading state khi đang xử lý
- Toast notification thành công/lỗi

### Notification Items

- Hiển thị title, body, timestamp
- Indicator cho thông báo chưa đọc
- Click để đánh dấu đã đọc
- Delete button cho từng thông báo
- Action buttons (Xem chi tiết, Bỏ qua)

## 🔧 Customization

### Thay đổi thời gian hiển thị modal

```javascript
// src/components/UI/NotificationPermission.vue
setTimeout(() => {
  showPermissionModal.value = true;
}, 3000); // Thay đổi 3000ms thành giá trị khác
```

### Tùy chỉnh style notifications

```css
/* src/components/UI/NotificationBell.vue */
.notification-item {
  /* Custom styles */
}
```

### Thêm notification actions

```javascript
// public/firebase-messaging-sw.js
const notificationOptions = {
  // ... existing options
  actions: [
    { action: "view", title: "Xem chi tiết" },
    { action: "book", title: "Đặt sân ngay" }, // Thêm action mới
    { action: "dismiss", title: "Bỏ qua" },
  ],
};
```

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **"Registration failed"**: Kiểm tra VAPID key
2. **Service Worker not found**: Đảm bảo file trong thư mục `public/`
3. **Permission denied**: User đã từ chối, cần reset trong browser settings
4. **Network error**: Kiểm tra Firebase config và internet connection

### Debug mode:

```javascript
// Bật console logs trong useNotifications.js
console.log("FCM Token:", token);
console.log("Notification received:", payload);
```

## 📱 Browser Support

- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ⚠️ Limited support (iOS 16.4+)
- Edge: ✅ Full support

## 🔒 Bảo mật

- FCM tokens được mã hóa và lưu trữ an toàn
- Service Worker chỉ chạy trên HTTPS
- User có thể tắt thông báo bất cứ lúc nào
- Không lưu trữ nội dung thông báo local

## 📈 Monitoring

Theo dõi metrics quan trọng:

- Permission grant rate
- Notification delivery rate
- Click-through rate
- Unsubscribe rate

---

🎉 **Setup hoàn tất!** Push notifications đã sẵn sàng sử dụng trên ứng dụng BookingSport.

Để test thử nghiệm, bạn có thể sử dụng Firebase Console → Cloud Messaging → Send test message.
