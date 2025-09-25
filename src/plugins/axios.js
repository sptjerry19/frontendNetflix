import axios from "axios";

// Create axios instance for Sanctum SPA authentication
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1",
  withCredentials: true, // Important for Sanctum SPA
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Get CSRF cookie before making requests
    if (!document.cookie.includes("XSRF-TOKEN")) {
      try {
        const baseURL =
          import.meta.env.VITE_API_BASE || "http://localhost:8000";
        await axios.get(
          `${baseURL.replace("/api/v1", "")}/sanctum/csrf-cookie`,
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Failed to get CSRF cookie:", error);
      }
    }

    // Add Authorization header if token exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login if not already there
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access denied:", error.response.data?.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
