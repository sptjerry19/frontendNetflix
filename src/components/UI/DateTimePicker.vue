<template>
  <div class="space-y-4">
    <!-- Date Picker -->
    <div>
      <label :for="dateId" class="block text-sm font-medium text-gray-700 mb-2">
        {{ dateLabel }}
      </label>
      <div class="relative">
        <input
          :id="dateId"
          v-model="internalDate"
          type="date"
          :min="minDate"
          :max="maxDate"
          :disabled="disabled"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          @change="updateDate"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Time Picker -->
    <div v-if="showTimePicker">
      <label :for="timeId" class="block text-sm font-medium text-gray-700 mb-2">
        {{ timeLabel }}
      </label>
      <div class="relative">
        <input
          :id="timeId"
          v-model="internalTime"
          type="time"
          :min="minTime"
          :max="maxTime"
          :step="timeStep"
          :disabled="disabled"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          @change="updateTime"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Combined DateTime Display -->
    <div
      v-if="showTimePicker && internalDate && internalTime"
      class="p-3 bg-blue-50 rounded-md"
    >
      <p class="text-sm text-gray-600">Ngày giờ đã chọn:</p>
      <p class="text-lg font-semibold text-blue-700">
        {{ formatDateTime(internalDate, internalTime) }}
      </p>
    </div>

    <!-- Quick Date Buttons -->
    <div v-if="showQuickButtons" class="flex flex-wrap gap-2">
      <button
        v-for="option in quickDateOptions"
        :key="option.label"
        @click="selectQuickDate(option)"
        class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  name: "DateTimePicker",
  props: {
    modelValue: {
      type: [String, Object],
      default: "",
    },
    dateLabel: {
      type: String,
      default: "Chọn ngày",
    },
    timeLabel: {
      type: String,
      default: "Chọn giờ",
    },
    showTimePicker: {
      type: Boolean,
      default: false,
    },
    showQuickButtons: {
      type: Boolean,
      default: true,
    },
    minDate: {
      type: String,
      default: () => {
        return new Date().toISOString().split("T")[0];
      },
    },
    maxDate: {
      type: String,
      default: () => {
        const date = new Date();
        date.setDate(date.getDate() + 90);
        return date.toISOString().split("T")[0];
      },
    },
    minTime: {
      type: String,
      default: "06:00",
    },
    maxTime: {
      type: String,
      default: "23:00",
    },
    timeStep: {
      type: String,
      default: "3600", // 1 hour in seconds
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "date-change", "time-change"],
  setup(props, { emit }) {
    // Generate unique IDs for form controls
    const dateId = `date-${Math.random().toString(36).substr(2, 9)}`;
    const timeId = `time-${Math.random().toString(36).substr(2, 9)}`;

    // Internal state
    const internalDate = ref("");
    const internalTime = ref("");

    // Quick date options
    const quickDateOptions = computed(() => [
      {
        label: "Hôm nay",
        date: new Date(),
      },
      {
        label: "Ngày mai",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        label: "Cuối tuần",
        date: getNextWeekend(),
      },
    ]);

    // Initialize values
    const initializeValues = () => {
      if (props.modelValue) {
        if (typeof props.modelValue === "string") {
          if (props.showTimePicker) {
            // Assume ISO datetime string
            const date = new Date(props.modelValue);
            internalDate.value = date.toISOString().split("T")[0];
            internalTime.value = date
              .toTimeString()
              .split(" ")[0]
              .substring(0, 5);
          } else {
            // Assume date string
            internalDate.value = props.modelValue;
          }
        } else if (typeof props.modelValue === "object") {
          internalDate.value = props.modelValue.date || "";
          internalTime.value = props.modelValue.time || "";
        }
      }
    };

    // Watchers
    watch(
      () => props.modelValue,
      () => {
        initializeValues();
      },
      { immediate: true }
    );

    // Methods
    const updateDate = () => {
      emit("date-change", internalDate.value);
      emitValue();
    };

    const updateTime = () => {
      emit("time-change", internalTime.value);
      emitValue();
    };

    const emitValue = () => {
      if (props.showTimePicker) {
        if (internalDate.value && internalTime.value) {
          const datetime = new Date(
            `${internalDate.value}T${internalTime.value}`
          );
          emit("update:modelValue", datetime.toISOString());
        } else {
          emit("update:modelValue", {
            date: internalDate.value,
            time: internalTime.value,
          });
        }
      } else {
        emit("update:modelValue", internalDate.value);
      }
    };

    const selectQuickDate = (option) => {
      const date = option.date;
      internalDate.value = date.toISOString().split("T")[0];
      updateDate();
    };

    const formatDateTime = (date, time) => {
      if (!date || !time) return "";

      const dateObj = new Date(`${date}T${time}`);
      return dateObj.toLocaleString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const getNextWeekend = () => {
      const today = new Date();
      const daysUntilSaturday = (6 - today.getDay()) % 7;
      const saturday = new Date(today);
      saturday.setDate(today.getDate() + daysUntilSaturday);
      return saturday;
    };

    return {
      dateId,
      timeId,
      internalDate,
      internalTime,
      quickDateOptions,
      updateDate,
      updateTime,
      selectQuickDate,
      formatDateTime,
    };
  },
};
</script>
