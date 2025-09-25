# Booking Sport Frontend

Ứng dụng frontend cho hệ thống đặt sân thể thao được xây dựng bằng Vue.js 3 và Tailwind CSS.

## ✨ Tính năng

### Người dùng

- 🏠 **Trang chủ**: Tìm kiếm và khám phá các sân thể thao
- 🔍 **Tìm sân**: Lọc sân theo địa điểm, môn thể thao, giá cả
- 📅 **Đặt sân**: Xem lịch trống và đặt sân theo giờ
- 💳 **Thanh toán**: Hỗ trợ nhiều phương thức thanh toán (VNPay, Momo, chuyển khoản)
- 📱 **Quản lý booking**: Xem lịch sử và trạng thái đặt sân
- 👤 **Hồ sơ cá nhân**: Quản lý thông tin tài khoản

### Chủ sân

- 📊 **Dashboard**: Thống kê doanh thu và booking
- 🏟️ **Quản lý sân**: Thêm, sửa, xóa thông tin sân và court
- 📋 **Quản lý booking**: Xem và cập nhật trạng thái đặt sân
- 💰 **Báo cáo doanh thu**: Thống kê theo ngày, tháng

## 🛠️ Công nghệ sử dụng

- **Vue.js 3** - Framework JavaScript
- **Vue Router 4** - Routing
- **Vuex 4** - State management
- **Tailwind CSS** - CSS framework
- **Axios** - HTTP client
- **Vite** - Build tool

## 📋 Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm >= 8.0.0

## 🚀 Cài đặt và chạy

### 1. Clone repository

\`\`\`bash
git clone <repository-url>
cd booking_sport_frontend
\`\`\`

### 2. Cài đặt dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Cấu hình environment

Tạo file \`.env\` từ \`.env.example\`:
\`\`\`bash
cp .env.example .env
\`\`\`

Cập nhật các thông tin cần thiết trong file \`.env\`:
\`\`\`env
VUE_APP_API_BASE=http://localhost:8000/api/v1
VUE_APP_STORAGE_URL=http://localhost:8000/storage/
VUE_APP_NAME="Booking Sport"
\`\`\`

### 4. Chạy development server

\`\`\`bash
npm run dev
\`\`\`

Ứng dụng sẽ chạy tại \`http://localhost:5173\`

### 5. Build cho production

\`\`\`bash
npm run build
\`\`\`

## 📁 Cấu trúc thư mục

\`\`\`
src/
├── assets/ # Static assets
├── components/ # Vue components
│ ├── Auth/ # Authentication components
│ ├── Booking/ # Booking related components
│ ├── Court/ # Court components
│ ├── Layout/ # Layout components
│ ├── UI/ # Reusable UI components
│ └── Venue/ # Venue components
├── composables/ # Vue composables
│ ├── useApi.ts # API integration
│ ├── useAuth.ts # Authentication logic
│ └── useBooking.ts # Booking logic
├── middleware/ # Route middleware
│ ├── auth.ts # Authentication middleware
│ └── owner.ts # Owner role middleware
├── router/ # Vue Router configuration
├── store/ # Vuex store
├── types/ # TypeScript type definitions
├── views/ # Page components
│ ├── auth/ # Authentication pages
│ ├── booking/ # Booking pages
│ ├── dashboard/ # Owner dashboard pages
│ └── venues/ # Venue pages
├── plugins/ # Vue plugins
└── main.js # Application entry point
\`\`\`

## 🔧 Cấu hình

### API Integration

Ứng dụng sử dụng Laravel Sanctum cho authentication. Cấu hình axios client trong \`src/plugins/axios.js\`:

- Tự động thêm CSRF token
- Xử lý token authentication
- Redirect khi unauthorized

### State Management

Vuex store được chia thành các modules:

- \`auth\`: Quản lý authentication state
- \`venue\`: Quản lý venue data
- \`booking\`: Quản lý booking data
- \`ui\`: Quản lý UI state (modals, notifications)

### Routing

Router được cấu hình với:

- Public routes (không cần authentication)
- Protected routes (yêu cầu đăng nhập)
- Owner routes (yêu cầu role owner)

## 🎨 UI Components

### Các components chính:

- **VenueCard**: Hiển thị thông tin sân
- **CourtAvailability**: Hiển thị lịch trống của court
- **BookingForm**: Form đặt sân
- **PaymentForm**: Form thanh toán
- **DateTimePicker**: Component chọn ngày giờ

### Styling

- Sử dụng Tailwind CSS cho responsive design
- Dark mode support (tùy chọn)
- Mobile-first approach

## 🔐 Authentication

### Sanctum SPA Authentication

1. CSRF cookie được tự động lấy
2. Token được lưu trong localStorage
3. Tự động redirect khi session hết hạn

### User Roles

- **Customer**: Đặt sân, xem lịch sử
- **Owner**: Quản lý sân, xem thống kê
- **Admin**: Full access

## 💳 Payment Integration

Hỗ trợ các phương thức thanh toán:

- VNPay
- Momo
- ZaloPay
- Chuyển khoản ngân hàng

## 📱 Mobile Support

- Responsive design cho tất cả screen sizes
- Touch-friendly interactions
- PWA ready (nếu cần)

## 🧪 Testing

\`\`\`bash

# Unit tests

npm run test:unit

# E2E tests

npm run test:e2e
\`\`\`

## 📈 Performance

- Lazy loading cho routes
- Image optimization
- Bundle splitting
- Caching strategies

## 🔄 API Endpoints

### Authentication

- \`POST /api/v1/auth/login\` - Đăng nhập
- \`POST /api/v1/auth/register\` - Đăng ký
- \`POST /api/v1/auth/logout\` - Đăng xuất

### Venues

- \`GET /api/v1/venues\` - Danh sách sân
- \`GET /api/v1/venues/{id}\` - Chi tiết sân
- \`POST /api/v1/venues\` - Tạo sân mới (owner)

### Bookings

- \`GET /api/v1/me/bookings\` - Booking của user
- \`POST /api/v1/bookings\` - Tạo booking mới
- \`GET /api/v1/courts/{id}/availability\` - Lịch trống

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License

## 🙋‍♂️ Support

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ team phát triển.
