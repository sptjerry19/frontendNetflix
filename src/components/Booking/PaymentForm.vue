<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-6">Thanh toán</h3>

    <!-- Booking Summary -->
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h4 class="font-medium text-gray-900 mb-2">Chi tiết đặt sân</h4>
      <div class="space-y-1 text-sm text-gray-600">
        <div class="flex justify-between">
          <span>Sân:</span>
          <span>{{ booking?.court?.name }}</span>
        </div>
        <div class="flex justify-between">
          <span>Ngày:</span>
          <span>{{ formatDate(booking?.booking_date) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Giờ:</span>
          <span
            >{{ formatTime(booking?.start_time) }} -
            {{ formatTime(booking?.end_time) }}</span
          >
        </div>
        <div
          class="flex justify-between font-semibold text-gray-900 pt-2 border-t"
        >
          <span>Tổng cộng:</span>
          <span>{{ formatCurrency(booking?.total_price) }}</span>
        </div>
      </div>
    </div>

    <!-- Payment Method Selection -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-3"
        >Phương thức thanh toán</label
      >
      <div class="space-y-3">
        <!-- VNPay -->
        <label
          class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            v-model="selectedMethod"
            type="radio"
            value="vnpay"
            class="mr-3 text-blue-600"
          />
          <img src="/images/vnpay-logo.png" alt="VNPay" class="w-8 h-8 mr-3" />
          <div>
            <div class="font-medium">VNPay</div>
            <div class="text-xs text-gray-500">Thanh toán qua VNPay</div>
          </div>
        </label>

        <!-- Momo -->
        <label
          class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            v-model="selectedMethod"
            type="radio"
            value="momo"
            class="mr-3 text-blue-600"
          />
          <img src="/images/momo-logo.png" alt="Momo" class="w-8 h-8 mr-3" />
          <div>
            <div class="font-medium">Momo</div>
            <div class="text-xs text-gray-500">Thanh toán qua ví Momo</div>
          </div>
        </label>

        <!-- ZaloPay -->
        <label
          class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            v-model="selectedMethod"
            type="radio"
            value="zalopay"
            class="mr-3 text-blue-600"
          />
          <img
            src="/images/zalopay-logo.png"
            alt="ZaloPay"
            class="w-8 h-8 mr-3"
          />
          <div>
            <div class="font-medium">ZaloPay</div>
            <div class="text-xs text-gray-500">Thanh toán qua ZaloPay</div>
          </div>
        </label>

        <!-- Bank Transfer -->
        <label
          class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input
            v-model="selectedMethod"
            type="radio"
            value="bank_transfer"
            class="mr-3 text-blue-600"
          />
          <svg
            class="w-8 h-8 mr-3 text-blue-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9Z"
            />
          </svg>
          <div>
            <div class="font-medium">Chuyển khoản ngân hàng</div>
            <div class="text-xs text-gray-500">Chuyển khoản trực tiếp</div>
          </div>
        </label>
      </div>
    </div>

    <!-- Bank Transfer Details -->
    <div
      v-if="selectedMethod === 'bank_transfer'"
      class="mb-6 p-4 bg-blue-50 rounded-lg"
    >
      <h5 class="font-medium text-blue-900 mb-2">Thông tin chuyển khoản</h5>
      <div class="text-sm space-y-1">
        <div><strong>Ngân hàng:</strong> Vietcombank</div>
        <div><strong>Số tài khoản:</strong> 0123456789</div>
        <div><strong>Chủ tài khoản:</strong> BOOKING SPORT</div>
        <div><strong>Nội dung:</strong> BOOKING{{ booking?.id }}</div>
      </div>
    </div>

    <!-- Terms -->
    <div class="mb-6">
      <label class="flex items-start">
        <input
          v-model="agreeToTerms"
          type="checkbox"
          class="mt-1 mr-3 text-blue-600"
        />
        <span class="text-sm text-gray-600">
          Tôi đồng ý với
          <a href="#" class="text-blue-600 underline">điều khoản thanh toán</a>
          và xác nhận thông tin đặt sân là chính xác
        </span>
      </label>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"
    >
      <p class="text-red-600 text-sm">{{ error }}</p>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3">
      <button
        @click="processPayment"
        :disabled="!selectedMethod || !agreeToTerms || loading"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
      >
        <span
          v-if="loading"
          class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
        ></span>
        {{ loading ? "Đang xử lý..." : "Thanh toán ngay" }}
      </button>

      <button
        @click="goBack"
        class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
      >
        Quay lại
      </button>
    </div>

    <!-- Security Notice -->
    <div class="mt-6 p-3 bg-green-50 rounded-lg">
      <div class="flex items-center">
        <svg
          class="w-5 h-5 text-green-600 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"
          />
        </svg>
        <span class="text-sm text-green-800"
          >Giao dịch được bảo mật với mã hóa SSL</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useApi } from "@/composables/useApi";
import { useRouter } from "vue-router";

export default {
  name: "PaymentForm",
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  emits: ["payment-success", "payment-error"],
  setup(props, { emit }) {
    const api = useApi();
    const router = useRouter();

    const selectedMethod = ref("");
    const agreeToTerms = ref(false);
    const loading = ref(false);
    const error = ref("");

    const processPayment = async () => {
      try {
        error.value = "";
        loading.value = true;

        const paymentData = {
          payment_method: selectedMethod.value,
          amount: props.booking.total_price,
          return_url: `${window.location.origin}/bookings/${props.booking.id}/payment-result`,
        };

        const response = await api.processPayment(
          props.booking.id,
          paymentData
        );

        if (response.data.payment_url) {
          // Redirect to payment gateway
          window.location.href = response.data.payment_url;
        } else if (selectedMethod.value === "bank_transfer") {
          // Show success message for bank transfer
          emit("payment-success", {
            booking_id: props.booking.id,
            payment_method: selectedMethod.value,
            message:
              "Vui lòng thực hiện chuyển khoản theo thông tin đã cung cấp",
          });
          router.push(`/bookings/${props.booking.id}/payment-pending`);
        }
      } catch (err) {
        console.error("Payment error:", err);
        error.value =
          err.response?.data?.message ||
          "Có lỗi xảy ra trong quá trình thanh toán";
        emit("payment-error", error.value);
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("vi-VN");
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

    return {
      selectedMethod,
      agreeToTerms,
      loading,
      error,
      processPayment,
      goBack,
      formatDate,
      formatTime,
      formatCurrency,
    };
  },
};
</script>
