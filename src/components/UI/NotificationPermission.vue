<template>
  <!-- Permission Request Modal -->
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="showPermissionModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="closeModal"
        ></div>

        <!-- Modal Content -->
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <!-- Icon -->
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100"
          >
            <svg
              class="h-6 w-6 text-blue-600"
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
          </div>

          <!-- Content -->
          <div class="mt-3 text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Nhận thông báo từ BookingSport
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Chúng tôi muốn gửi thông báo cho bạn về các đặt sân mới, xác
                nhận thanh toán và cập nhật quan trọng khác. Bạn có thể tắt
                thông báo bất cứ lúc nào trong cài đặt.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
          >
            <button
              type="button"
              @click="acceptPermission"
              :disabled="isRequesting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="isRequesting"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Cho phép thông báo
            </button>
            <button
              type="button"
              @click="denyPermission"
              :disabled="isRequesting"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Không, cám ơn
            </button>
          </div>

          <!-- Don't ask again option -->
          <div class="mt-4 flex items-center">
            <input
              id="dont-ask-again"
              v-model="dontAskAgain"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              for="dont-ask-again"
              class="ml-2 block text-sm text-gray-700"
            >
              Không hỏi lại
            </label>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Toast Notification Success -->
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="showSuccessToast"
      class="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg"
    >
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        Thông báo đã được bật thành công!
      </div>
    </div>
  </Transition>

  <!-- Toast Notification Error -->
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="showErrorToast"
      class="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg"
    >
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        Không thể bật thông báo. Vui lòng thử lại sau.
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNotifications } from "../../composables/useNotifications";

// Composable
const { requestPermission, isSupported } = useNotifications();

// State
const showPermissionModal = ref(false);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const isRequesting = ref(false);
const dontAskAgain = ref(false);

// Methods
const checkAndShowPermission = () => {
  // Kiểm tra nếu browser hỗ trợ và chưa từng hỏi permission
  if (!isSupported()) return;

  const permission = Notification.permission;
  const hasAskedBefore = localStorage.getItem("notification-permission-asked");
  const dontAsk = localStorage.getItem("notification-dont-ask");

  // Nếu chưa có permission và chưa từng hỏi và không có flag "don't ask"
  if (permission === "default" && !hasAskedBefore && !dontAsk) {
    // Delay một chút để tránh làm phiền người dùng ngay khi vào trang
    setTimeout(() => {
      showPermissionModal.value = true;
    }, 3000);
  }
};

const acceptPermission = async () => {
  console.log("🚀 User clicked Cho phép thông báo");
  isRequesting.value = true;

  try {
    console.log("📞 Calling requestPermission...");
    const success = await requestPermission();
    console.log("📋 RequestPermission result:", success);

    if (success) {
      console.log("🎉 Permission success - showing success toast");
      showSuccessToast.value = true;
      localStorage.setItem("notification-permission-asked", "true");
      setTimeout(() => {
        showSuccessToast.value = false;
      }, 3000);
    } else {
      console.log("❌ Permission failed - showing error toast");
      showErrorToast.value = true;
      setTimeout(() => {
        showErrorToast.value = false;
      }, 3000);
    }
  } catch (error) {
    console.error("💥 Error in acceptPermission:", error);
    console.error("Error stack:", error.stack);
    showErrorToast.value = true;
    setTimeout(() => {
      showErrorToast.value = false;
    }, 3000);
  } finally {
    console.log("🏁 Finishing acceptPermission, stopping loading");
    isRequesting.value = false;
    closeModal();
  }
};

const denyPermission = () => {
  localStorage.setItem("notification-permission-asked", "true");

  if (dontAskAgain.value) {
    localStorage.setItem("notification-dont-ask", "true");
  }

  closeModal();
};

const closeModal = () => {
  showPermissionModal.value = false;
  dontAskAgain.value = false;
};

// Lifecycle
onMounted(() => {
  checkAndShowPermission();
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
