<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Booking Details -->
      <div v-else-if="booking" class="space-y-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 mb-2">
                Chi tiết đặt sân #{{ booking.id }}
              </h1>
              <div class="flex items-center space-x-4">
                <span
                  :class="getStatusClass(booking.status)"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ getStatusText(booking.status) }}
                </span>
                <span
                  :class="getPaymentStatusClass(booking.payment_status)"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ getPaymentStatusText(booking.payment_status) }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Đặt lúc:</p>
              <p class="text-sm font-medium text-gray-900">
                {{ formatDateTime(booking.created_at) }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Details -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Venue & Court Info -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Thông tin sân
              </h2>
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
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900 mb-1">
                    {{ booking.venue?.name }}
                  </h3>
                  <p class="text-sm text-gray-600 mb-1">
                    {{ booking.court?.name }}
                  </p>
                  <p class="text-sm text-gray-500 mb-2">
                    {{ booking.venue?.address }}
                  </p>
                  <div class="flex items-center space-x-4 text-sm">
                    <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {{ booking.court?.sport_type }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Booking Details -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Chi tiết đặt sân
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Ngày đặt:</p>
                  <p class="text-base font-medium text-gray-900">
                    {{ formatDate(booking.booking_date) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Thời gian:</p>
                  <p class="text-base font-medium text-gray-900">
                    {{ formatTime(booking.start_time) }} -
                    {{ formatTime(booking.end_time) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Thời lượng:</p>
                  <p class="text-base font-medium text-gray-900">
                    {{ booking.duration }} giờ
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Tổng tiền:</p>
                  <p class="text-lg font-semibold text-green-600">
                    {{ formatCurrency(booking.total_price) }}
                  </p>
                </div>
              </div>

              <!-- Notes -->
              <div
                v-if="booking.notes"
                class="mt-6 pt-6 border-t border-gray-200"
              >
                <p class="text-sm text-gray-500 mb-2">Ghi chú:</p>
                <p class="text-base text-gray-700 bg-gray-50 p-3 rounded-md">
                  {{ booking.notes }}
                </p>
              </div>
            </div>

            <!-- Customer Info -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Thông tin khách hàng
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Họ tên:</p>
                  <p class="text-base font-medium text-gray-900">
                    {{ booking.user?.name }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Email:</p>
                  <p class="text-base text-gray-900">
                    {{ booking.user?.email }}
                  </p>
                </div>
                <div v-if="booking.user?.phone">
                  <p class="text-sm text-gray-500 mb-1">Điện thoại:</p>
                  <p class="text-base text-gray-900">
                    {{ booking.user?.phone }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Payment Info -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Thông tin thanh toán
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Phương thức:</p>
                  <p class="text-base font-medium text-gray-900">
                    {{ getPaymentMethodText(booking.payment_method) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Trạng thái:</p>
                  <span
                    :class="getPaymentStatusClass(booking.payment_status)"
                    class="px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ getPaymentStatusText(booking.payment_status) }}
                  </span>
                </div>
                <div v-if="booking.payment_id">
                  <p class="text-sm text-gray-500 mb-1">Mã giao dịch:</p>
                  <p class="text-base font-mono text-gray-900">
                    {{ booking.payment_id }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-8">
            <!-- Actions -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Hành động
              </h3>
              <div class="space-y-3">
                <button
                  v-if="canCancel(booking)"
                  @click="cancelBooking"
                  class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Hủy đặt sân
                </button>
                <button
                  v-if="booking.payment_status === 'pending'"
                  @click="payNow"
                  class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Thanh toán ngay
                </button>
                <button
                  @click="printReceipt"
                  class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  In hóa đơn
                </button>
                <RouterLink
                  to="/bookings"
                  class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors block text-center"
                >
                  Quay lại danh sách
                </RouterLink>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Liên hệ hỗ trợ
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-gray-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Hotline: 1900-xxx-xxx</span>
                </div>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-gray-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Email: support@bookingsport.com</span>
                </div>
              </div>
            </div>

            <!-- QR Code -->
            <div class="bg-white rounded-lg shadow p-6 text-center">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Mã QR</h3>
              <div
                class="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center"
              >
                <svg
                  class="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4z"
                  />
                </svg>
              </div>
              <p class="text-xs text-gray-500">
                Quét mã QR để xem thông tin đặt sân
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center py-12">
        <div
          class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4"
        >
          <svg
            class="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy đặt sân
        </h2>
        <p class="text-gray-500 mb-6">
          Đặt sân này không tồn tại hoặc bạn không có quyền truy cập.
        </p>
        <RouterLink
          to="/bookings"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
        >
          Quay lại danh sách
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBooking } from "@/composables/useBooking";

export default {
  name: "BookingDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const bookingComposable = useBooking();

    const booking = ref(null);
    const loading = ref(false);

    // Methods
    const loadBooking = async () => {
      try {
        loading.value = true;
        const bookingId = route.params.id;
        const result = await bookingComposable.getBookingDetails(bookingId);

        if (result.success) {
          booking.value = result.data;
        } else {
          console.error("Booking not found:", result.error);
        }
      } catch (error) {
        console.error("Failed to load booking:", error);
      } finally {
        loading.value = false;
      }
    };

    const cancelBooking = async () => {
      if (!confirm("Bạn có chắc chắn muốn hủy đặt sân này?")) {
        return;
      }

      try {
        const result = await bookingComposable.cancelBooking(booking.value.id);
        if (result.success) {
          booking.value = result.data;
          alert("Đặt sân đã được hủy thành công!");
        } else {
          alert(result.error || "Có lỗi xảy ra khi hủy đặt sân!");
        }
      } catch (error) {
        console.error("Cancel booking error:", error);
        alert("Có lỗi xảy ra khi hủy đặt sân!");
      }
    };

    const payNow = () => {
      router.push(`/bookings/${booking.value.id}/payment`);
    };

    const printReceipt = () => {
      window.print();
    };

    const canCancel = (bookingData) => {
      if (!bookingData) return false;

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

    // Formatting helpers
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

    const formatDateTime = (dateTimeString) => {
      return new Date(dateTimeString).toLocaleString("vi-VN");
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

    const getPaymentMethodText = (method) => {
      const methodMap = {
        cash: "Thanh toán tại sân",
        vnpay: "VNPay",
        momo: "Momo",
        zalopay: "ZaloPay",
        bank_transfer: "Chuyển khoản ngân hàng",
      };
      return methodMap[method] || method;
    };

    // Initialize
    onMounted(() => {
      loadBooking();
    });

    return {
      booking,
      loading,
      cancelBooking,
      payNow,
      printReceipt,
      canCancel,
      formatDate,
      formatTime,
      formatDateTime,
      formatCurrency,
      getStatusText,
      getStatusClass,
      getPaymentStatusText,
      getPaymentStatusClass,
      getPaymentMethodText,
    };
  },
};
</script>

<style>
@media print {
  .bg-gray-50 {
    background-color: white !important;
  }

  button,
  .bg-red-600,
  .bg-green-600,
  .bg-gray-600 {
    display: none !important;
  }
}
</style>
