<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4">
          <RouterLink
            to="/dashboard/venues"
            class="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              class="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại
          </RouterLink>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mt-4">Thêm sân mới</h1>
        <p class="mt-2 text-gray-600">
          Tạo sân thể thao mới để bắt đầu nhận đặt sân
        </p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-8">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">
            Thông tin cơ bản
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Tên sân *
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

            <div class="md:col-span-2">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Mô tả *
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-300': errors.description }"
              ></textarea>
              <p v-if="errors.description" class="text-red-600 text-sm mt-1">
                {{ errors.description[0] }}
              </p>
            </div>

            <div class="md:col-span-2">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Địa chỉ *
              </label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-300': errors.address }"
              />
              <p v-if="errors.address" class="text-red-600 text-sm mt-1">
                {{ errors.address[0] }}
              </p>
            </div>

            <div>
              <label
                for="latitude"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Vĩ độ (Latitude)
              </label>
              <input
                id="latitude"
                v-model="form.latitude"
                type="number"
                step="any"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="longitude"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Kinh độ (Longitude)
              </label>
              <input
                id="longitude"
                v-model="form.longitude"
                type="number"
                step="any"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Images -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Hình ảnh sân</h2>

          <div class="space-y-4">
            <div
              class="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Tải lên hình ảnh</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      multiple
                      accept="image/*"
                      @change="handleImageUpload"
                    />
                  </label>
                  <p class="pl-1">hoặc kéo thả</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
              </div>
            </div>

            <!-- Preview Images -->
            <div
              v-if="form.images.length > 0"
              class="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div
                v-for="(image, index) in form.images"
                :key="index"
                class="relative"
              >
                <img
                  :src="image.preview"
                  :alt="`Image ${index + 1}`"
                  class="w-full h-24 object-cover rounded-lg"
                />
                <button
                  @click="removeImage(index)"
                  type="button"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Amenities -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Tiện nghi</h2>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <label
              v-for="amenity in availableAmenities"
              :key="amenity.value"
              class="flex items-center"
            >
              <input
                v-model="form.amenities"
                :value="amenity.value"
                type="checkbox"
                class="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="text-sm text-gray-700">{{ amenity.label }}</span>
            </label>
          </div>
        </div>

        <!-- Courts -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-900">
              Danh sách sân con
            </h2>
            <button
              @click="addCourt"
              type="button"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              + Thêm sân
            </button>
          </div>

          <div class="space-y-6">
            <div
              v-for="(court, index) in form.courts"
              :key="index"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-md font-medium text-gray-900">
                  Sân {{ index + 1 }}
                </h3>
                <button
                  @click="removeCourt(index)"
                  type="button"
                  class="text-red-600 hover:text-red-700 text-sm"
                >
                  Xóa sân
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    :for="`court_name_${index}`"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tên sân *
                  </label>
                  <input
                    :id="`court_name_${index}`"
                    v-model="court.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    :for="`sport_type_${index}`"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Loại thể thao *
                  </label>
                  <select
                    :id="`sport_type_${index}`"
                    v-model="court.sport_id"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn loại thể thao</option>
                    <option
                      v-for="sport in availableSports"
                      :key="sport.id"
                      :value="sport.id"
                    >
                      {{ sport.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    :for="`price_per_hour_${index}`"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Giá thuê/giờ (VND) *
                  </label>
                  <input
                    :id="`price_per_hour_${index}`"
                    v-model="court.price_per_hour"
                    type="number"
                    min="0"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div class="flex items-center">
                  <input
                    :id="`is_active_${index}`"
                    v-model="court.is_active"
                    type="checkbox"
                    class="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    :for="`is_active_${index}`"
                    class="text-sm text-gray-700"
                  >
                    Hoạt động
                  </label>
                </div>

                <div class="md:col-span-2">
                  <label
                    :for="`court_description_${index}`"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mô tả
                  </label>
                  <textarea
                    :id="`court_description_${index}`"
                    v-model="court.description"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Add court message if no courts -->
            <div
              v-if="form.courts.length === 0"
              class="text-center py-8 border-2 border-gray-300 border-dashed rounded-lg"
            >
              <p class="text-gray-500 mb-4">Chưa có sân nào được thêm</p>
              <button
                @click="addCourt"
                type="button"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Thêm sân đầu tiên
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="formError"
          class="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <p class="text-red-600 text-sm">{{ formError }}</p>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4 pt-6">
          <RouterLink
            to="/dashboard/venues"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
          >
            Hủy
          </RouterLink>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors flex items-center"
          >
            <span
              v-if="loading"
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></span>
            {{ loading ? "Đang tạo..." : "Tạo sân" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/composables/useApi";

export default {
  name: "CreateVenue",
  setup() {
    const router = useRouter();
    const api = useApi();

    const loading = ref(false);
    const errors = ref({});
    const formError = ref("");
    const availableSports = ref([]);

    const form = ref({
      name: "",
      description: "",
      address: "",
      latitude: null,
      longitude: null,
      amenities: [],
      images: [],
      courts: [],
    });

    const availableAmenities = [
      { value: "parking", label: "Bãi đỗ xe" },
      { value: "wifi", label: "WiFi miễn phí" },
      { value: "shower", label: "Phòng tắm" },
      { value: "locker", label: "Tủ khóa" },
      { value: "canteen", label: "Căng tin" },
      { value: "equipment_rental", label: "Cho thuê dụng cụ" },
      { value: "air_conditioning", label: "Điều hòa" },
      { value: "changing_room", label: "Phòng thay đồ" },
    ];

    // Methods
    const addCourt = () => {
      form.value.courts.push({
        name: "",
        sport_id: "",
        description: "",
        price_per_hour: 0,
        is_active: true,
      });
    };

    const removeCourt = (index) => {
      form.value.courts.splice(index, 1);
    };

    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        if (file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            form.value.images.push({
              file,
              preview: e.target.result,
            });
          };
          reader.readAsDataURL(file);
        }
      });
    };

    const removeImage = (index) => {
      form.value.images.splice(index, 1);
    };

    const loadSports = async () => {
      try {
        const response = await api.getSportsActive();
        availableSports.value = response.data.data || [];
      } catch (error) {
        console.error("Failed to load sports:", error);
      }
    };

    const submitForm = async () => {
      try {
        loading.value = true;
        errors.value = {};
        formError.value = "";

        // Validate form
        if (!form.value.name.trim()) {
          errors.value.name = ["Tên sân là bắt buộc"];
          return;
        }

        if (!form.value.description.trim()) {
          errors.value.description = ["Mô tả là bắt buộc"];
          return;
        }

        if (!form.value.address.trim()) {
          errors.value.address = ["Địa chỉ là bắt buộc"];
          return;
        }

        if (form.value.courts.length === 0) {
          formError.value = "Vui lòng thêm ít nhất một sân";
          return;
        }

        // Validate courts
        for (let i = 0; i < form.value.courts.length; i++) {
          const court = form.value.courts[i];
          if (
            !court.name.trim() ||
            !court.sport_type ||
            !court.price_per_hour
          ) {
            formError.value = `Vui lòng điền đầy đủ thông tin cho sân ${i + 1}`;
            return;
          }
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("name", form.value.name);
        formData.append("description", form.value.description);
        formData.append("address", form.value.address);

        if (form.value.latitude)
          formData.append("latitude", form.value.latitude);
        if (form.value.longitude)
          formData.append("longitude", form.value.longitude);

        form.value.amenities.forEach((amenity) => {
          formData.append("amenities[]", amenity);
        });

        form.value.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image.file);
        });

        form.value.courts.forEach((court, index) => {
          formData.append(`courts[${index}][name]`, court.name);
          formData.append(`courts[${index}][sport_type]`, court.sport_type);
          formData.append(
            `courts[${index}][description]`,
            court.description || ""
          );
          formData.append(
            `courts[${index}][price_per_hour]`,
            court.price_per_hour
          );
          formData.append(`courts[${index}][is_active]`, court.is_active);
        });

        // Submit to API
        // const response = await api.createVenue(formData);

        // Mock success
        await new Promise((resolve) => setTimeout(resolve, 2000));

        alert("Tạo sân thành công!");
        router.push("/dashboard/venues");
      } catch (error) {
        console.error("Create venue error:", error);

        if (error.response?.data?.errors) {
          errors.value = error.response.data.errors;
        } else {
          formError.value =
            error.response?.data?.message || "Có lỗi xảy ra khi tạo sân";
        }
      } finally {
        loading.value = false;
      }
    };

    // Add first court by default
    addCourt();

    // Initialize
    onMounted(() => {
      loadSports();
    });

    return {
      form,
      loading,
      errors,
      formError,
      availableSports,
      availableAmenities,
      addCourt,
      removeCourt,
      handleImageUpload,
      removeImage,
      loadSports,
      submitForm,
    };
  },
};
</script>
