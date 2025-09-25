<template>
  <div v-if="venue" class="min-h-screen bg-gray-50">
    <!-- Image Gallery -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-4 gap-2 p-4">
          <div class="col-span-2 row-span-2">
            <img
              :src="getImageUrl(venue.images?.[0])"
              :alt="venue.name"
              class="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div
            v-for="(image, index) in venue.images?.slice(1, 5)"
            :key="index"
            class="h-47"
          >
            <img
              :src="getImageUrl(image)"
              :alt="`${venue.name} ${index + 2}`"
              class="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80"
              @click="openGallery(index + 1)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Venue Info -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ venue.name }}
                </h1>
                <p class="text-gray-600 flex items-center mb-2">
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    />
                  </svg>
                  {{ venue.address }}
                </p>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <span class="text-yellow-500">⭐</span>
                    <span class="ml-1 font-medium">{{
                      venue.rating?.toFixed(1) || "0.0"
                    }}</span>
                    <span class="ml-1 text-gray-500"
                      >({{ venue.reviews_count }} đánh giá)</span
                    >
                  </div>
                  <span class="text-gray-300">•</span>
                  <span class="text-gray-600"
                    >{{ venue.courts?.length || 0 }} sân</span
                  >
                </div>
              </div>

              <!-- Share Button -->
              <button
                @click="shareVenue"
                class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"
                  />
                </svg>
              </button>
            </div>

            <div class="border-t pt-4">
              <h3 class="text-lg font-semibold mb-2">Mô tả</h3>
              <p class="text-gray-600 leading-relaxed">
                {{ venue.description }}
              </p>
            </div>
          </div>

          <!-- Amenities -->
          <div
            v-if="venue.amenities?.length"
            class="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <h3 class="text-lg font-semibold mb-4">Tiện ích</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="amenity in venue.amenities"
                :key="amenity"
                class="flex items-center text-sm text-gray-600"
              >
                <svg
                  class="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {{ getAmenityLabel(amenity) }}
              </div>
            </div>
          </div>

          <!-- Courts -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold mb-4">Danh sách sân</h3>
            <div class="space-y-4">
              <div
                v-for="court in venue.courts"
                :key="court.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900 mb-1">
                      {{ court.name }}
                    </h4>
                    <p class="text-sm text-gray-600 mb-2">
                      {{ court.sport.name }}
                    </p>
                    <p
                      v-if="court.description"
                      class="text-sm text-gray-500 mb-3"
                    >
                      {{ court.description }}
                    </p>

                    <!-- Court Amenities -->
                    <div
                      v-if="court.amenities?.length"
                      class="flex flex-wrap gap-2 mb-3"
                    >
                      <span
                        v-for="amenity in court.amenities"
                        :key="amenity"
                        class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {{ getAmenityLabel(amenity) }}
                      </span>
                    </div>
                  </div>

                  <div class="text-right ml-4">
                    <p class="text-lg font-semibold text-green-600">
                      {{ formatCurrency(court.hourly_rate) }}
                    </p>
                    <p class="text-sm text-gray-500">/ giờ</p>
                    <button
                      @click="bookCourt(court)"
                      :disabled="!court.is_active"
                      class="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {{ court.is_active ? "Đặt sân" : "Không hoạt động" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div
            v-if="venue.latitude && venue.longitude"
            class="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <h3 class="text-lg font-semibold mb-4">Vị trí</h3>
            <div class="h-64 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                class="w-full h-full rounded-lg"
                :src="`https://www.google.com/maps?q=${venue.latitude},${venue.longitude}&hl=vi&z=15&output=embed`"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <!-- Reviews -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">Đánh giá</h3>
            <div class="text-center py-8 text-gray-500">
              <p>Tính năng đánh giá sẽ được cập nhật sớm</p>
            </div>
          </div>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1 mt-8 lg:mt-0">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 class="text-lg font-semibold mb-4">Đặt sân nhanh</h3>

            <!-- Quick Booking Form -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Chọn sân:</label
                >
                <select
                  v-model="selectedCourt"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn sân...</option>
                  <option
                    v-for="court in activeCourts"
                    :key="court.id"
                    :value="court"
                  >
                    {{ court.name }} -
                    {{ formatCurrency(court.price_per_hour) }}/giờ
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Ngày:</label
                >
                <input
                  v-model="bookingDate"
                  type="date"
                  :min="today"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                @click="proceedToBooking"
                :disabled="!selectedCourt || !bookingDate"
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                Tiếp tục đặt sân
              </button>
            </div>

            <!-- Owner Info -->
            <div class="mt-6 pt-6 border-t">
              <h4 class="font-medium text-gray-900 mb-2">Thông tin chủ sân</h4>
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <span class="text-sm font-medium text-gray-600">
                    {{ venue.owner?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ venue.owner?.name }}
                  </p>
                  <p class="text-xs text-gray-500">Chủ sân</p>
                </div>
              </div>
              <div class="mt-4 space-y-2">
                <button
                  @click="contactOwner"
                  class="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Liên hệ chủ sân
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div
    v-else-if="loading"
    class="min-h-screen bg-gray-50 flex items-center justify-center"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
    ></div>
  </div>

  <!-- Error State -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">
        Không tìm thấy sân
      </h2>
      <p class="text-gray-600 mb-4">
        Sân bạn đang tìm có thể đã bị xóa hoặc không tồn tại
      </p>
      <RouterLink
        to="/venues"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
      >
        Quay lại danh sách sân
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useApi } from "@/composables/useApi";

