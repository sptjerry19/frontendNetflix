<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Đăng ký tài khoản</h2>
        <p class="mt-2 text-gray-600">
          Hoặc
          <RouterLink to="/auth/login" class="text-blue-600 hover:text-blue-500"
            >đăng nhập</RouterLink
          >
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                autocomplete="name"
                required
                :disabled="loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm"
                :class="{ 'border-red-300': errors.name }"
                placeholder="Nhập họ và tên"
              />
              <p v-if="errors.name" class="text-red-600 text-sm mt-1">
                {{ errors.name[0] }}
              </p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                :disabled="loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm"
                :class="{ 'border-red-300': errors.email }"
                placeholder="Nhập email của bạn"
              />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">
                {{ errors.email[0] }}
              </p>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                :disabled="loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm"
                :class="{ 'border-red-300': errors.phone }"
                placeholder="Nhập số điện thoại"
              />
              <p v-if="errors.phone" class="text-red-600 text-sm mt-1">
                {{ errors.phone[0] }}
              </p>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :disabled="loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm pr-10"
                :class="{ 'border-red-300': errors.password }"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">
              {{ errors.password[0] }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label
              for="password_confirmation"
              class="block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <div class="mt-1 relative">
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                name="password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :disabled="loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm pr-10"
                :class="{ 'border-red-300': errors.password_confirmation }"
                placeholder="Nhập lại mật khẩu"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="showConfirmPassword"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                  />
                </svg>
              </button>
            </div>
            <p
              v-if="errors.password_confirmation"
              class="text-red-600 text-sm mt-1"
            >
              {{ errors.password_confirmation[0] }}
            </p>
          </div>

          <!-- Level -->
          <div>
            <label for="level" class="block text-sm font-medium text-gray-700">
              Trình độ chơi
            </label>
            <div class="mt-1">
              <select
                id="level"
                v-model="form.level"
                name="level"
                :disabled="loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm"
                :class="{ 'border-red-300': errors.level }"
              >
                <option value="">Chọn trình độ</option>
                <option value="beginner">Mới bắt đầu</option>
                <option value="intermediate">Trung bình</option>
                <option value="advanced">Nâng cao</option>
              </select>
              <p v-if="errors.level" class="text-red-600 text-sm mt-1">
                {{ errors.level[0] }}
              </p>
            </div>
          </div>

          <!-- Preferred Sports -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Môn thể thao yêu thích
            </label>
            <div class="space-y-2">
              <div
                v-for="sport in availableSports"
                :key="sport.id"
                class="flex items-center"
              >
                <input
                  :id="`sport-${sport.id}`"
                  v-model="form.preferred_sports"
                  :value="sport.id"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  :for="`sport-${sport.id}`"
                  class="ml-2 block text-sm text-gray-900"
                >
                  {{ sport.name }}
                </label>
              </div>
            </div>
            <p v-if="errors.preferred_sports" class="text-red-600 text-sm mt-1">
              {{ errors.preferred_sports[0] }}
            </p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.accept_terms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              Tôi đồng ý với
              <a href="#" class="text-blue-600 hover:text-blue-500"
                >điều khoản sử dụng</a
              >
              và
              <a href="#" class="text-blue-600 hover:text-blue-500"
                >chính sách bảo mật</a
              >
            </label>
          </div>

          <!-- Error message -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 rounded-md p-4"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Submit button -->
          <div>
            <button
              type="submit"
              :disabled="loading || !form.accept_terms"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              <span
                v-if="loading"
                class="absolute left-0 inset-y-0 flex items-center pl-3"
              >
                <div
                  class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                ></div>
              </span>
              {{ loading ? "Đang đăng ký..." : "Đăng ký tài khoản" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useApi } from "@/composables/useApi";

export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const auth = useAuth();
    const api = useApi();

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const loading = ref(false);
    const errorMessage = ref("");
    const errors = ref({});
    const availableSports = ref([]);

    const form = reactive({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      level: "",
      preferred_sports: [],
      accept_terms: false,
    });

    const loadSports = async () => {
      try {
        const response = await api.getSports();
        availableSports.value = response.data.data || [];
      } catch (error) {
        console.error("Error loading sports:", error);
      }
    };

    const handleRegister = async () => {
      try {
        errorMessage.value = "";
        errors.value = {};
        loading.value = true;

        // Validate password confirmation
        if (form.password !== form.password_confirmation) {
          errors.value = {
            password_confirmation: ["Mật khẩu xác nhận không khớp"],
          };
          return;
        }

        const result = await auth.register({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          password_confirmation: form.password_confirmation,
          level: form.level,
          preferred_sports: form.preferred_sports,
        });

        if (result.success) {
          // Redirect to dashboard or intended page
          const redirectTo = router.currentRoute.value.query.redirect || "/";
          router.push(redirectTo);
        } else {
          errorMessage.value = result.error;
        }
      } catch (error) {
        console.error("Register error:", error);
        if (error.response?.data?.errors) {
          errors.value = error.response.data.errors;
        } else {
          errorMessage.value = "Có lỗi xảy ra trong quá trình đăng ký";
        }
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadSports();
    });

    return {
      form,
      showPassword,
      showConfirmPassword,
      loading,
      errorMessage,
      errors,
      availableSports,
      handleRegister,
    };
  },
};
</script>
