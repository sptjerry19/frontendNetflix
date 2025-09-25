<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Quản lý đặt sân</h1>
        <p class="mt-2 text-gray-600">
          Quản lý tất cả các đặt sân tại các sân của bạn
        </p>
      </div>

      <!-- Stats Summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Chờ xác nhận</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.pending }}
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
              <p class="text-sm text-gray-500">Đã xác nhận</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.confirmed }}
              </p>
            </div>
          </div>
        </div>

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
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Hoàn thành</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.completed }}
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
              <p class="text-sm text-gray-500">Doanh thu hôm nay</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ formatCurrency(stats.daily_revenue) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Trạng thái:</label
            >
            <select
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="loadBookings"
            >
              <option value="">Tất cả</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Sân:</label
            >
            <select
              v-model="filters.venue_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="loadBookings"
            >
              <option value="">Tất cả sân</option>
              <option
                v-for="venue in myVenues"
                :key="venue.id"
                :value="venue.id"
              >
                {{ venue.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Từ ngày:</label
            >
            <input
              v-model="filters.date_from"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="loadBookings"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Đến ngày:</label
            >
            <input
              v-model="filters.date_to"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="loadBookings"
            />
          </div>
          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Đặt lại
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- No Bookings -->
      <div
        v-else-if="bookings.length === 0"
        class="bg-white rounded-lg shadow p-12 text-center"
      >
        <div
          class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4"
        >
          <svg
            class="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Chưa có đặt sân nào
        </h3>
        <p class="text-gray-500">
          Chưa có đặt sân nào phù hợp với bộ lọc hiện tại.
        </p>
      </div>

      <!-- Bookings Table -->
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Khách hàng
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sân
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày & Giờ
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thành tiền
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trạng thái
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="booking in bookings"
                :key="booking.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"
                      >
                        <span class="text-sm font-medium text-gray-700">
                          {{ booking.user?.name?.charAt(0).toUpperCase() }}
                        </span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ booking.user?.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ booking.user?.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ booking.venue?.name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ booking.court?.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDate(booking.booking_date) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatTime(booking.start_time) }} -
                    {{ formatTime(booking.end_time) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatCurrency(booking.total_price) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ getPaymentStatusText(booking.payment_status) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(booking.status)"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ getStatusText(booking.status) }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
                >
                  <RouterLink
                    :to="`/bookings/${booking.id}`"
                    class="text-blue-600 hover:text-blue-700 inline-block"
                  >
                    Chi tiết
                  </RouterLink>
                  <button
                    v-if="booking.status === 'pending'"
                    @click="confirmBooking(booking)"
                    class="text-green-600 hover:text-green-700"
                  >
                    Xác nhận
                  </button>
                  <button
                    v-if="canCancel(booking)"
                    @click="cancelBooking(booking)"
                    class="text-red-600 hover:text-red-700"
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination.last_page > 1"
          class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="loadBookings(pagination.current_page - 1)"
                :disabled="pagination.current_page === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Trước
              </button>
              <button
                @click="loadBookings(pagination.current_page + 1)"
                :disabled="pagination.current_page === pagination.last_page"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sau
              </button>
            </div>
            <div
              class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-sm text-gray-700">
                  Hiển thị
                  <span class="font-medium">{{
                    (pagination.current_page - 1) * pagination.per_page + 1
                  }}</span>
                  đến
                  <span class="font-medium">{{
                    Math.min(
                      pagination.current_page * pagination.per_page,
                      pagination.total
                    )
                  }}</span>
                  trong
                  <span class="font-medium">{{ pagination.total }}</span>
                  kết quả
                </p>
              </div>
              <div>
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                >
                  <button
                    v-for="page in paginationPages"
                    :key="page"
                    @click="loadBookings(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === pagination.current_page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    ]"
                  >
                    {{ page }}
                  </button>
                </nav>
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
  name: "ManageBookings",
  setup() {
    const api = useApi();

    const loading = ref(false);
    const bookings = ref([]);
    const myVenues = ref([]);

    const stats = ref({
      pending: 0,
      confirmed: 0,
      completed: 0,
      daily_revenue: 0,
    });

    const filters = ref({
      status: "",
      venue_id: "",
      date_from: "",
      date_to: "",
    });

    const pagination = ref({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    });

    // Computed
    const paginationPages = computed(() => {
      const pages = [];
      const start = Math.max(1, pagination.value.current_page - 2);
      const end = Math.min(
        pagination.value.last_page,
        pagination.value.current_page + 2
      );

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    // Methods
    const loadBookings = async (page = 1) => {
      try {
        loading.value = true;

        const params = {
          page,
          per_page: pagination.value.per_page,
          owner: true,
          ...filters.value,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
          if (params[key] === "" || params[key] === null) {
            delete params[key];
          }
        });

        // const response = await api.getOwnerBookings(params);

        // Mock data for demonstration
        bookings.value = [
          {
            id: 1,
            user: {
              name: "Nguyễn Văn A",
              email: "nguyenvana@email.com",
            },
            venue: { name: "Sân bóng đá ABC" },
            court: { name: "Sân số 1" },
            booking_date: "2024-01-20",
            start_time: "19:00",
            end_time: "21:00",
            total_price: 500000,
            status: "pending",
            payment_status: "pending",
            created_at: "2024-01-15T10:30:00Z",
          },
          {
            id: 2,
            user: {
              name: "Trần Thị B",
              email: "tranthib@email.com",
            },
            venue: { name: "Trung tâm cầu lông XYZ" },
            court: { name: "Sân A" },
            booking_date: "2024-01-18",
            start_time: "20:00",
            end_time: "22:00",
            total_price: 300000,
            status: "confirmed",
            payment_status: "paid",
            created_at: "2024-01-14T15:20:00Z",
          },
        ];

        pagination.value = {
          current_page: page,
          last_page: 2,
          per_page: 15,
          total: bookings.value.length,
        };
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        loading.value = false;
      }
    };

    const loadStats = async () => {
      try {
        // const response = await api.getBookingStats();
        // stats.value = response.data;

        // Mock stats
        stats.value = {
          pending: 12,
          confirmed: 25,
          completed: 148,
          daily_revenue: 2450000,
        };
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    const loadMyVenues = async () => {
      try {
        // const response = await api.getVenues({ owner: true });
        // myVenues.value = response.data.data;

        // Mock venues
        myVenues.value = [
          { id: 1, name: "Sân bóng đá ABC" },
          { id: 2, name: "Trung tâm cầu lông XYZ" },
        ];
      } catch (error) {
        console.error("Failed to load venues:", error);
      }
    };

    const confirmBooking = async (booking) => {
      if (!confirm(`Xác nhận đặt sân cho khách hàng "${booking.user.name}"?`)) {
        return;
      }

      try {
        // await api.updateBooking(booking.id, { status: 'confirmed' });

        booking.status = "confirmed";
        stats.value.pending--;
        stats.value.confirmed++;

        alert("Đã xác nhận đặt sân thành công!");
      } catch (error) {
        console.error("Failed to confirm booking:", error);
        alert("Có lỗi xảy ra khi xác nhận đặt sân!");
      }
    };

    const cancelBooking = async (booking) => {
      if (!confirm(`Hủy đặt sân cho khách hàng "${booking.user.name}"?`)) {
        return;
      }

      try {
        // await api.cancelBooking(booking.id);

        booking.status = "cancelled";

        alert("Đã hủy đặt sân thành công!");
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        alert("Có lỗi xảy ra khi hủy đặt sân!");
      }
    };

    const canCancel = (booking) => {
      const now = new Date();
      const bookingDateTime = new Date(
        `${booking.booking_date}T${booking.start_time}`
      );
      const hoursUntilBooking = (bookingDateTime - now) / (1000 * 60 * 60);

      return (
        (booking.status === "pending" || booking.status === "confirmed") &&
        hoursUntilBooking > 2
      );
    };

    const resetFilters = () => {
      filters.value = {
        status: "",
        venue_id: "",
        date_from: "",
        date_to: "",
      };
      loadBookings();
    };

    // Helper functions
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const formatTime = (timeString) => {
      return timeString ? timeString.substring(0, 5) : "";
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
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

    const getPaymentStatusText = (status) => {
      const statusMap = {
        pending: "Chờ thanh toán",
        paid: "Đã thanh toán",
        failed: "Thanh toán thất bại",
        refunded: "Đã hoàn tiền",
      };
      return statusMap[status] || status;
    };

    // Initialize
    onMounted(() => {
      loadBookings();
      loadStats();
      loadMyVenues();
    });

    return {
      loading,
      bookings,
      myVenues,
      stats,
      filters,
      pagination,
      paginationPages,
      loadBookings,
      confirmBooking,
      cancelBooking,
      canCancel,
      resetFilters,
      formatDate,
      formatTime,
      formatCurrency,
      getStatusText,
      getStatusClass,
      getPaymentStatusText,
    };
  },
};
</script>
