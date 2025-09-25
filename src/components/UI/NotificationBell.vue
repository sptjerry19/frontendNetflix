<template>
  <div class="relative">
    <!-- Bell Icon Button -->
    <button
      @click="toggleDropdown"
      class="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 transition-colors duration-200"
      :class="{ 'text-blue-600': hasUnreadNotifications }"
    >
      <!-- Bell Icon -->
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      <!-- Notification Badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
      >
        {{ unreadCount > 99 ? "99+" : unreadCount }}
      </span>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      >
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Thông báo</h3>
            <div class="flex space-x-2">
              <button
                v-if="unreadCount > 0"
                @click="markAllAsRead"
                class="text-sm text-blue-600 hover:text-blue-800"
              >
                Đánh dấu tất cả đã đọc
              </button>
              <button
                v-if="notifications.length > 0"
                @click="clearAll"
                class="text-sm text-red-600 hover:text-red-800"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="max-h-96 overflow-y-auto">
          <div
            v-if="notifications.length === 0"
            class="px-4 py-6 text-center text-gray-500"
          >
            Không có thông báo nào
          </div>

          <div v-else>
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              :class="{ 'bg-blue-50': !notification.read }"
              @click="handleNotificationClick(notification)"
            >
              <div class="flex items-start space-x-3">
                <!-- Icon or Avatar -->
                <div class="flex-shrink-0">
                  <img
                    v-if="notification.icon"
                    :src="notification.icon"
                    :alt="notification.title"
                    class="w-8 h-8 rounded-full"
                  />
                  <div
                    v-else
                    class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2L13 14H7L10 2Z" />
                    </svg>
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900"
                    :class="{ 'font-bold': !notification.read }"
                  >
                    {{ notification.title }}
                  </p>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ notification.body }}
                  </p>
                  <p class="text-xs text-gray-500 mt-2">
                    {{ formatTime(notification.timestamp) }}
                  </p>
                </div>

                <!-- Unread indicator -->
                <div v-if="!notification.read" class="flex-shrink-0">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>

                <!-- Delete button -->
                <button
                  @click.stop="removeNotification(notification.id)"
                  class="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          v-if="notifications.length > 5"
          class="px-4 py-3 border-t border-gray-200"
        >
          <button
            class="text-sm text-blue-600 hover:text-blue-800 w-full text-center"
          >
            Xem tất cả thông báo
          </button>
        </div>
      </div>
    </transition>

    <!-- Overlay to close dropdown -->
    <div
      v-if="showDropdown"
      class="fixed inset-0 z-40"
      @click="showDropdown = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useNotifications } from "../../composables/useNotifications";
import moment from "moment";

// Composable
const {
  notifications,
  unreadCount,
  markAsRead,
  removeNotification,
  clearAllNotifications,
  requestPermission,
  initialize,
  setupForegroundMessaging,
} = useNotifications();

// Local state
const showDropdown = ref(false);

// Computed
const hasUnreadNotifications = computed(() => unreadCount.value > 0);

// Methods
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleNotificationClick = (notification) => {
  markAsRead(notification.id);

  // Có thể điều hướng đến trang cụ thể dựa trên notification data
  if (notification.data?.url) {
    window.location.href = notification.data.url;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  });
};

const clearAll = () => {
  clearAllNotifications();
  showDropdown.value = false;
};

const formatTime = (timestamp) => {
  return moment(timestamp).fromNow();
};

// Lifecycle
onMounted(async () => {
  // Khởi tạo notifications
  await initialize();

  // Setup foreground messaging
  setupForegroundMessaging();
});

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Custom scrollbar for notifications */
.max-h-96::-webkit-scrollbar {
  width: 6px;
}

.max-h-96::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
