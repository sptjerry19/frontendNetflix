<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Đặt sân thể thao
            <span class="text-yellow-400">dễ dàng</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Tìm và đặt sân bóng đá, cầu lông, tennis gần bạn chỉ trong vài phút
          </p>

          <!-- Search Bar -->
          <div class="max-w-4xl mx-auto mb-8">
            <div class="bg-white rounded-lg p-6 shadow-lg">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Địa điểm</label
                  >
                  <input
                    v-model="searchForm.location"
                    type="text"
                    placeholder="Nhập địa điểm..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Môn thể thao</label
                  >
                  <select
                    v-model="searchForm.sport_id"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Tất cả</option>
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
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Ngày</label
                  >
                  <input
                    v-model="searchForm.date"
                    type="date"
                    :min="today"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div class="flex items-end">
                  <button
                    @click="searchVenues"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
                  >
                    Tìm sân
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Sports -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Môn thể thao phổ biến
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="sport in popularSports"
            :key="sport.type"
            @click="searchBySport(sport.type)"
            class="text-center cursor-pointer group hover:transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="bg-white rounded-full p-8 shadow-lg mb-4 group-hover:shadow-xl"
            >
              <div class="text-4xl mb-2">{{ sport.icon }}</div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ sport.name }}
              </h3>
              <p class="text-sm text-gray-500 mt-2">{{ sport.count }}+ sân</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Venues -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Sân được ưa chuộng
          </h2>
          <p class="text-lg text-gray-600">
            Những địa điểm có rating cao và được đánh giá tốt
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
          ></div>
        </div>

        <!-- Venues Grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <VenueCard
            v-for="venue in featuredVenues"
            :key="venue.id"
            :venue="venue"
          />
        </div>

        <div class="text-center mt-12">
          <RouterLink
            to="/venues"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Xem tất cả sân
            <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Tại sao chọn chúng tôi?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Đặt sân nhanh chóng
            </h3>
            <p class="text-gray-600">
              Tìm và đặt sân chỉ trong vài phút với giao diện thân thiện
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Thanh toán an toàn
            </h3>
            <p class="text-gray-600">
              Hỗ trợ nhiều phương thức thanh toán với bảo mật cao
            </p>
          </div>

          <div class="text-center">
            <div
              class="bg-yellow-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Hỗ trợ 24/7
            </h3>
            <p class="text-gray-600">
              Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-blue-600 py-16">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-white mb-4">Sẵn sàng bắt đầu?</h2>
        <p class="text-xl text-blue-100 mb-8">
          Tạo tài khoản để trải nghiệm đặt sân nhanh chóng
        </p>
        <div class="space-x-4">
          <RouterLink
            to="/auth/register"
            class="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Đăng ký ngay
          </RouterLink>
          <RouterLink
            to="/venues"
            class="inline-block border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
          >
            Khám phá sân
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useApi } from "@/composables/useApi";
import VenueCard from "@/components/Venue/VenueCard.vue";

export default {
  name: "HomeView",
  components: {
    VenueCard,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const api = useApi();

    // Reactive data
    const loading = ref(false);
    const featuredVenues = ref([]);
    const availableSports = ref([]);
    const popularSports = ref([]);
    const searchForm = ref({
      location: "",
      sport_id: "",
      date: "",
    });

    // Computed
    const today = computed(() => {
      return new Date().toISOString().split("T")[0];
    });

    // Methods
    const loadFeaturedVenues = async () => {
      try {
        loading.value = true;
        const response = await api.getVenues({ featured: true, per_page: 6 });
        featuredVenues.value = response.data.data || [];
      } catch (error) {
        console.error("Failed to load featured venues:", error);
      } finally {
        loading.value = false;
      }
    };

    const loadSports = async () => {
      try {
        const response = await api.getSportsActive();
        availableSports.value = response.data.data || [];
      } catch (error) {
        console.error("Failed to load sports:", error);
      }
    };

    const loadPopularSports = async () => {
      try {
        const response = await api.getSportsPopular();
        popularSports.value = response.data.data || [];
      } catch (error) {
        console.error("Failed to load popular sports:", error);
      }
    };

    const searchVenues = () => {
      const query = new URLSearchParams();

      if (searchForm.value.location)
        query.append("location", searchForm.value.location);
      if (searchForm.value.sport_id)
        query.append("sport_id", searchForm.value.sport_id);
      if (searchForm.value.date) query.append("date", searchForm.value.date);

      router.push(`/venues?${query.toString()}`);
    };

    const searchBySport = (sportType) => {
      router.push(`/venues?sport_id=${sportType.id}`);
    };

    // Initialize
    onMounted(() => {
      searchForm.value.date = today.value;
      loadFeaturedVenues();
      loadSports();
      loadPopularSports();
    });

    return {
      loading,
      featuredVenues,
      availableSports,
      popularSports,
      searchForm,
      today,
      searchVenues,
      searchBySport,
    };
  },
};
</script>
