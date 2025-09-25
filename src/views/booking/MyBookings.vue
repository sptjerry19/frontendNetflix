<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Đặt sân của tôi</h1>
        <p class="mt-2 text-gray-600">
          Quản lý và theo dõi các đặt sân của bạn
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <p class="text-gray-500 mb-6">
          Bạn chưa có đặt sân nào. Hãy tìm và đặt sân yêu thích của bạn!
        </p>
        <RouterLink
          to="/venues"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
        >
          Tìm sân ngay
        </RouterLink>
      </div>

      <!-- Bookings List -->
      <div v-else class="space-y-6">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <!-- Venue & Court Info -->
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <div
                      class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center"
                    >
                      <svg
                        class="w-8 h-8 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">
                      {{ booking.venue?.name }}
                    </h3>
                    <p class="text-sm text-gray-600 mb-1">
                      {{ booking.court?.name }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ booking.venue?.address }}
                    </p>
                  </div>
                </div>

                <!-- Booking Details -->
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p class="text-xs text-gray-500">Ngày:</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ formatDate(booking.booking_date) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Giờ:</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ formatTime(booking.start_time) }} -
                      {{ formatTime(booking.end_time) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Tổng tiền:</p>
                    <p class="text-sm font-medium text-green-600">
                      {{ formatCurrency(booking.total_price) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex-shrink-0 ml-4">
                <!-- Status Badge -->
                <div class="flex items-center space-x-2 mb-4">
                  <span
                    :class="getStatusClass(booking.status)"
                    class="px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {{ getStatusText(booking.status) }}
                  </span>
                  <span
                    :class="getPaymentStatusClass(booking.payment_status)"
                    class="px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {{ getPaymentStatusText(booking.payment_status) }}
                  </span>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <RouterLink
                    :to="`/bookings/${booking.id}`"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Chi tiết
                  </RouterLink>
                  <button
                    v-if="canCancel(booking)"
                    @click="cancelBooking(booking)"
                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Hủy đặt
                  </button>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div
              v-if="booking.notes"
              class="mt-4 pt-4 border-t border-gray-200"
            >
              <p class="text-xs text-gray-500 mb-1">Ghi chú:</p>
              <p class="text-sm text-gray-700">{{ booking.notes }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            v-for="page in paginationPages"
            :key="page"
            @click="loadBookings(page)"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              page === pagination.current_page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border',
            ]"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useBooking } from "@/composables/useBooking";

export default {
  name: "MyBookings",
  setup() {
    const booking = useBooking();

    // Reactive data
    const bookings = ref([]);
    const loading = ref(false);
    const filters = ref({
      status: "",
      date_from: "",
      date_to: "",
    });

    const pagination = ref({
      current_page: 1,
      last_page: 1,
      per_page: 10,
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
        const result = await booking.getMyBookings();

        if (result.success) {
          bookings.value = result.data || [];
          // Mock pagination data
          pagination.value = {
            current_page: page,
            last_page: Math.ceil(bookings.value.length / 10),
            per_page: 10,
            total: bookings.value.length,
          };
        }
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        loading.value = false;
      }
    };

    const cancelBooking = async (bookingData) => {
      if (!confirm("Bạn có chắc chắn muốn hủy đặt sân này?")) {
        return;
      }

      try {
        const result = await booking.cancelBooking(bookingData.id);
        if (result.success) {
          // Update booking in list
          const index = bookings.value.findIndex(
            (b) => b.id === bookingData.id
          );
          if (index > -1) {
            bookings.value[index] = result.data;
          }
          alert("Đặt sân đã được hủy thành công!");
        } else {
          alert(result.error || "Có lỗi xảy ra khi hủy đặt sân!");
        }
      } catch (error) {
        console.error("Cancel booking error:", error);
        alert("Có lỗi xảy ra khi hủy đặt sân!");
      }
    };

    const resetFilters = () => {
      filters.value = {
        status: "",
        date_from: "",
        date_to: "",
      };
      loadBookings();
    };

    const canCancel = (bookingData) => {
      const now = new Date();
      const bookingDateTime = new Date(
        `${bookingData.booking_date}T${bookingData.start_time}`
      );
      const hoursUntilBooking = (bookingDateTime - now) / (1000 * 60 * 60);

      return (
        bookingData.status === "pending" ||
        (bookingData.status === "confirmed" && hoursUntilBooking > 2)
      );
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
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

    const getPaymentStatusClass = (status) => {
      const classMap = {
        pending: "bg-orange-100 text-orange-800",
        paid: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        refunded: "bg-gray-100 text-gray-800",
      };
      return classMap[status] || "bg-gray-100 text-gray-800";
    };

    // Initialize
    onMounted(() => {
      loadBookings();
    });

    return {
      bookings,
      loading,
      filters,
      pagination,
      paginationPages,
      loadBookings,
      cancelBooking,
      resetFilters,
      canCancel,
      formatDate,
      formatTime,
      formatCurrency,
      getStatusText,
      getStatusClass,
      getPaymentStatusText,
      getPaymentStatusClass,
    };
  },
};
</script>
