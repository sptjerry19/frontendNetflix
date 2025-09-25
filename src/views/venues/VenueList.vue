<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl font-bold text-gray-900">Tìm sân thể thao</h1>
        <p class="text-gray-600 mt-1">{{ totalVenues }} sân được tìm thấy</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h3>

            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tìm kiếm</label
              >
              <input
                v-model="filters.search"
                type="text"
                placeholder="Tên sân, địa điểm..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="debouncedSearch"
              />
            </div>

            <!-- Sport Type -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Môn thể thao</label
              >
              <select
                v-model="filters.sport_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="applyFilters"
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

            <!-- Location -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Khu vực</label
              >
              <input
                v-model="filters.location"
                type="text"
                placeholder="Nhập địa điểm..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="debouncedSearch"
              />
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Giá (VND/giờ)</label
              >
              <div class="grid grid-cols-2 gap-2">
                <input
                  v-model.number="filters.price_min"
                  type="number"
                  placeholder="Từ"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @input="debouncedSearch"
                />
                <input
                  v-model.number="filters.price_max"
                  type="number"
                  placeholder="Đến"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @input="debouncedSearch"
                />
              </div>
            </div>

            <!-- Amenities -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tiện ích</label
              >
              <div class="space-y-2">
                <label
                  v-for="amenity in availableAmenities"
                  :key="amenity"
                  class="flex items-center"
                >
                  <input
                    v-model="filters.amenities"
                    type="checkbox"
                    :value="amenity"
                    class="mr-2 text-blue-600"
                    @change="applyFilters"
                  />
                  <span class="text-sm text-gray-700">{{
                    getAmenityLabel(amenity)
                  }}</span>
                </label>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-3 mt-8 lg:mt-0">
          <!-- Sort Options -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-4">
              <label class="text-sm font-medium text-gray-700">Sắp xếp:</label>
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="applyFilters"
              >
                <option value="created_at">Mới nhất</option>
                <option value="rating">Đánh giá cao</option>
                <option value="price_asc">Giá thấp đến cao</option>
                <option value="price_desc">Giá cao đến thấp</option>
                <option value="distance">Khoảng cách</option>
              </select>
            </div>

            <!-- View Toggle -->
            <div class="flex items-center space-x-2">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'p-2 rounded-md',
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700',
                ]"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 18H5V5h5v13zm9 0h-5v-8h5v8zm0-11h-5V5h5v2z" />
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'p-2 rounded-md',
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700',
                ]"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
            ></div>
          </div>

          <!-- Empty State -->
          <div v-else-if="venues.length === 0" class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy sân nào
            </h3>
            <p class="text-gray-500">Thử thay đổi bộ lọc để xem thêm kết quả</p>
          </div>

          <!-- Venues Grid/List -->
          <div v-else>
            <div
              :class="[
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'space-y-6',
              ]"
            >
              <VenueCard
                v-for="venue in venues"
                :key="venue.id"
                :venue="venue"
                :class="viewMode === 'list' ? 'max-w-none' : ''"
              />
            </div>

            <!-- Pagination -->
            <div v-if="pagination.last_page > 1" class="mt-8">
              <nav class="flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                  <button
                    @click="goToPage(pagination.current_page - 1)"
                    :disabled="pagination.current_page <= 1"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trang trước
                  </button>
                  <button
                    @click="goToPage(pagination.current_page + 1)"
                    :disabled="pagination.current_page >= pagination.last_page"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trang sau
                  </button>
                </div>
                <div
                  class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <p class="text-sm text-gray-700">
                      Hiển thị
                      <span class="font-medium">{{
                        (pagination.current_page - 1) * pagination.per_page + 1
                      }}</span>
                      đến
                      <span class="font-medium">{{
                        Math.min(
                          pagination.current_page * pagination.per_page,
                          pagination.total
                        )
                      }}</span>
                      trong
                      <span class="font-medium">{{ pagination.total }}</span>
                      kết quả
                    </p>
                  </div>
                  <div>
                    <nav
                      class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    >
                      <!-- Pagination buttons -->
                      <button
                        v-for="page in paginationPages"
                        :key="page"
                        @click="goToPage(page)"
                        :class="[
                          'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                          page === pagination.current_page
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        ]"
                      >
                        {{ page }}
                      </button>
                    </nav>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useApi } from "@/composables/useApi";
