<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <!-- Venue Image -->
    <div class="relative h-48 bg-gray-200">
      <img
        v-if="venue.images && venue.images.length > 0"
        :src="getImageUrl(venue.images[0])"
        :alt="venue.name"
        class="w-full h-full object-cover"
      />
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
        </svg>
      </div>

      <!-- Rating Badge -->
      <div
        class="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium"
      >
        ⭐ {{ venue.rating?.toFixed(1) || "0.0" }}
      </div>
    </div>

    <!-- Venue Info -->
    <div class="p-4">
      <div class="mb-2">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          {{ venue.name }}
        </h3>
        <p class="text-sm text-gray-600 flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            />
          </svg>
          {{ venue.address }}
        </p>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ venue.description }}
      </p>

      <!-- Courts Info -->
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-gray-500">
          {{ venue.courts?.length || 0 }} sân
        </span>
        <span class="text-sm text-gray-500">
          {{ venue.reviews_count || 0 }} đánh giá
        </span>
      </div>

      <!-- Sports Types -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="sport in getUniqueSpots(venue.courts)"
          :key="sport"
          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
        >
          {{ sport }}
        </span>
      </div>

      <!-- Price Range -->
      <div class="flex items-center justify-between mb-4">
        <div class="text-sm">
          <span class="text-gray-500">Giá từ:</span>
          <span class="text-lg font-semibold text-green-600 ml-1">
            {{ formatCurrency(getMinPrice(venue.courts)) }}
          </span>
          <span class="text-gray-500">/giờ</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button
          @click="viewDetails"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          Xem chi tiết
        </button>
        <button
          @click="bookNow"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          Đặt ngay
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "VenueCard",
  props: {
    venue: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `${store.getters.storageUrl}${imagePath}`;
    };

    const getUniqueSpots = (courts) => {
      if (!courts) return [];
      return [...new Set(courts.map((court) => court.sport_type))];
    };

    const getMinPrice = (courts) => {
      if (!courts || courts.length === 0) return 0;
      return Math.min(...courts.map((court) => court.hourly_rate || 0));
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    };

    const viewDetails = () => {
      // Navigate to venue details page
      window.location.href = `/venues/${props.venue.id}`;
    };

    const bookNow = () => {
      // Navigate to booking page
      window.location.href = `/venues/${props.venue.id}/booking`;
    };

    return {
      getImageUrl,
      getUniqueSpots,
      getMinPrice,
      formatCurrency,
      viewDetails,
      bookNow,
    };
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
