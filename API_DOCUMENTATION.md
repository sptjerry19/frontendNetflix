# 📚 Tài Liệu API - Booking Sport Backend

## 🌟 Tổng Quan

API RESTful cho hệ thống đặt sân thể thao với Laravel Sanctum authentication.

**Base URL:** `https://your-domain.com/api/v1`

## 🔐 Xác Thực (Authentication)

### Loại Authentication

-   **Public Routes**: Không cần token
-   **Protected Routes**: Cần Bearer token
-   **Role-based Routes**: Cần token + quyền cụ thể

### Headers Bắt Buộc

```http
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

## 📊 Cấu Trúc Response

### Response Thành Công

```json
{
    "success": true,
    "message": "Thông báo thành công",
    "data": {
        // Dữ liệu trả về
    },
    "meta": {
        // Thông tin phụ (phân trang, v.v.)
    }
}
```

### Response Lỗi

```json
{
    "success": false,
    "message": "Thông báo lỗi",
    "errors": {
        // Chi tiết lỗi (nếu có)
    }
}
```

### Response Phân Trang

```json
{
    "success": true,
    "message": "Thành công",
    "data": [
        // Danh sách dữ liệu
    ],
    "meta": {
        "pagination": {
            "current_page": 1,
            "last_page": 5,
            "per_page": 15,
            "total": 75,
            "from": 1,
            "to": 15,
            "path": "https://api.example.com/v1/sports",
            "has_more_pages": true
        }
    }
}
```

---

## 🏃‍♂️ Sports API

### GET `/sports`

**Mô tả:** Lấy danh sách môn thể thao với tính năng lọc

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `is_active` | boolean | Lọc theo trạng thái | `true` |
| `search` | string | Tìm kiếm theo tên | `"tennis"` |
| `min_players` | integer | Số người chơi tối thiểu | `2` |
| `max_players` | integer | Số người chơi tối đa | `4` |
| `sort_by` | string | Sắp xếp theo field | `"name"` |
| `sort_order` | string | Thứ tự sắp xếp | `"asc"` hoặc `"desc"` |
| `per_page` | integer | Số item mỗi trang | `15` |

**Response:**

```json
{
  "success": true,
  "message": "Danh sách môn thể thao",
  "data": [
    {
      "id": 1,
      "name": "Tennis",
      "slug": "tennis",
      "description": "Môn tennis chuyên nghiệp",
      "icon": "tennis-icon",
      "positions": ["Singles", "Doubles"],
      "min_players": 2,
      "max_players": 4,
      "is_active": true,
      "created_at": "2024-01-01T10:00:00.000000Z",
      "updated_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "meta": {
    "pagination": {...}
  }
}
```

### GET `/sports/active`

**Mô tả:** Lấy danh sách môn thể thao đang hoạt động (cho dropdown)

### GET `/sports/popular`

**Mô tả:** Lấy danh sách môn thể thao phổ biến

### GET `/sports/with-court-count`

**Mô tả:** Lấy danh sách môn thể thao kèm số lượng sân

### GET `/sports/search/by-position`

**Mô tả:** Tìm kiếm môn thể thao theo vị trí

### GET `/sports/for-player-count`

**Mô tả:** Lấy môn thể thao phù hợp với số người chơi

### GET `/sports/{id}`

**Mô tả:** Lấy chi tiết môn thể thao

### GET `/sports/slug/{slug}`

**Mô tả:** Lấy môn thể thao theo slug

### GET `/sports/{id}/statistics`

**Mô tả:** Lấy thống kê môn thể thao

### POST `/sports` 🔒 _Admin Only_

**Mô tả:** Tạo môn thể thao mới

**Request Body:**

```json
{
    "name": "Tennis",
    "description": "Môn tennis chuyên nghiệp",
    "icon": "tennis-icon",
    "positions": ["Singles", "Doubles"],
    "min_players": 2,
    "max_players": 4
}
```

**Validation Rules:**

-   `name`: bắt buộc, string, max 255 ký tự, duy nhất
-   `description`: tùy chọn, string
-   `icon`: tùy chọn, string, max 100 ký tự
-   `positions`: tùy chọn, array string
-   `min_players`: bắt buộc, integer, min 1
-   `max_players`: bắt buộc, integer, >= min_players

### PUT `/sports/{id}` 🔒 _Admin Only_

**Mô tả:** Cập nhật môn thể thao

### DELETE `/sports/{id}` 🔒 _Admin Only_

**Mô tả:** Xóa môn thể thao

### PATCH `/sports/{id}/toggle-status` 🔒 _Admin Only_

**Mô tả:** Thay đổi trạng thái hoạt động

---

## 🏢 Venues API

### GET `/venues`

**Mô tả:** Lấy danh sách địa điểm với tính năng lọc

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `latitude` | float | Vĩ độ | `10.762622` |
| `longitude` | float | Kinh độ | `106.660172` |
| `radius` | integer | Bán kính tìm kiếm (km) | `5` |
| `sport_id` | integer | Lọc theo môn thể thao | `1` |
| `search` | string | Tìm kiếm theo tên | `"stadium"` |
| `amenities` | array | Lọc theo tiện ích | `["parking", "wifi"]` |
| `sort_by` | string | Sắp xếp theo field | `"name"` |
| `sort_order` | string | Thứ tự sắp xếp | `"asc"` |
| `per_page` | integer | Số item mỗi trang | `15` |

### GET `/venues/{id}`

**Mô tả:** Lấy chi tiết địa điểm

**Response:**

```json
{
    "success": true,
    "message": "Chi tiết venue",
    "data": {
        "id": 1,
        "name": "Stadium ABC",
        "description": "Sân vận động hiện đại",
        "address": "123 Main St, District 1, HCMC",
        "latitude": 10.762622,
        "longitude": 106.660172,
        "phone": "+84901234567",
        "email": "info@stadiumabc.com",
        "amenities": ["parking", "wifi", "restaurant"],
        "opening_hours": {
            "monday": "06:00-22:00",
            "tuesday": "06:00-22:00"
        },
        "status": "approved",
        "owner_id": 2,
        "courts": [
            {
                "id": 1,
                "name": "Court 1",
                "sport": {
                    "name": "Tennis"
                }
            }
        ]
    }
}
```

### GET `/venues/{id}/availability`

**Mô tả:** Kiểm tra tình trạng trống của địa điểm

### GET `/my-venues` 🔒 _Authenticated_

**Mô tả:** Lấy danh sách địa điểm của user hiện tại

### POST `/venues` 🔒 _Owner/Admin_

**Mô tả:** Tạo địa điểm mới

**Request Body:**

```json
{
    "name": "Stadium ABC",
    "description": "Sân vận động hiện đại",
    "address": "123 Main St, District 1, HCMC",
    "latitude": 10.762622,
    "longitude": 106.660172,
    "phone": "+84901234567",
    "email": "info@stadiumabc.com",
    "amenities": ["parking", "wifi", "restaurant"],
    "opening_hours": {
        "monday": "06:00-22:00",
        "tuesday": "06:00-22:00"
    }
}
```

### PUT `/venues/{id}` 🔒 _Owner/Admin_

**Mô tả:** Cập nhật địa điểm

### DELETE `/venues/{id}` 🔒 _Owner/Admin_

**Mô tả:** Xóa địa điểm

### PATCH `/venues/{id}/toggle-status` 🔒 _Owner/Admin_

**Mô tả:** Thay đổi trạng thái địa điểm

### GET `/venues/{id}/statistics` 🔒 _Owner/Admin_

**Mô tả:** Lấy thống kê địa điểm

### PATCH `/venues/{id}/approve` 🔒 _Admin Only_

**Mô tả:** Phê duyệt địa điểm

### PATCH `/venues/{id}/reject` 🔒 _Admin Only_

**Mô tả:** Từ chối địa điểm

---

## ⛹️ Courts API

### GET `/courts`

**Mô tả:** Lấy danh sách sân với tính năng lọc

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `venue_id` | integer | Lọc theo địa điểm | `1` |
| `sport_id` | integer | Lọc theo môn thể thao | `1` |
| `surface_type` | string | Loại mặt sân | `"grass"` |
| `min_price` | float | Giá tối thiểu | `100000` |
| `max_price` | float | Giá tối đa | `500000` |
| `search` | string | Tìm kiếm theo tên | `"court"` |
| `sort_by` | string | Sắp xếp theo field | `"price"` |
| `sort_order` | string | Thứ tự sắp xếp | `"asc"` |
| `per_page` | integer | Số item mỗi trang | `15` |

### GET `/courts/popular`

**Mô tả:** Lấy danh sách sân phổ biến

### GET `/courts/{id}`

**Mô tả:** Lấy chi tiết sân

**Response:**

```json
{
    "success": true,
    "message": "Chi tiết sân",
    "data": {
        "id": 1,
        "name": "Court Tennis 1",
        "description": "Sân tennis chất lượng cao",
        "surface_type": "hard_court",
        "base_price": 200000,
        "sport_id": 1,
        "venue_id": 1,
        "is_active": true,
        "sport": {
            "id": 1,
            "name": "Tennis"
        },
        "venue": {
            "id": 1,
            "name": "Stadium ABC"
        },
        "pricing_rules": [
            {
                "id": 1,
                "time_start": "06:00:00",
                "time_end": "09:00:00",
                "price_per_hour": 150000,
                "day_of_week": null
            }
        ]
    }
}
```

### GET `/courts/{id}/availability`

**Mô tả:** Kiểm tra tình trạng trống của sân

### GET `/courts/{id}/availability-range`

**Mô tả:** Kiểm tra tình trạng trống trong khoảng thời gian

### POST `/courts/{id}/check-availability`

**Mô tả:** Kiểm tra sân có trống tại thời điểm cụ thể

**Request Body:**

```json
{
    "date": "2024-12-25",
    "time_start": "08:00",
    "time_end": "10:00"
}
```

### GET `/venues/{venue_id}/courts`

**Mô tả:** Lấy danh sách sân của một địa điểm

### POST `/courts` 🔒 _Owner/Admin_

**Mô tả:** Tạo sân mới

### PUT `/courts/{id}` 🔒 _Owner/Admin_

**Mô tả:** Cập nhật sân

### DELETE `/courts/{id}` 🔒 _Owner/Admin_

**Mô tả:** Xóa sân

### PATCH `/courts/{id}/toggle-status` 🔒 _Owner/Admin_

**Mô tả:** Thay đổi trạng thái sân

### GET `/courts/{id}/statistics` 🔒 _Owner/Admin_

**Mô tả:** Lấy thống kê sân

---

## 🔐 Authentication API

### POST `/auth/register`

**Mô tả:** Đăng ký tài khoản mới

**Request Body:**

```json
{
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "password": "Password123!",
    "password_confirmation": "Password123!",
    "phone": "+84901234567",
    "level": "intermediate",
    "preferred_sports": [1, 2, 3],
    "preferred_position": ["Singles", "Doubles"]
}
```

**Validation Rules:**

-   `name`: bắt buộc, string, max 255 ký tự
-   `email`: bắt buộc, email hợp lệ, duy nhất
-   `password`: bắt buộc, confirmed, theo Laravel password rules
-   `phone`: tùy chọn, string max 20 ký tự, duy nhất
-   `level`: tùy chọn, enum: beginner, intermediate, advanced
-   `preferred_sports`: tùy chọn, array các sport ID hợp lệ
-   `preferred_position`: tùy chọn, array

**Response:**

```json
{
    "success": true,
    "message": "Đăng ký thành công",
    "data": {
        "user": {
            "id": 1,
            "name": "Nguyen Van A",
            "email": "nguyenvana@example.com",
            "phone": "+84901234567",
            "level": "intermediate",
            "preferred_sports": [1, 2, 3],
            "preferred_position": ["Singles", "Doubles"],
            "roles": ["player"],
            "created_at": "2024-01-01T10:00:00.000000Z"
        },
        "token": "1|abc123...",
        "token_type": "Bearer",
        "expires_in": 3600
    }
}
```

### POST `/auth/login`

**Mô tả:** Đăng nhập

**Request Body:**

```json
{
    "email": "nguyenvana@example.com",
    "password": "Password123!",
    "device_name": "iPhone 15"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Đăng nhập thành công",
    "data": {
        "user": {
            "id": 1,
            "name": "Nguyen Van A",
            "email": "nguyenvana@example.com",
            "roles": ["player"],
            "permissions": []
        },
        "token": "1|abc123...",
        "token_type": "Bearer",
        "expires_in": 3600
    }
}
```

### POST `/auth/forgot-password`

**Mô tả:** Quên mật khẩu - gửi email reset

**Request Body:**

```json
{
    "email": "nguyenvana@example.com"
}
```

### POST `/auth/reset-password`

**Mô tả:** Đặt lại mật khẩu

**Request Body:**

```json
{
    "token": "reset_token_here",
    "email": "nguyenvana@example.com",
    "password": "NewPassword123!",
    "password_confirmation": "NewPassword123!"
}
```

### POST `/auth/logout` 🔒 _Authenticated_

**Mô tả:** Đăng xuất thiết bị hiện tại

### POST `/auth/logout-all` 🔒 _Authenticated_

**Mô tả:** Đăng xuất tất cả thiết bị

### POST `/auth/refresh-token` 🔒 _Authenticated_

**Mô tả:** Làm mới token

### POST `/auth/change-password` 🔒 _Authenticated_

**Mô tả:** Thay đổi mật khẩu

**Request Body:**

```json
{
    "current_password": "OldPassword123!",
    "password": "NewPassword123!",
    "password_confirmation": "NewPassword123!"
}
```

### GET `/auth/me` 🔒 _Authenticated_

**Mô tả:** Lấy thông tin user hiện tại

---

## 👤 Profile API

### GET `/profile` 🔒 _Authenticated_

**Mô tả:** Lấy thông tin profile

**Response:**

```json
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "name": "Nguyen Van A",
            "email": "nguyenvana@example.com",
            "phone": "+84901234567",
            "level": "intermediate",
            "preferred_sports": [1, 2, 3],
            "preferred_position": ["Singles", "Doubles"],
            "avatar": "https://api.example.com/storage/avatars/user1.jpg",
            "roles": ["player"],
            "permissions": [],
            "email_verified_at": "2024-01-01T10:00:00.000000Z",
            "created_at": "2024-01-01T10:00:00.000000Z",
            "updated_at": "2024-01-01T10:00:00.000000Z"
        },
        "stats": {
            "total_bookings": 15,
            "active_devices": 2
        }
    }
}
```

### PUT `/profile` 🔒 _Authenticated_

**Mô tả:** Cập nhật profile

**Request Body:**

```json
{
    "name": "Nguyen Van A Updated",
    "phone": "+84901234568",
    "level": "advanced",
    "preferred_sports": [1, 3, 4],
    "preferred_position": ["Singles"]
}
```

### POST `/profile/avatar` 🔒 _Authenticated_

**Mô tả:** Upload avatar

**Request Body:** `multipart/form-data`

-   `avatar`: file (image, max 2MB)

---

## 📱 Notifications API

### POST `/notifications/register-token` 🔒 _Authenticated_

**Mô tả:** Đăng ký FCM device token

**Request Body:**

```json
{
    "token": "fcm_device_token_here",
    "device_type": "ios",
    "device_name": "iPhone 15"
}
```

### POST `/notifications/remove-token` 🔒 _Authenticated_

**Mô tả:** Xóa device token

**Request Body:**

```json
{
    "token": "fcm_device_token_here"
}
```

### POST `/notifications/test` 🔒 _Authenticated_

**Mô tả:** Gửi test notification

### GET `/notifications/my-devices` 🔒 _Authenticated_

**Mô tả:** Lấy danh sách device của user

### POST `/notifications/broadcast-topic` 🔒 _Authenticated_

**Mô tả:** Broadcast qua topic (SDK 6.9.6+)

### POST `/notifications/send-role-topic` 🔒 _Authenticated_

**Mô tả:** Gửi notification theo role qua topic

### POST `/notifications/send-to-users` 🔒 _Admin Only_

**Mô tả:** Gửi notification cho nhiều user

### POST `/notifications/send-to-all` 🔒 _Admin Only_

**Mô tả:** Gửi notification cho tất cả user

### POST `/notifications/send-to-role` 🔒 _Admin Only_

**Mô tả:** Gửi notification theo role

### GET `/notifications/list` 🔒 _Admin Only_

**Mô tả:** Lấy danh sách notifications

### GET `/notifications/stats` 🔒 _Admin Only_

**Mô tả:** Lấy thống kê notifications

### GET `/notifications/{id}` 🔒 _Admin Only_

**Mô tả:** Lấy chi tiết notification

---

## ❌ Mã Lỗi HTTP

| Code  | Description          |
| ----- | -------------------- |
| `200` | Thành công           |
| `201` | Tạo thành công       |
| `400` | Yêu cầu không hợp lệ |
| `401` | Chưa xác thực        |
| `403` | Không có quyền       |
| `404` | Không tìm thấy       |
| `422` | Lỗi validation       |
| `500` | Lỗi server           |

## 🔒 Roles & Permissions

### Roles

-   **player**: Người chơi cơ bản
-   **owner**: Chủ sân/địa điểm
-   **admin**: Quản trị viên

### Route Protection

-   🌐 **Public**: Không cần authentication
-   🔒 **Authenticated**: Cần token hợp lệ
-   👑 **Owner/Admin**: Cần role owner hoặc admin
-   🏛️ **Admin Only**: Chỉ admin

## 📝 Lưu Ý Quan Trọng

1. **Rate Limiting**: API có giới hạn số request/phút
2. **Pagination**: Mặc định 15 items/trang, max 100
3. **Timezone**: Sử dụng UTC, client tự convert
4. **File Upload**: Max 2MB, support jpg, png, pdf
5. **Search**: Hỗ trợ full-text search cho tên và mô tả
6. **Sorting**: Mặc định sắp xếp theo created_at desc

## 🚀 Ví Dụ Sử Dụng

### Đăng nhập và lấy danh sách sân

```bash
# Đăng nhập
curl -X POST https://api.example.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","device_name":"My Device"}'

# Sử dụng token để lấy danh sách sân
curl -X GET https://api.example.com/api/v1/courts \
  -H "Authorization: Bearer your_token_here" \
  -H "Accept: application/json"
```

### Tạo địa điểm mới

```bash
curl -X POST https://api.example.com/api/v1/venues \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Stadium",
    "address": "123 Main St",
    "latitude": 10.762622,
    "longitude": 106.660172,
    "phone": "+84901234567"
  }'
```

## 📞 Hỗ Trợ

-   **Email**: support@bookingsport.com
-   **Documentation**: https://docs.bookingsport.com
-   **Status Page**: https://status.bookingsport.com

---

_Cập nhật lần cuối: December 2024_
_API Version: v1.0.0_
