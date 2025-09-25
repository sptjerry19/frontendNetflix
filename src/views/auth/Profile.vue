<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Thông tin cá nhân</h1>
        <p class="mt-2 text-gray-600">
          Quản lý thông tin tài khoản và cài đặt của bạn
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Info -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-6">
                Thông tin tài khoản
              </h2>

              <form @submit.prevent="updateProfile" class="space-y-6">
                <!-- Avatar Upload -->
                <div class="flex items-center space-x-6">
                  <div class="relative">
                    <div
                      class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold text-gray-600 overflow-hidden"
                    >
                      <img
                        v-if="user?.avatar"
                        :src="user.avatar"
                        :alt="user.name"
                        class="w-full h-full object-cover"
                      />
                      <span v-else>{{
                        user?.name?.charAt(0).toUpperCase()
                      }}</span>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleAvatarUpload"
                      class="hidden"
                      id="avatar-upload"
                    />
                    <label
                      for="avatar-upload"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer inline-block"
                    >
                      Thay đổi ảnh
                    </label>
                    <p class="text-xs text-gray-500 mt-1">
                      PNG, JPG tối đa 2MB
                    </p>
                  </div>
                </div>

                <!-- Name -->
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-300': errors.name }"
                  />
                  <p v-if="errors.name" class="text-red-600 text-sm mt-1">
                    {{ errors.name[0] }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-300': errors.email }"
                  />
                  <p v-if="errors.email" class="text-red-600 text-sm mt-1">
                    {{ errors.email[0] }}
                  </p>
                </div>

                <!-- Phone -->
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-300': errors.phone }"
                  />
                  <p v-if="errors.phone" class="text-red-600 text-sm mt-1">
                    {{ errors.phone[0] }}
                  </p>
                </div>

                <!-- Address -->
                <div>
                  <label
                    for="address"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Địa chỉ
                  </label>
                  <textarea
                    id="address"
                    v-model="form.address"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center justify-center"
                  >
                    <span
                      v-if="loading"
                      class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                    ></span>
                    {{ loading ? "Đang cập nhật..." : "Cập nhật thông tin" }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Change Password -->
          <div class="bg-white rounded-lg shadow mt-8">
            <div class="p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-6">
                Đổi mật khẩu
              </h2>

              <form @submit.prevent="changePassword" class="space-y-6">
                <!-- Current Password -->
                <div>
                  <label
                    for="current_password"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mật khẩu hiện tại
                  </label>
                  <input
                    id="current_password"
                    v-model="passwordForm.current_password"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{
                      'border-red-300': passwordErrors.current_password,
                    }"
                  />
                  <p
                    v-if="passwordErrors.current_password"
                    class="text-red-600 text-sm mt-1"
                  >
                    {{ passwordErrors.current_password[0] }}
                  </p>
                </div>

                <!-- New Password -->
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mật khẩu mới
                  </label>
                  <input
                    id="password"
                    v-model="passwordForm.password"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-300': passwordErrors.password }"
                  />
                  <p
                    v-if="passwordErrors.password"
                    class="text-red-600 text-sm mt-1"
                  >
                    {{ passwordErrors.password[0] }}
                  </p>
                </div>

                <!-- Confirm Password -->
                <div>
                  <label
                    for="password_confirmation"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    id="password_confirmation"
                    v-model="passwordForm.password_confirmation"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Submit Button -->
                <div>
                  <button
                    type="submit"
                    :disabled="passwordLoading"
                    class="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    {{ passwordLoading ? "Đang cập nhật..." : "Đổi mật khẩu" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Account Stats -->
          <div class="bg-white rounded-lg shadow p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Thống kê tài khoản
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Tổng số đặt sân:</span>
                <span class="font-semibold text-blue-600">{{
                  stats.total_bookings
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Đặt sân hoàn thành:</span>
                <span class="font-semibold text-green-600">{{
                  stats.completed_bookings
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Thành viên từ:</span>
                <span class="text-gray-900">{{
                  formatDate(user?.created_at)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Hành động nhanh
            </h3>
            <div class="space-y-3">
              <RouterLink
                to="/bookings"
                class="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-center font-medium transition-colors"
              >
                Xem đặt sân của tôi
              </RouterLink>
              <RouterLink
                to="/venues"
                class="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-center font-medium transition-colors"
              >
                Tìm sân mới
              </RouterLink>
              <button
                @click="logout"
                class="block w-full border border-red-300 hover:bg-red-50 text-red-600 px-4 py-2 rounded-md text-center font-medium transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useAuth } from "@/composables/useAuth";
import { useApi } from "@/composables/useApi";

export default {
  name: "Profile",
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = useAuth();
    const api = useApi();

    // Reactive data
    const loading = ref(false);
    const passwordLoading = ref(false);
    const errors = ref({});
    const passwordErrors = ref({});
    const stats = ref({
      total_bookings: 0,
      completed_bookings: 0,
    });

    const form = ref({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    const passwordForm = ref({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

    // Computed
    const user = computed(() => auth.user.value);

    // Methods
    const loadUserData = async () => {
      try {
        const response = await api.getProfile();
        const profileData = response.data.data;

        form.value = {
          name: profileData.user.name || "",
          email: profileData.user.email || "",
          phone: profileData.user.phone || "",
          address: profileData.user.address || "",
        };

        // Update stats
        if (profileData.stats) {
          stats.value = profileData.stats;
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        // Fallback to user data from store
        if (user.value) {
          form.value = {
            name: user.value.name || "",
            email: user.value.email || "",
            phone: user.value.phone || "",
            address: user.value.address || "",
          };
        }
      }
    };

    const handleAvatarUpload = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (!file) return;

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File quá lớn. Vui lòng chọn file nhỏ hơn 2MB.");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Vui lòng chọn file ảnh.");
        return;
      }

      try {
        loading.value = true;
        const response = await api.uploadAvatar(file);

        // Update user avatar in store
        const updatedUser = { ...user.value, avatar: response.data.avatar };
        store.commit("auth/SET_USER", updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Ảnh đại diện đã được cập nhật thành công!");
      } catch (error: any) {
        console.error("Avatar upload error:", error);
        alert("Có lỗi xảy ra khi upload ảnh đại diện!");
      } finally {
        loading.value = false;
      }
    };

    const updateProfile = async () => {
      try {
        loading.value = true;
        errors.value = {};

        const response = await api.updateProfile(form.value);

        // Update user in store
        const updatedUser = { ...user.value, ...form.value };
        store.commit("auth/SET_USER", updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Show success message
        alert("Thông tin đã được cập nhật thành công!");
      } catch (error: any) {
        if (error.response?.data?.errors) {
          errors.value = error.response.data.errors;
        } else {
          alert("Có lỗi xảy ra khi cập nhật thông tin!");
        }
      } finally {
        loading.value = false;
      }
    };

    const changePassword = async () => {
      try {
        passwordLoading.value = true;
        passwordErrors.value = {};

        if (
          passwordForm.value.password !==
          passwordForm.value.password_confirmation
        ) {
          passwordErrors.value = {
            password_confirmation: ["Mật khẩu xác nhận không khớp"]
          };
          return;
        }

        const result = await auth.changePassword(passwordForm.value);

        if (result.success) {
          passwordForm.value = {
            current_password: "",
            password: "",
            password_confirmation: "",
          };
          alert("Mật khẩu đã được thay đổi thành công!");
        } else {
          alert(result.error);
        }
      } catch (error: any) {
        if (error.response?.data?.errors) {
          passwordErrors.value = error.response.data.errors;
        } else {
          alert("Có lỗi xảy ra khi đổi mật khẩu!");
        }
      } finally {
        passwordLoading.value = false;
      }
    };

    const logout = async () => {
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        await auth.logout();
        router.push("/");
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("vi-VN");
    };

    // Initialize
    onMounted(() => {
      loadUserData();
      // Load user stats would go here
      // loadUserStats();
    });

    return {
      user,
      form,
      passwordForm,
      loading,
      passwordLoading,
      errors,
      passwordErrors,
      stats,
      updateProfile,
      changePassword,
      handleAvatarUpload,
      logout,
      formatDate,
    };
  },
};
</script>
