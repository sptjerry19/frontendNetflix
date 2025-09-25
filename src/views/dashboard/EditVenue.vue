<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading -->
      <div v-if="initialLoading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Form -->
      <div v-else-if="venue">
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
          <h1 class="text-3xl font-bold text-gray-900 mt-4">
            Chỉnh sửa sân: {{ venue.name }}
          </h1>
          <p class="mt-2 text-gray-600">
            Cập nhật thông tin sân thể thao của bạn
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

              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Trạng thái
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Current Images -->
          <div
            v-if="venue.images && venue.images.length > 0"
            class="bg-white rounded-lg shadow p-6"
          >
            <h2 class="text-lg font-semibold text-gray-900 mb-6">
              Hình ảnh hiện tại
            </h2>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div
                v-for="(image, index) in venue.images"
                :key="image.id"
                class="relative"
              >
                <img
                  :src="getImageUrl(image.url)"
                  :alt="`Current image ${index + 1}`"
                  class="w-full h-24 object-cover rounded-lg"
                />
                <button
                  @click="removeCurrentImage(image.id, index)"
                  type="button"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- New Images -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">
              Thêm hình ảnh mới
            </h2>

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
                      class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
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

              <!-- Preview New Images -->
              <div
                v-if="form.new_images.length > 0"
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  v-for="(image, index) in form.new_images"
                  :key="index"
                  class="relative"
                >
                  <img
                    :src="image.preview"
                    :alt="`New image ${index + 1}`"
                    class="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    @click="removeNewImage(index)"
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
                :key="court.id || `new-${index}`"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-md font-medium text-gray-900">
                    {{
                      court.id ? `Sân: ${court.name}` : `Sân mới ${index + 1}`
                    }}
                  </h3>
                  <button
                    @click="removeCourt(index)"
                    type="button"
                    class="text-red-600 hover:text-red-700 text-sm"
                  >
                    {{ court.id ? "Xóa sân" : "Bỏ sân" }}
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
                <p class="text-gray-500 mb-4">Chưa có sân nào</p>
                <button
                  @click="addCourt"
                  type="button"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Thêm sân
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
              {{ loading ? "Đang cập nhật..." : "Cập nhật sân" }}
            </button>
          </div>
        </form>
      </div>

      <!-- Not Found -->
      <div v-else class="text-center py-12">
        <div
          class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4"
        >
          <svg
            class="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy sân
        </h2>
        <p class="text-gray-500 mb-6">
          Sân này không tồn tại hoặc bạn không có quyền chỉnh sửa.
        </p>
        <RouterLink
          to="/dashboard/venues"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
        >
          Quay lại danh sách
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useApi } from "@/composables/useApi";

export default {
  name: "EditVenue",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const api = useApi();

    const initialLoading = ref(false);
    const loading = ref(false);
    const venue = ref(null);
    const errors = ref({});
    const formError = ref("");
    const availableSports = ref([]);

    const form = ref({
      name: "",
      description: "",
      address: "",
      latitude: null,
      longitude: null,
      status: "active",
      amenities: [],
      new_images: [],
      courts: [],
      images_to_delete: [],
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
    const loadVenue = async () => {
      try {
        initialLoading.value = true;
        const venueId = route.params.id;

        // const response = await api.getVenue(venueId);
        // venue.value = response.data;

        // Mock data
        venue.value = {
          id: venueId,
          name: "Sân bóng đá ABC",
          description: "Sân bóng đá hiện đại với cỏ nhân tạo chất lượng cao",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          latitude: 10.762622,
          longitude: 106.660172,
          status: "active",
          amenities: ["parking", "wifi", "shower"],
          images: [
            { id: 1, url: "/images/venue1.jpg" },
            { id: 2, url: "/images/venue2.jpg" },
          ],
          courts: [
            {
              id: 1,
              name: "Sân số 1",
              sport_type: "football",
              description: "Sân bóng đá 11 người",
              price_per_hour: 500000,
              is_active: true,
            },
            {
              id: 2,
              name: "Sân số 2",
              sport_type: "football",
              description: "Sân bóng đá 7 người",
              price_per_hour: 300000,
              is_active: true,
            },
          ],
        };

        // Populate form
        form.value = {
          name: venue.value.name,
          description: venue.value.description,
          address: venue.value.address,
          latitude: venue.value.latitude,
          longitude: venue.value.longitude,
          status: venue.value.status,
          amenities: [...(venue.value.amenities || [])],
          new_images: [],
          courts: [...(venue.value.courts || [])],
          images_to_delete: [],
        };
      } catch (error) {
        console.error("Failed to load venue:", error);
        venue.value = null;
      } finally {
        initialLoading.value = false;
      }
    };

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
      const court = form.value.courts[index];
      if (court.id) {
        // Existing court - mark for deletion
        if (!form.value.courts_to_delete) {
          form.value.courts_to_delete = [];
        }
        form.value.courts_to_delete.push(court.id);
      }
      form.value.courts.splice(index, 1);
    };

    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        if (file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            form.value.new_images.push({
              file,
              preview: e.target.result,
            });
          };
          reader.readAsDataURL(file);
        }
      });
    };

    const removeNewImage = (index) => {
      form.value.new_images.splice(index, 1);
    };

    const removeCurrentImage = (imageId, index) => {
      if (confirm("Bạn có chắc chắn muốn xóa hình ảnh này?")) {
        form.value.images_to_delete.push(imageId);
        venue.value.images.splice(index, 1);
      }
    };

    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `${store.getters.storageUrl}${imagePath}`;
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
        formData.append("_method", "PUT");
        formData.append("name", form.value.name);
        formData.append("description", form.value.description);
        formData.append("address", form.value.address);
        formData.append("status", form.value.status);

        if (form.value.latitude)
          formData.append("latitude", form.value.latitude);
        if (form.value.longitude)
          formData.append("longitude", form.value.longitude);

        form.value.amenities.forEach((amenity) => {
          formData.append("amenities[]", amenity);
        });

        form.value.new_images.forEach((image, index) => {
          formData.append(`new_images[${index}]`, image.file);
        });

        form.value.images_to_delete.forEach((imageId) => {
          formData.append("images_to_delete[]", imageId);
        });

        form.value.courts.forEach((court, index) => {
          if (court.id) formData.append(`courts[${index}][id]`, court.id);
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

        if (form.value.courts_to_delete) {
          form.value.courts_to_delete.forEach((courtId) => {
            formData.append("courts_to_delete[]", courtId);
          });
        }

        // Submit to API
        // await api.updateVenue(venue.value.id, formData);

        // Mock success
        await new Promise((resolve) => setTimeout(resolve, 2000));

        alert("Cập nhật sân thành công!");
        router.push("/dashboard/venues");
      } catch (error) {
        console.error("Update venue error:", error);

        if (error.response?.data?.errors) {
          errors.value = error.response.data.errors;
        } else {
          formError.value =
            error.response?.data?.message || "Có lỗi xảy ra khi cập nhật sân";
        }
      } finally {
        loading.value = false;
      }
    };

    // Initialize
    onMounted(() => {
      loadVenue();
      loadSports();
    });

    return {
      initialLoading,
      loading,
      venue,
      form,
      errors,
      formError,
      availableSports,
      availableAmenities,
      addCourt,
      removeCourt,
      handleImageUpload,
      removeNewImage,
      removeCurrentImage,
      getImageUrl,
      submitForm,
    };
  },
};
</script>
