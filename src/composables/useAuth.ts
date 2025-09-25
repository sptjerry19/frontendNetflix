import { computed } from "vue";
import { useStore } from "vuex";
import { useApi } from "./useApi";
import type { LoginCredentials, RegisterData, User } from "../types/auth";

export const useAuth = () => {
  const store = useStore();
  const api = useApi();

  // Computed properties
  const user = computed<User | null>(() => store.state.auth.user);
  const token = computed<string | null>(() => store.state.auth.token);
  const isAuthenticated = computed<boolean>(
    () => store.state.auth.isAuthenticated
  );
  const loading = computed<boolean>(() => store.state.auth.loading);
  const isOwner = computed<boolean>(() => {
    return (
      user.value?.roles?.includes("owner") ||
      user.value?.roles?.includes("admin") ||
      false
    );
  });

  // Actions
  const login = async (credentials: LoginCredentials) => {
    try {
      store.commit("auth/SET_LOADING", true);
      const response = await api.login(credentials);

      console.log("124jahsfjkahsjkfhaksjfa", response.data.data);

      const { user: userData, token: userToken } = response.data.data;

      console.log(userData, userToken);

      // Lưu token và user info
      localStorage.setItem("token", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // Cập nhật store
      store.commit("auth/SET_USER", userData);
      store.commit("auth/SET_TOKEN", userToken);
      store.commit("auth/SET_AUTHENTICATED", true);

      return { success: true, data: userData };
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Đăng nhập thất bại",
      };
    } finally {
      store.commit("auth/SET_LOADING", false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      store.commit("auth/SET_LOADING", true);
      const response = await api.register(data);

      const { user: userData, token: userToken } = response.data;

      // Lưu token và user info
      localStorage.setItem("token", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // Cập nhật store
      store.commit("auth/SET_USER", userData);
      store.commit("auth/SET_TOKEN", userToken);
      store.commit("auth/SET_AUTHENTICATED", true);

      return { success: true, data: userData };
    } catch (error: any) {
      console.error("Register error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Đăng ký thất bại",
      };
    } finally {
      store.commit("auth/SET_LOADING", false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear store
      store.commit("auth/CLEAR_USER");
    }
  };

  const logoutAll = async () => {
    try {
      await api.logoutAll();
    } catch (error) {
      console.error("Logout all error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear store
      store.commit("auth/CLEAR_USER");
    }
  };

  const refreshToken = async () => {
    try {
      const response = await api.refreshToken();
      const { token: newToken } = response.data;

      // Update token
      localStorage.setItem("token", newToken);
      store.commit("auth/SET_TOKEN", newToken);

      return { success: true, token: newToken };
    } catch (error: any) {
      console.error("Refresh token error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Làm mới token thất bại",
      };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      store.commit("auth/SET_LOADING", true);
      await api.forgotPassword(email);
      return { success: true, message: "Email đặt lại mật khẩu đã được gửi" };
    } catch (error: any) {
      console.error("Forgot password error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Gửi email thất bại",
      };
    } finally {
      store.commit("auth/SET_LOADING", false);
    }
  };

  const resetPassword = async (data: any) => {
    try {
      store.commit("auth/SET_LOADING", true);
      await api.resetPassword(data);
      return { success: true, message: "Mật khẩu đã được đặt lại thành công" };
    } catch (error: any) {
      console.error("Reset password error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Đặt lại mật khẩu thất bại",
      };
    } finally {
      store.commit("auth/SET_LOADING", false);
    }
  };

  const changePassword = async (data: any) => {
    try {
      store.commit("auth/SET_LOADING", true);
      await api.changePassword(data);
      return { success: true, message: "Mật khẩu đã được thay đổi thành công" };
    } catch (error: any) {
      console.error("Change password error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Thay đổi mật khẩu thất bại",
      };
    } finally {
      store.commit("auth/SET_LOADING", false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser();
      const userData = response.data;

      // Cập nhật user info
      localStorage.setItem("user", JSON.stringify(userData));
      store.commit("auth/SET_USER", userData);

      return userData;
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  };

  const initializeAuth = () => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        store.commit("auth/SET_USER", userData);
        store.commit("auth/SET_TOKEN", savedToken);
        store.commit("auth/SET_AUTHENTICATED", true);
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    isOwner,

    // Actions
    login,
    register,
    logout,
    logoutAll,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
    getCurrentUser,
    initializeAuth,
  };
};
