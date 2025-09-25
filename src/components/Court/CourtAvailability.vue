<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold mb-4">Lịch trống - {{ court?.name }}</h3>

    <!-- Date Picker -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Chọn ngày:</label
      >
      <input
        v-model="selectedDate"
        type="date"
        :min="today"
        :max="maxDate"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        @change="loadAvailability"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Time Slots -->
    <div v-else-if="availability?.time_slots" class="space-y-3">
      <h4 class="font-medium text-gray-900 mb-3">Khung giờ có sẵn:</h4>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <button
          v-for="slot in availability.time_slots"
          :key="slot.id"
          @click="selectTimeSlot(slot)"
          :disabled="!slot.is_available || slot.is_booked"
          :class="[
            'p-3 rounded-lg text-sm font-medium border-2 transition-colors',
            getSlotClass(slot),
          ]"
        >
          <div class="text-center">
            <div class="font-semibold">
              {{ formatTime(slot.start_time) }} -
              {{ formatTime(slot.end_time) }}
            </div>
            <div class="text-xs mt-1">{{ formatCurrency(slot.price) }}</div>
          </div>
        </button>
      </div>
    </div>

    <!-- No Data -->
    <div v-else-if="selectedDate" class="text-center py-8 text-gray-500">
      <p>Không có dữ liệu lịch trống cho ngày này</p>
    </div>

    <!-- Selected Slots Summary -->
    <div v-if="selectedSlots.length > 0" class="mt-6 p-4 bg-blue-50 rounded-lg">
      <h4 class="font-medium text-blue-900 mb-2">Khung giờ đã chọn:</h4>
      <div class="space-y-2">
        <div
          v-for="slot in selectedSlots"
          :key="slot.id"
          class="flex items-center justify-between bg-white p-2 rounded border"
        >
          <span class="text-sm">
            {{ formatTime(slot.start_time) }} - {{ formatTime(slot.end_time) }}
          </span>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-green-600">
              {{ formatCurrency(slot.price) }}
            </span>
            <button
              @click="removeTimeSlot(slot)"
              class="text-red-500 hover:text-red-700"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Total -->
        <div
          class="border-t pt-2 flex items-center justify-between font-medium"
        >
          <span>Tổng cộng:</span>
          <span class="text-lg text-green-600">{{
            formatCurrency(totalPrice)
          }}</span>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="mt-6 flex flex-wrap gap-4 text-xs">
      <div class="flex items-center">
        <div
          class="w-3 h-3 bg-green-200 border border-green-400 rounded mr-2"
        ></div>
        <span>Có sẵn</span>
      </div>
      <div class="flex items-center">
        <div
          class="w-3 h-3 bg-blue-200 border border-blue-400 rounded mr-2"
        ></div>
        <span>Đã chọn</span>
      </div>
      <div class="flex items-center">
        <div
          class="w-3 h-3 bg-red-200 border border-red-400 rounded mr-2"
        ></div>
        <span>Đã đặt</span>
      </div>
      <div class="flex items-center">
        <div
          class="w-3 h-3 bg-gray-200 border border-gray-400 rounded mr-2"
        ></div>
        <span>Không có sẵn</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useBooking } from "@/composables/useBooking";

export default {
  name: "CourtAvailability",
  props: {
    court: {
      type: Object,
      required: true,
    },
  },
  emits: ["slots-selected"],
  setup(props, { emit }) {
    const booking = useBooking();

    const selectedDate = ref("");
    const selectedSlots = ref([]);

    // Computed properties
    const today = computed(() => {
      return new Date().toISOString().split("T")[0];
    });

    const maxDate = computed(() => {
      const date = new Date();
      date.setDate(date.getDate() + 30); // Allow booking 30 days in advance
      return date.toISOString().split("T")[0];
    });

    const totalPrice = computed(() => {
      return selectedSlots.value.reduce((total, slot) => total + slot.price, 0);
    });

    const availability = computed(() => booking.courtAvailability.value);
    const loading = computed(() => booking.loading.value);

    // Methods
    const loadAvailability = async () => {
      if (selectedDate.value && props.court) {
        await booking.getCourtAvailability(props.court.id, selectedDate.value);
      }
    };

    const selectTimeSlot = (slot) => {
      if (!slot.is_available || slot.is_booked) return;

      const isSelected = selectedSlots.value.find((s) => s.id === slot.id);
      if (isSelected) {
        removeTimeSlot(slot);
      } else {
        selectedSlots.value.push(slot);
        emit("slots-selected", selectedSlots.value);
      }
    };

    const removeTimeSlot = (slot) => {
      const index = selectedSlots.value.findIndex((s) => s.id === slot.id);
      if (index > -1) {
        selectedSlots.value.splice(index, 1);
        emit("slots-selected", selectedSlots.value);
      }
    };

    const getSlotClass = (slot) => {
      const isSelected = selectedSlots.value.find((s) => s.id === slot.id);

      if (isSelected) {
        return "bg-blue-100 border-blue-400 text-blue-800";
      } else if (!slot.is_available || slot.is_booked) {
        return "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed";
      } else {
        return "bg-green-50 border-green-300 text-green-800 hover:bg-green-100";
      }
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

    // Watchers
    watch(selectedDate, () => {
      selectedSlots.value = [];
      emit("slots-selected", selectedSlots.value);
    });

    // Initialize
    onMounted(() => {
      selectedDate.value = today.value;
      loadAvailability();
    });

    return {
      selectedDate,
      selectedSlots,
      today,
      maxDate,
      totalPrice,
      availability,
      loading,
      loadAvailability,
      selectTimeSlot,
      removeTimeSlot,
      getSlotClass,
      formatTime,
      formatCurrency,
    };
  },
};
</script>