import VenueCard from "@/components/Venue/VenueCard.vue";

export default {
  name: "VenueList",
  components: {
    VenueCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const api = useApi();

    // Reactive data
    const loading = ref(false);
    const venues = ref([]);
    const availableSports = ref([]);
    const viewMode = ref("grid");
    const sortBy = ref("created_at");
    const searchTimeout = ref(null);

    const filters = ref({
      search: "",
      sport_id: "",
      location: "",
      price_min: null,
      price_max: null,
      amenities: [],
    });

    const pagination = ref({
      current_page: 1,
      last_page: 1,
      per_page: 12,
      total: 0,
    });

    const availableAmenities = [
      "parking",
      "wifi",
      "shower",
      "locker",
      "canteen",
      "equipment_rental",
      "air_conditioning",
      "changing_room",
    ];

    // Computed properties
    const totalVenues = computed(() => pagination.value.total);

    const paginationPages = computed(() => {
      const pages = [];
      const start = Math.max(1, pagination.value.current_page - 2);
      const end = Math.min(
        pagination.value.last_page,
        pagination.value.current_page + 2
      );

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    // Methods
    const loadVenues = async (page = 1) => {
      try {
        loading.value = true;

        const params = {
          page,
          per_page: pagination.value.per_page,
          sort: sortBy.value,
          ...filters.value,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
          if (
            params[key] === "" ||
            params[key] === null ||
            (Array.isArray(params[key]) && params[key].length === 0)
          ) {
            delete params[key];
          }
        });

        const response = await api.getVenues(params);
        venues.value = response.data.data || [];
        pagination.value = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
        };

        // Update store
        store.commit("venue/SET_VENUES", venues.value);
        store.commit("venue/SET_PAGINATION", pagination.value);
      } catch (error) {
        console.error("Failed to load venues:", error);
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

    const applyFilters = () => {
      pagination.value.current_page = 1;
      loadVenues(1);
      updateUrl();
    };

    const debouncedSearch = () => {
      clearTimeout(searchTimeout.value);
      searchTimeout.value = setTimeout(() => {
        applyFilters();
      }, 500);
    };

    const clearFilters = () => {
      filters.value = {
        search: "",
        sport_id: "",
        location: "",
        price_min: null,
        price_max: null,
        amenities: [],
      };
      sortBy.value = "created_at";
      applyFilters();
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= pagination.value.last_page) {
        pagination.value.current_page = page;
        loadVenues(page);
        updateUrl();
      }
    };

    const updateUrl = () => {
      const query = { ...filters.value };
      query.page = pagination.value.current_page;
      query.sort = sortBy.value;

      // Remove empty values
      Object.keys(query).forEach((key) => {
        if (
          query[key] === "" ||
          query[key] === null ||
          (Array.isArray(query[key]) && query[key].length === 0)
        ) {
          delete query[key];
        }
      });

      router.replace({ query });
    };

    const initializeFromQuery = () => {
      // Initialize filters from URL query
      const query = route.query;
      filters.value.search = query.search || "";
      filters.value.sport_id = query.sport_id || "";
      filters.value.location = query.location || "";
      filters.value.price_min = query.price_min
        ? Number(query.price_min)
        : null;
      filters.value.price_max = query.price_max
        ? Number(query.price_max)
        : null;
      filters.value.amenities = Array.isArray(query.amenities)
        ? query.amenities
        : query.amenities
        ? [query.amenities]
        : [];
      sortBy.value = query.sort || "created_at";
      pagination.value.current_page = Number(query.page) || 1;
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

    // Watchers
    watch(
      () => route.query,
      () => {
        initializeFromQuery();
        loadVenues(pagination.value.current_page);
      }
    );

    // Initialize
    onMounted(() => {
      initializeFromQuery();
      loadVenues(pagination.value.current_page);
      loadSports();
    });

    return {
      loading,
      venues,
      availableSports,
      filters,
      pagination,
      viewMode,
      sortBy,
      availableAmenities,
      totalVenues,
      paginationPages,
      loadVenues,
      applyFilters,
      debouncedSearch,
      clearFilters,
      goToPage,
      getAmenityLabel,
    };
  },
};
</script>
