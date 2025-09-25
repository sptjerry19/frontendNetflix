<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <!-- 404 Animation -->
        <div
          class="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-blue-100 mb-6"
        >
          <svg
            class="h-16 w-16 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.881-6.127 2.327.559-.058 1.148-.107 1.765-.14A18.645 18.645 0 0112 17z"
            />
          </svg>
        </div>

        <!-- Error Code -->
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>

        <!-- Error Message -->
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">
          Trang không tồn tại
        </h2>
        <p class="text-gray-500 mb-8 max-w-md mx-auto">
          Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa hoặc không bao
          giờ tồn tại.
        </p>

        <!-- Action Buttons -->
        <div
          class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <button
            @click="goBack"
            class="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            ← Quay lại
          </button>
          <RouterLink
            to="/"
            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block text-center"
          >
            🏠 Về trang chủ
          </RouterLink>
          <RouterLink
            to="/venues"
            class="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors inline-block text-center"
          >
            🏟️ Tìm sân
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Popular Links -->
    <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div class="text-center">
        <h3 class="text-lg font-medium text-gray-900 mb-6">
          Có thể bạn đang tìm:
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RouterLink
            to="/venues?sport_type=football"
            class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <div class="text-2xl mb-2">⚽</div>
            <div class="text-sm font-medium text-gray-900">Sân bóng đá</div>
          </RouterLink>
          <RouterLink
            to="/venues?sport_type=badminton"
            class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <div class="text-2xl mb-2">🏸</div>
            <div class="text-sm font-medium text-gray-900">Sân cầu lông</div>
          </RouterLink>
          <RouterLink
            to="/venues?sport_type=tennis"
            class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <div class="text-2xl mb-2">🎾</div>
            <div class="text-sm font-medium text-gray-900">Sân tennis</div>
          </RouterLink>
          <RouterLink
            to="/venues?sport_type=basketball"
            class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <div class="text-2xl mb-2">🏀</div>
            <div class="text-sm font-medium text-gray-900">Sân bóng rổ</div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "NotFound",
  setup() {
    const router = useRouter();

    const goBack = () => {
      if (window.history.length > 1) {
        router.go(-1);
      } else {
        router.push("/");
      }
    };

    return {
      goBack,
    };
  },
};
</script>
