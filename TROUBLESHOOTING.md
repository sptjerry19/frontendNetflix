# 🔧 Troubleshooting Guide - Push Notifications & CORS

## ⚠️ Vấn đề hiện tại

1. **CORS Error**: Backend chỉ cho phép `localhost:3000` nhưng frontend chạy trên `localhost:5173`
2. **Push Notifications không hoạt động**: Không nhận được FCM token

---

## 🎯 **Giải pháp CORS**

### Option 1: Cấu hình Backend (Khuyến nghị)

**Backend Laravel/PHP** - Trong file `config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://localhost:5173',  // Thêm port của Vite
    'http://127.0.0.1:5173',
],
```

**Backend Node.js** - Cài đặt và cấu hình CORS:

```javascript
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);
```

### Option 2: Thay đổi Port Frontend

Trong `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000, // Thay đổi từ 5173 sang 3000
  },
});
```

---

## 🔔 **Giải pháp Push Notifications**

### Bước 1: Tạo VAPID Key

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Chọn project `yumic-83e7d`
3. **Project Settings** → **Cloud Messaging**
4. Trong **Web configuration**, click **Generate key pair**
5. Copy **VAPID key**

### Bước 2: Cập nhật Environment Variables

Tạo/sửa file `.env` trong root project:

```bash
VITE_API_BASE=http://localhost:8000/api/v1
VITE_FIREBASE_VAPID_KEY=BH4dXcs-VqJp6erHWuI3mLg1Hn2s...  # Paste VAPID key ở đây
```

### Bước 3: Restart Dev Server

```bash
# Dừng server hiện tại (Ctrl+C)
npm run dev
```

---

## 🧪 **Test Notifications**

### 1. Kiểm tra Browser Console

Mở **DevTools** → **Console**, bạn sẽ thấy:

```
Service Worker đã được đăng ký: ServiceWorkerRegistration {...}
Registration token: eHxqb4F5...
```

### 2. Test từ Firebase Console

1. Firebase Console → **Cloud Messaging** → **Send test message**
2. **Notification title**: "Test thông báo"
3. **Notification text**: "Đây là thông báo test"
4. **Target**: Select device → Paste FCM token từ console
5. Click **Send**

### 3. Kiểm tra Service Worker

- DevTools → **Application** → **Service Workers**
- Phải thấy `firebase-messaging-sw.js` đang **activated**

---

## 🐛 **Debug Commands**

### Kiểm tra Service Worker

```javascript
// Trong Browser Console
navigator.serviceWorker.getRegistrations().then(function (registrations) {
  console.log(registrations);
});
```

### Kiểm tra Notification Permission

```javascript
// Trong Browser Console
console.log("Permission:", Notification.permission);
```

### Force Clear và Test lại

```javascript
// Clear tất cả data
localStorage.clear();
// Reload trang và thử lại
window.location.reload();
```

---

## ✅ **Checklist Debug**

- [ ] Backend CORS đã cấu hình cho port 5173
- [ ] VAPID key đã được set trong `.env`
- [ ] `manifest.json` có `gcm_sender_id`
- [ ] Service Worker đã registered thành công
- [ ] Browser permission = "granted"
- [ ] FCM token đã được generate
- [ ] Test message từ Firebase Console thành công

---

## 🆘 **Nếu vẫn không hoạt động**

### 1. Kiểm tra Network Tab

- DevTools → Network
- Tìm request đến `/firebase-messaging-sw.js`
- Status phải là **200 OK**

### 2. Thử Clear Browser Data

1. DevTools → Application → Storage
2. Click **Clear site data**
3. Refresh trang và thử lại

### 3. Kiểm tra HTTPS

Push notifications chỉ hoạt động trên:

- `https://` domains
- `localhost` (bất kỳ port nào)

### 4. Test trên Browser khác

- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ⚠️ Limited support

---

💡 **Tip**: Luôn mở DevTools Console khi debug để thấy error messages chi tiết!
