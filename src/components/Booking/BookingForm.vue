<template>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Đặt sân</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Venue & Court Info -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-900 mb-2">{{ venue?.name }}</h3>
        <p class="text-sm text-gray-600 mb-1">{{ court?.name }}</p>
        <p class="text-sm text-gray-500">{{ court?.sport_type }}</p>
      </div>

      <!-- Booking Details -->
      <div v-if="selectedSlots.length > 0" class="space-y-4">
        <h4 class="font-medium text-gray-900">Chi tiết đặt sân:</h4>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Ngày:</label
          >
          <p class="text-lg font-semibold text-blue-600">
            {{ formatDate(bookingDate) }}
          </p>
        </div>

        <!-- Time Slots -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Khung giờ:</label
          >
          <div class="space-y-2">
            <div
              v-for="slot in selectedSlots"
              :key="slot.id"
              class="flex items-center justify-between bg-white border p-3 rounded"
            >
              <span
                >{{ formatTime(slot.start_time) }} -
                {{ formatTime(slot.end_time) }}</span
              >
              <span class="font-medium text-green-600">{{
                formatCurrency(slot.price)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Total Duration & Price -->
        <div class="border-t pt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-700">Thời gian:</span>
            <span class="font-medium">{{ totalDuration }} giờ</span>
          </div>
          <div class="flex items-center justify-between text-lg font-semibold">
            <span class="text-gray-900">Tổng cộng:</span>
            <span class="text-green-600">{{ formatCurrency(totalPrice) }}</span>
          </div>
        </div>
      </div>

      <!-- Customer Notes -->
      <div>
        <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
          Ghi chú (tùy chọn):
        </label>
        <textarea
          id="notes"
          v-model="form.notes"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ghi chú thêm về yêu cầu đặt sân..."
        ></textarea>
      </div>

      <!-- Payment Method -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3"
          >Phương thức thanh toán:</label
        >
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              v-model="form.payment_method"
              type="radio"
              value="cash"
              class="mr-3 text-blue-600"
            />
            <span>Thanh toán tại sân</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="form.payment_method"
              type="radio"
              value="vnpay"
              class="mr-3 text-blue-600"
            />
            <span>VNPay</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="form.payment_method"
              type="radio"
              value="momo"
              class="mr-3 text-blue-600"
            />
            <span>Momo</span>
          </label>
        </div>
      </div>

      <!-- Terms -->
      <div class="flex items-start">
        <input
          id="terms"
          v-model="form.agreed_to_terms"
          type="checkbox"
          class="mt-1 mr-3 text-blue-600"
          required
        />
        <label for="terms" class="text-sm text-gray-600">
          Tôi đồng ý với
          <a href="#" class="text-blue-600 underline">điều khoản sử dụng</a> và
          <a href="#" class="text-blue-600 underline">chính sách hủy</a>
        </label>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
        <p class="text-red-600 text-sm">{{ error }}</p>
      </div>

      <!-- Submit Buttons -->
      <div class="flex space-x-4 pt-6">
        <button
          type="button"
          @click="goBack"
          class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Quay lại
        </button>
        <button
          type="submit"
          :disabled="
            loading ||
            selectedSlots.length === 0 ||
            !form.payment_method ||
            !form.agreed_to_terms
          "
          class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <span
            v-if="loading"
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
          ></span>
          {{ loading ? "Đang xử lý..." : "Xác nhận đặt sân" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useBooking } from "@/composables/useBooking";
import { useRouter } from "vue-router";

export default {
  name: "BookingForm",
  props: {
    venue: {
      type: Object,
      required: true,
    },
    court: {
      type: Object,
      required: true,
    },
    selectedSlots: {
      type: Array,
      default: () => [],
    },
    bookingDate: {
      type: String,
      required: true,
    },
  },
  emits: ["booking-created"],
  setup(props, { emit }) {
    const auth = useAuth();
    const booking = useBooking();
    const router = useRouter();

    const form = ref({
      notes: "",
      payment_method: "cash",
      agreed_to_terms: false,
    });

    const error = ref("");
    const loading = ref(false);

    // Computed properties
    const totalPrice = computed(() => {
      return props.selectedSlots.reduce((total, slot) => total + slot.price, 0);
    });

    const totalDuration = computed(() => {
      return props.selectedSlots.length;
    });

    // Methods
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
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

    const handleSubmit = async () => {
      try {
        error.value = "";
        loading.value = true;

        // Check authentication
        if (!auth.isAuthenticated.value) {
          router.push("/auth/login");
          return;
        }

        // Prepare booking data
        const bookingData = {
          venue_id: props.venue.id,
          court_id: props.court.id,
          booking_date: props.bookingDate,
          start_time: props.selectedSlots[0].start_time,
          end_time:
            props.selectedSlots[props.selectedSlots.length - 1].end_time,
          notes: form.value.notes,
          payment_method: form.value.payment_method,
        };

        const result = await booking.createBooking(bookingData);

        if (result.success) {
          emit("booking-created", result.data);

          // Redirect based on payment method
          if (form.value.payment_method === "cash") {
            router.push(`/bookings/${result.data.id}`);
          } else {
            // Redirect to payment gateway
            router.push(`/bookings/${result.data.id}/payment`);
          }
        } else {
          error.value = result.error;
        }
      } catch (err) {
        console.error("Booking error:", err);
        error.value = "Có lỗi xảy ra khi tạo đặt sân. Vui lòng thử lại.";
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      form,
      error,
      loading,
      totalPrice,
      totalDuration,
      formatDate,
      formatTime,
      formatCurrency,
      handleSubmit,
      goBack,
    };
  },
};
</script>
