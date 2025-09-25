<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Quản lý sân</h1>
          <p class="mt-2 text-gray-600">Quản lý các sân thể thao của bạn</p>
        </div>
        <RouterLink
          to="/dashboard/venues/create"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Thêm sân mới
        </RouterLink>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tìm kiếm:</label
            >
            <input
              v-model="filters.search"
              type="text"
              placeholder="Tên sân, địa chỉ..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="debouncedSearch"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Trạng thái:</label
            >
            <select
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="loadVenues"
            >
              <option value="">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="pending">Chờ duyệt</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Sắp xếp:</label
            >
            <select
              v-model="sortBy"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="loadVenues"
            >
              <option value="created_at">Mới nhất</option>
              <option value="name">Tên A-Z</option>
              <option value="rating">Đánh giá cao</option>
              <option value="bookings_count">Đặt sân nhiều</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Đặt lại
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- No Venues -->
      <div
        v-else-if="venues.length === 0"
        class="bg-white rounded-lg shadow p-12 text-center"
      >
        <div
          class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4"
        >
          <svg
            class="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có sân nào</h3>
        <p class="text-gray-500 mb-6">
          Bạn chưa tạo sân nào. Hãy tạo sân đầu tiên của bạn!
        </p>
        <RouterLink
          to="/dashboard/venues/create"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
        >
          Tạo sân đầu tiên
        </RouterLink>
      </div>

      <!-- Venues Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <div
          v-for="venue in venues"
          :key="venue.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
        >
          <!-- Venue Image -->
          <div class="relative h-48 bg-gray-200">
            <img
              v-if="venue.images && venue.images.length > 0"
              :src="getImageUrl(venue.images[0])"
              :alt="venue.name"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="flex items-center justify-center h-full text-gray-500"
            >
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
              </svg>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-2 right-2">
              <span
                :class="getStatusClass(venue.status)"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ getStatusText(venue.status) }}
              </span>
            </div>

            <!-- Rating -->
            <div
              v-if="venue.rating"
              class="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium"
            >
              ⭐ {{ venue.rating.toFixed(1) }}
            </div>
          </div>

          <!-- Venue Info -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ venue.name }}
              </h3>
            </div>

            <p class="text-sm text-gray-600 mb-3">{{ venue.address }}</p>
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">
              {{ venue.description }}
            </p>

            <!-- Courts Info -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-500"
                >{{ venue.courts?.length || 0 }} sân</span
              >
              <span class="text-sm text-gray-500"
                >{{ venue.bookings_count || 0 }} đặt sân</span
              >
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <RouterLink
                :to="`/venues/${venue.id}`"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm font-medium transition-colors text-center"
              >
                Xem
              </RouterLink>
              <RouterLink
                :to="`/dashboard/venues/${venue.id}/edit`"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors text-center"
              >
                Sửa
              </RouterLink>
              <button
                @click="toggleVenueStatus(venue)"
                :class="[
                  'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors',
                  venue.status === 'active'
                    ? 'bg-red-100 hover:bg-red-200 text-red-700'
                    : 'bg-green-100 hover:bg-green-200 text-green-700',
                ]"
              >
                {{ venue.status === "active" ? "Tạm dừng" : "Kích hoạt" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1" class="flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            v-for="page in paginationPages"
            :key="page"
            @click="loadVenues(page)"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              page === pagination.current_page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border',
            ]"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useApi } from "@/composables/useApi";

export default {
  name: "ManageVenues",
  setup() {
    const store = useStore();
    const api = useApi();

    const loading = ref(false);
    const venues = ref([]);
    const sortBy = ref("created_at");
    const searchTimeout = ref(null);

    const filters = ref({
      search: "",
      status: "",
    });

    const pagination = ref({
      current_page: 1,
      last_page: 1,
      per_page: 12,
      total: 0,
    });

    // Computed
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
          owner: true, // Only get venues owned by current user
          ...filters.value,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
          if (params[key] === "" || params[key] === null) {
            delete params[key];
          }
        });

        // const response = await api.getVenues(params);

        // Mock data for demonstration
        venues.value = [
          {
            id: 1,
            name: "Sân bóng đá ABC",
            description: "Sân bóng đá hiện đại với cỏ nhân tạo chất lượng cao",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            status: "active",
            rating: 4.5,
            images: [],
            courts: [
              { id: 1, name: "Sân số 1" },
              { id: 2, name: "Sân số 2" },
            ],
            bookings_count: 45,
          },
          {
            id: 2,
            name: "Trung tâm cầu lông XYZ",
            description: "Hệ thống 6 sân cầu lông với điều hòa và đèn LED",
            address: "456 Đường XYZ, Quận 3, TP.HCM",
            status: "active",
            rating: 4.8,
            images: [],
            courts: [
              { id: 3, name: "Sân A" },
              { id: 4, name: "Sân B" },
              { id: 5, name: "Sân C" },
            ],
            bookings_count: 78,
          },
        ];

        pagination.value = {
          current_page: page,
          last_page: 2,
          per_page: 12,
          total: venues.value.length,
        };
      } catch (error) {
        console.error("Failed to load venues:", error);
      } finally {
        loading.value = false;
      }
    };

    const debouncedSearch = () => {
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
      }
      searchTimeout.value = setTimeout(() => {
        loadVenues();
      }, 500);
    };

    const resetFilters = () => {
      filters.value = {
        search: "",
        status: "",
      };
      sortBy.value = "created_at";
      loadVenues();
    };

    const toggleVenueStatus = async (venue) => {
      const newStatus = venue.status === "active" ? "inactive" : "active";
      const action = newStatus === "active" ? "kích hoạt" : "tạm dừng";

      if (!confirm(`Bạn có chắc chắn muốn ${action} sân "${venue.name}"?`)) {
        return;
      }

      try {
        // await api.updateVenue(venue.id, { status: newStatus });

        // Update local data
        venue.status = newStatus;

        alert(`Đã ${action} sân thành công!`);
      } catch (error) {
        console.error("Failed to update venue status:", error);
        alert(`Có lỗi xảy ra khi ${action} sân!`);
      }
    };

    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `${store.getters.storageUrl}${imagePath}`;
    };

    const getStatusText = (status) => {
      const statusMap = {
        active: "Hoạt động",
        inactive: "Tạm dừng",
        pending: "Chờ duyệt",
      };
      return statusMap[status] || status;
    };

    const getStatusClass = (status) => {
      const classMap = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-red-100 text-red-800",
        pending: "bg-yellow-100 text-yellow-800",
      };
      return classMap[status] || "bg-gray-100 text-gray-800";
    };

    // Initialize
    onMounted(() => {
      loadVenues();
    });

    return {
      loading,
      venues,
      filters,
      sortBy,
      pagination,
      paginationPages,
      loadVenues,
      debouncedSearch,
      resetFilters,
      toggleVenueStatus,
      getImageUrl,
      getStatusText,
      getStatusClass,
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