export default {
  name: "VenueDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const api = useApi();

    // Reactive data
    const loading = ref(false);
    const venue = ref(null);
    const selectedCourt = ref("");
    const bookingDate = ref("");

    // Computed
    const today = computed(() => {
      return new Date().toISOString().split("T")[0];
    });

    const activeCourts = computed(() => {
      return venue.value?.courts?.filter((court) => court.is_active) || [];
    });

    // Methods
    const loadVenue = async (id) => {
      try {
        loading.value = true;
        const response = await api.getVenue(id);
        venue.value = response.data.data;
        store.commit("venue/SET_CURRENT_VENUE", venue.value);
      } catch (error) {
        console.error("Failed to load venue:", error);
        venue.value = null;
      } finally {
        loading.value = false;
      }
    };

    const getImageUrl = (imagePath) => {
      console.log("imagePath", imagePath);
      if (!imagePath) return "/images/placeholder-venue.jpg";
      if (imagePath.startsWith("http")) return imagePath;
      return `${store.getters.storageUrl}${imagePath}`;
    };

    const getAmenityLabel = (amenity) => {
      const labels = {
        parking: "Bãi đậu xe",
        wifi: "WiFi miễn phí",
        shower: "Phòng tắm",
        locker: "Tủ khóa",
        canteen: "Căng tin",
        equipment_rental: "Cho thuê dụng cụ",
        air_conditioning: "Điều hòa",
        changing_room: "Phòng thay đồ",
      };
      return labels[amenity] || amenity;
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    };

    const bookCourt = (court) => {
      selectedCourt.value = court;
      bookingDate.value = today.value;
      proceedToBooking();
    };

    const proceedToBooking = () => {
      if (!selectedCourt.value || !bookingDate.value) return;

      router.push({
        path: `/booking/${selectedCourt.value.id}`,
        query: {
          venue_id: venue.value.id,
          date: bookingDate.value,
        },
      });
    };

    const shareVenue = async () => {
      const url = window.location.href;
      const title = `${venue.value.name} - Đặt sân thể thao`;

      if (navigator.share) {
        try {
          await navigator.share({ title, url });
        } catch (error) {
          console.log("Share cancelled");
        }
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        // Show toast notification
        store.dispatch("ui/showToast", {
          type: "success",
          message: "Đã copy link vào clipboard",
        });
      }
    };

    const contactOwner = () => {
      // Implementation for contacting owner
      store.dispatch("ui/showModal", {
        component: "ContactOwnerModal",
        props: { venue: venue.value },
      });
    };

    const openGallery = (index) => {
      // Implementation for opening image gallery
      store.dispatch("ui/showModal", {
        component: "ImageGalleryModal",
        props: { images: venue.value.images, startIndex: index },
      });
    };

    // Watchers
    watch(
      () => route.params.id,
      (newId) => {
        if (newId) {
          loadVenue(newId);
        }
      }
    );

    // Initialize
    onMounted(() => {
      const venueId = route.params.id;
      if (venueId) {
        loadVenue(venueId);
      }
      bookingDate.value = today.value;
    });

    return {
      loading,
      venue,
      selectedCourt,
      bookingDate,
      today,
      activeCourts,
      getImageUrl,
      getAmenityLabel,
      formatCurrency,
      bookCourt,
      proceedToBooking,
      shareVenue,
      contactOwner,
      openGallery,
    };
  },
};
</script>
