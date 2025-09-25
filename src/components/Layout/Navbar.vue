<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Navigation -->
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <RouterLink to="/" class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">BookingSport</span>
            </RouterLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink
              to="/"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              :class="
                $route.name === 'Home'
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              "
            >
              Trang chủ
            </RouterLink>
            <RouterLink
              to="/venues"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              :class="
                $route.name?.includes('Venue')
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              "
            >
              Tìm sân
            </RouterLink>
            <RouterLink
              v-if="isAuthenticated"
              to="/bookings"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              :class="
                $route.name?.includes('Booking')
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              "
            >
              Đặt sân của tôi
            </RouterLink>
            <RouterLink
              v-if="isOwner"
              to="/dashboard"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              :class="
                $route.name?.includes('Dashboard') ||
                $route.name?.includes('Manage')
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              "
            >
              Quản lý
            </RouterLink>
          </div>
        </div>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-4">
          <!-- Search Button -->
          <button
            @click="showSearch = !showSearch"
            class="p-2 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <!-- Notifications Bell -->
          <NotificationBell v-if="isAuthenticated" />

          <!-- Auth Section -->
          <div v-if="!isAuthenticated" class="flex items-center space-x-3">
            <RouterLink
              to="/auth/login"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Đăng nhập
            </RouterLink>
            <RouterLink
              to="/auth/register"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Đăng ký
            </RouterLink>
          </div>

          <!-- User Menu -->
          <div v-else class="relative user-menu">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1"
            >
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-medium text-gray-700">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
              <svg
                class="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- User Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-show="showUserMenu"
                @click.stop
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              >
                <div class="py-1">
                  <div class="px-4 py-2 text-xs text-gray-500 border-b">
                    {{ user?.email }}
                  </div>
                  <RouterLink
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="showUserMenu = false"
                  >
                    Thông tin cá nhân
                  </RouterLink>
                  <RouterLink
                    to="/bookings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="showUserMenu = false"
                  >
                    Đặt sân của tôi
                  </RouterLink>
                  <RouterLink
                    v-if="isOwner"
                    to="/dashboard"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="showUserMenu = false"
                  >
                    Dashboard
                  </RouterLink>
                  <div class="border-t">
                    <button
                      @click="handleLogout"
                      class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Mobile menu button -->
          <div class="sm:hidden">
            <button
              @click="showMobileMenu = !showMobileMenu"
              class="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  v-if="!showMobileMenu"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
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

      <!-- Search Bar -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-show="showSearch" class="border-t bg-gray-50 px-4 py-3">
          <div class="max-w-md mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm sân thể thao..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @keyup.enter="performSearch"
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-show="showMobileMenu" class="sm:hidden border-t bg-white">
          <div class="pt-2 pb-3 space-y-1">
            <RouterLink
              to="/"
              class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="
                $route.name === 'Home'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              "
              @click="showMobileMenu = false"
            >
              Trang chủ
            </RouterLink>
            <RouterLink
              to="/venues"
              class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="
                $route.name?.includes('Venue')
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              "
              @click="showMobileMenu = false"
            >
              Tìm sân
            </RouterLink>
            <RouterLink
              v-if="isAuthenticated"
              to="/bookings"
              class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="
                $route.name?.includes('Booking')
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              "
              @click="showMobileMenu = false"
            >
              Đặt sân của tôi
            </RouterLink>
            <RouterLink
              v-if="isOwner"
              to="/dashboard"
              class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              :class="
                $route.name?.includes('Dashboard') ||
                $route.name?.includes('Manage')
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              "
              @click="showMobileMenu = false"
            >
              Quản lý
            </RouterLink>
          </div>

          <!-- Mobile Auth Section -->
          <div
            v-if="!isAuthenticated"
            class="pt-4 pb-3 border-t border-gray-200"
          >
            <div class="space-y-1">
              <RouterLink
                to="/auth/login"
                class="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                @click="showMobileMenu = false"
              >
                Đăng nhập
              </RouterLink>
              <RouterLink
                to="/auth/register"
                class="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-gray-50"
                @click="showMobileMenu = false"
              >
                Đăng ký
              </RouterLink>
            </div>
          </div>

          <!-- Mobile User Section -->
          <div v-else class="pt-4 pb-3 border-t border-gray-200">
            <div class="flex items-center px-4 mb-3">
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3"
              >
                <span class="text-sm font-medium text-gray-700">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <div class="text-base font-medium text-gray-800">
                  {{ user?.name }}
                </div>
                <div class="text-sm text-gray-500">{{ user?.email }}</div>
              </div>
            </div>
            <div class="space-y-1">
              <RouterLink
                to="/profile"
                class="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                @click="showMobileMenu = false"
              >
                Thông tin cá nhân
              </RouterLink>
              <button
                @click="handleLogout"
                class="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import NotificationBell from "@/components/UI/NotificationBell.vue";

export default {
  name: "Navbar",
  components: {
    NotificationBell,
  },
  setup() {
    const router = useRouter();
    const auth = useAuth();

    // Reactive state
    const showMobileMenu = ref(false);
    const showUserMenu = ref(false);
    const showSearch = ref(false);
    const searchQuery = ref("");

    // Computed properties
    const isAuthenticated = computed(() => auth.isAuthenticated.value);
    const user = computed(() => auth.user.value);
    const isOwner = computed(() => auth.isOwner.value);

    // Methods
    const handleLogout = async () => {
      await auth.logout();
      showUserMenu.value = false;
      showMobileMenu.value = false;
      router.push("/");
    };

    const performSearch = () => {
      if (searchQuery.value.trim()) {
        router.push(
          `/venues?search=${encodeURIComponent(searchQuery.value.trim())}`
        );
        showSearch.value = false;
        searchQuery.value = "";
      }
    };

    // Handle click outside to close menus
    const handleClickOutside = (event) => {
      const userMenuElement = event.target.closest(".user-menu");
      const mobileMenuButton = event.target.closest(".mobile-menu-button");

      if (!userMenuElement) {
        showUserMenu.value = false;
      }
      if (!mobileMenuButton) {
        showMobileMenu.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      showMobileMenu,
      showUserMenu,
      showSearch,
      searchQuery,
      isAuthenticated,
      user,
      isOwner,
      handleLogout,
      performSearch,
    };
  },
};
</script>
