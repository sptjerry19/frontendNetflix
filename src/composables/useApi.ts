import axios from "axios";
import type { LoginCredentials, RegisterData } from "../types/auth";
import type { VenueFilters } from "../types/venue";
import type { Booking, CreateBookingData } from "../types/booking";

// Tạo axios instance với cấu hình Sanctum SPA
const api = axios.create({
  baseURL:
    (import.meta as any).env?.VITE_API_BASE || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor để thêm CSRF token
api.interceptors.request.use(async (config) => {
  // Lấy CSRF cookie trước khi gọi API
  if (!document.cookie.includes("XSRF-TOKEN")) {
    const baseURL =
      (import.meta as any).env?.VITE_API_BASE || "http://localhost:8000";
    await axios.get(`${baseURL.replace("/api/v1", "")}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  // Thêm Authorization header nếu có token
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const useApi = () => {
  return {
    // Auth endpoints
    login: (credentials: LoginCredentials) =>
      api.post("/auth/login", credentials),

    register: (data: RegisterData) => api.post("/auth/register", data),

    logout: () => api.post("/auth/logout"),

    logoutAll: () => api.post("/auth/logout-all"),

    refreshToken: () => api.post("/auth/refresh-token"),

    forgotPassword: (email: string) =>
      api.post("/auth/forgot-password", { email }),

    resetPassword: (data: any) => api.post("/auth/reset-password", data),

    changePassword: (data: any) => api.post("/auth/change-password", data),

    getCurrentUser: () => api.get("/auth/me"),

    // Profile endpoints
    getProfile: () => api.get("/profile"),

    updateProfile: (data: any) => api.put("/profile", data),

    uploadAvatar: (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      return api.post("/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    // Sports endpoints
    getSports: (params?: any) => api.get("/sports", { params }),

    getSportsActive: () => api.get("/sports/active"),

    getSportsPopular: () => api.get("/sports/popular"),

    getSportsWithCourtCount: () => api.get("/sports/with-court-count"),

    getSport: (id: string | number) => api.get(`/sports/${id}`),

    getSportBySlug: (slug: string) => api.get(`/sports/slug/${slug}`),

    getSportStatistics: (id: string | number) =>
      api.get(`/sports/${id}/statistics`),

    // Venues endpoints
    getVenues: (params?: VenueFilters) => api.get("/venues", { params }),

    getVenue: (id: string | number) => api.get(`/venues/${id}`),

    getVenueAvailability: (id: string | number) =>
      api.get(`/venues/${id}/availability`),

    getMyVenues: () => api.get("/my-venues"),

    createVenue: (data: any) => api.post("/venues", data),

    updateVenue: (id: string | number, data: any) =>
      api.put(`/venues/${id}`, data),

    deleteVenue: (id: string | number) => api.delete(`/venues/${id}`),

    toggleVenueStatus: (id: string | number) =>
      api.patch(`/venues/${id}/toggle-status`),

    getVenueStatistics: (id: string | number) =>
      api.get(`/venues/${id}/statistics`),

    approveVenue: (id: string | number) => api.patch(`/venues/${id}/approve`),

    rejectVenue: (id: string | number) => api.patch(`/venues/${id}/reject`),

    // Courts endpoints
    getCourts: (params?: any) => api.get("/courts", { params }),

    getCourtsPopular: () => api.get("/courts/popular"),

    getCourt: (id: string | number) => api.get(`/courts/${id}`),

    getCourtAvailability: (courtId: string | number, date: string) =>
      api.get(`/courts/${courtId}/availability?date=${date}`),

    getCourtAvailabilityRange: (courtId: string | number, params: any) =>
      api.get(`/courts/${courtId}/availability-range`, { params }),

    checkCourtAvailability: (courtId: string | number, data: any) =>
      api.post(`/courts/${courtId}/check-availability`, data),

    getVenueCourts: (venueId: string | number) =>
      api.get(`/venues/${venueId}/courts`),

    createCourt: (data: any) => api.post("/courts", data),

    updateCourt: (id: string | number, data: any) =>
      api.put(`/courts/${id}`, data),

    deleteCourt: (id: string | number) => api.delete(`/courts/${id}`),

    toggleCourtStatus: (id: string | number) =>
      api.patch(`/courts/${id}/toggle-status`),

    getCourtStatistics: (id: string | number) =>
      api.get(`/courts/${id}/statistics`),

    // Bookings endpoints
    createBooking: (data: CreateBookingData) => api.post("/bookings", data),

    getMyBookings: () => api.get("/me/bookings"),

    getBooking: (id: string | number) => api.get(`/bookings/${id}`),

    updateBooking: (id: string | number, data: any) =>
      api.patch(`/bookings/${id}`, data),

    cancelBooking: (id: string | number) => api.patch(`/bookings/${id}/cancel`),

    // Owner dashboard endpoints
    getOwnerBookings: () => api.get("/owner/bookings"),

    getBookingStats: () => api.get("/owner/stats"),

    // Payment endpoints
    processPayment: (bookingId: string | number, paymentData: any) =>
      api.post(`/bookings/${bookingId}/payment`, paymentData),

    // Notifications endpoints
    registerNotificationToken: (data: any) =>
      api.post("/notifications/register-token", data),

    removeNotificationToken: (data: any) =>
      api.post("/notifications/remove-token", data),

    testNotification: () => api.post("/notifications/test"),

    getMyDevices: () => api.get("/notifications/my-devices"),

    broadcastTopic: (data: any) =>
      api.post("/notifications/broadcast-topic", data),

    sendRoleTopic: (data: any) =>
      api.post("/notifications/send-role-topic", data),

    sendToUsers: (data: any) => api.post("/notifications/send-to-users", data),

    sendToAll: (data: any) => api.post("/notifications/send-to-all", data),

    sendToRole: (data: any) => api.post("/notifications/send-to-role", data),

    getNotificationsList: (params?: any) =>
      api.get("/notifications/list", { params }),

    getNotificationStats: () => api.get("/notifications/stats"),

    getNotification: (id: string | number) => api.get(`/notifications/${id}`),

    // Search endpoints
    searchVenues: (query: string, filters?: any) =>
      api.get("/search/venues", { params: { q: query, ...filters } }),
  };
};
