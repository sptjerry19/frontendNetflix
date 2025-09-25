<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Tổng quan về sân và đặt sân của bạn</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Tổng đặt sân</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.total_bookings }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Hoàn thành</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.completed_bookings }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Sân đang hoạt động</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.active_venues }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Doanh thu tháng</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ formatCurrency(stats.monthly_revenue) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Charts -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Revenue Chart -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-900">
                Doanh thu 6 tháng gần nhất
              </h2>
              <select
                class="text-sm border border-gray-300 rounded-md px-3 py-1"
              >
                <option>6 tháng</option>
                <option>12 tháng</option>
              </select>
            </div>
            <!-- Mock Chart -->
            <div
              class="h-64 bg-gray-50 rounded-lg flex items-center justify-center"
            >
              <div class="text-center">
                <div
                  class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p class="text-gray-600">Biểu đồ doanh thu sẽ hiển thị ở đây</p>
                <p class="text-sm text-gray-500 mt-1">
                  Cần tích hợp thư viện biểu đồ
                </p>
              </div>
            </div>
          </div>

          <!-- Popular Courts -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">
              Sân phổ biến nhất
            </h2>
            <div class="space-y-4">
              <div
                v-for="court in stats.popular_courts"
                :key="court.court_name"
                class="flex items-center justify-between"
              >
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900">
                    {{ court.court_name }}
                  </h3>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      class="bg-blue-600 h-2 rounded-full"
                      :style="{
                        width: `${
                          (court.booking_count / maxBookingCount) * 100
                        }%`,
                      }"
                    ></div>
                  </div>
                </div>
                <span class="text-sm text-gray-600 ml-4"
                  >{{ court.booking_count }} lượt</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Hành động nhanh
            </h3>
            <div class="space-y-3">
              <RouterLink
                to="/dashboard/venues/create"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors block text-center"
              >
                + Thêm sân mới
              </RouterLink>
              <RouterLink
                to="/dashboard/venues"
                class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors block text-center"
              >
                Quản lý sân
              </RouterLink>
              <RouterLink
                to="/dashboard/bookings"
                class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors block text-center"
              >
                Quản lý đặt sân
              </RouterLink>
            </div>
          </div>

          <!-- Recent Bookings -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Đặt sân gần nhất
            </h3>
            <div class="space-y-4">
              <div
                v-for="booking in recentBookings"
                :key="booking.id"
                class="border-l-4 border-blue-500 pl-4"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ booking.user?.name }}
                    </p>
                    <p class="text-xs text-gray-600">
                      {{ booking.court?.name }}
                    </p>
                  </div>
                  <span
                    :class="getStatusClass(booking.status)"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ getStatusText(booking.status) }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  {{ formatDate(booking.booking_date) }} •
                  {{ formatTime(booking.start_time) }}
                </p>
              </div>
            </div>
            <RouterLink
              to="/dashboard/bookings"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium inline-block mt-4"
            >
              Xem tất cả →
            </RouterLink>
          </div>

          <!-- Notifications -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Thông báo</h3>
            <div class="space-y-3 text-sm">
              <div
                class="flex items-start space-x-3 p-2 bg-yellow-50 rounded-md"
              >
                <svg
                  class="w-4 h-4 text-yellow-600 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
                  />
                </svg>
                <div>
                  <p class="text-yellow-800 font-medium">
                    Có 3 đặt sân chờ xác nhận
                  </p>
                  <p class="text-yellow-700 text-xs">
                    Vui lòng kiểm tra và xác nhận
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3 p-2 bg-blue-50 rounded-md">
                <svg
                  class="w-4 h-4 text-blue-600 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
                  />
                </svg>
                <div>
                  <p class="text-blue-800 font-medium">Cập nhật ứng dụng</p>
                  <p class="text-blue-700 text-xs">
                    Phiên bản mới có nhiều tính năng hay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/useApi";

export default {
  name: "OwnerDashboard",
  setup() {
    const api = useApi();

    const loading = ref(false);
    const stats = ref({
      total_bookings: 0,
      completed_bookings: 0,
      cancelled_bookings: 0,
      active_venues: 0,
      monthly_revenue: 0,
      popular_courts: [],
    });

    const recentBookings = ref([]);

    // Computed
    const maxBookingCount = computed(() => {
      return Math.max(
        ...stats.value.popular_courts.map((court) => court.booking_count),
        1
      );
    });

    // Methods
    const loadDashboardData = async () => {
      try {
        loading.value = true;

        // Load booking stats
        // const statsResponse = await api.getBookingStats();
        // stats.value = statsResponse.data;

        // Load recent bookings
        // const bookingsResponse = await api.getOwnerBookings();
        // recentBookings.value = bookingsResponse.data.slice(0, 5);

        // Mock data for demonstration
        stats.value = {
          total_bookings: 156,
          completed_bookings: 134,
          cancelled_bookings: 12,
          active_venues: 3,
          monthly_revenue: 45000000,
          popular_courts: [
            { court_name: "Sân bóng đá số 1", booking_count: 45 },
            { court_name: "Sân cầu lông A", booking_count: 38 },
            { court_name: "Sân tennis VIP", booking_count: 32 },
            { court_name: "Sân bóng đá số 2", booking_count: 28 },
          ],
        };

        recentBookings.value = [
          {
            id: 1,
            user: { name: "Nguyễn Văn A" },
            court: { name: "Sân bóng đá số 1" },
            booking_date: "2024-01-15",
            start_time: "19:00",
            status: "pending",
          },
          {
            id: 2,
            user: { name: "Trần Thị B" },
            court: { name: "Sân cầu lông A" },
            booking_date: "2024-01-15",
            start_time: "20:00",
            status: "confirmed",
          },
        ];
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        loading.value = false;
      }
    };

    // Helper functions
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("vi-VN");
    };

    const formatTime = (timeString) => {
      return timeString ? timeString.substring(0, 5) : "";
    };

    const getStatusText = (status) => {
      const statusMap = {
        pending: "Chờ xác nhận",
        confirmed: "Đã xác nhận",
        cancelled: "Đã hủy",
        completed: "Hoàn thành",
      };
      return statusMap[status] || status;
    };

    const getStatusClass = (status) => {
      const classMap = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
        completed: "bg-blue-100 text-blue-800",
      };
      return classMap[status] || "bg-gray-100 text-gray-800";
    };

    // Initialize
    onMounted(() => {
      loadDashboardData();
    });

    return {
      loading,
      stats,
      recentBookings,
      maxBookingCount,
      formatCurrency,
      formatDate,
      formatTime,
      getStatusText,
      getStatusClass,
    };
  },
};
</script>
