import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useApi } from "./useApi";
import type {
  Booking,
  CreateBookingData,
  CourtAvailability,
} from "@/types/booking";

export const useBooking = () => {
  const store = useStore();
  const api = useApi();

  // Local reactive state
  const selectedDate = ref<string>("");
  const selectedTimeSlots = ref<string[]>([]);
  const bookingNotes = ref<string>("");

  // Computed properties
  const myBookings = computed<Booking[]>(() => store.state.booking.myBookings);
  const currentBooking = computed<Booking | null>(
    () => store.state.booking.currentBooking
  );
  const loading = computed<boolean>(() => store.state.booking.loading);
  const courtAvailability = computed<CourtAvailability | null>(
    () => store.state.booking.courtAvailability
  );

  // Actions
  const getMyBookings = async () => {
    try {
      store.commit("booking/SET_LOADING", true);
      const response = await api.getMyBookings();

      store.commit("booking/SET_MY_BOOKINGS", response.data);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Get my bookings error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Lỗi khi tải danh sách đặt sân",
      };
    } finally {
      store.commit("booking/SET_LOADING", false);
    }
  };

  const getCourtAvailability = async (courtId: number, date: string) => {
    try {
      store.commit("booking/SET_LOADING", true);
      const response = await api.getCourtAvailability(courtId, date);

      store.commit("booking/SET_COURT_AVAILABILITY", response.data);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Get court availability error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Lỗi khi tải lịch trống",
      };
    } finally {
      store.commit("booking/SET_LOADING", false);
    }
  };

  const createBooking = async (bookingData: CreateBookingData) => {
    try {
      store.commit("booking/SET_LOADING", true);
      const response = await api.createBooking(bookingData);

      const newBooking = response.data;
      store.commit("booking/ADD_BOOKING", newBooking);
      store.commit("booking/SET_CURRENT_BOOKING", newBooking);

      // Reset form data
      selectedDate.value = "";
      selectedTimeSlots.value = [];
      bookingNotes.value = "";

      return { success: true, data: newBooking };
    } catch (error: any) {
      console.error("Create booking error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Lỗi khi tạo đặt sân",
      };
    } finally {
      store.commit("booking/SET_LOADING", false);
    }
  };

  const cancelBooking = async (bookingId: number) => {
    try {
      store.commit("booking/SET_LOADING", true);
      const response = await api.cancelBooking(bookingId);

      const updatedBooking = response.data;
      store.commit("booking/UPDATE_BOOKING", updatedBooking);

      return { success: true, data: updatedBooking };
    } catch (error: any) {
      console.error("Cancel booking error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Lỗi khi hủy đặt sân",
      };
    } finally {
      store.commit("booking/SET_LOADING", false);
    }
  };

  const getBookingDetails = async (bookingId: number) => {
    try {
      store.commit("booking/SET_LOADING", true);
      const response = await api.getBooking(bookingId);

      const booking = response.data;
      store.commit("booking/SET_CURRENT_BOOKING", booking);

      return { success: true, data: booking };
    } catch (error: any) {
      console.error("Get booking details error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Lỗi khi tải thông tin đặt sân",
      };
    } finally {
      store.commit("booking/SET_LOADING", false);
    }
  };

  // Utility functions
  const calculateTotalPrice = (timeSlots: any[], pricePerHour: number) => {
    return timeSlots.length * pricePerHour;
  };

  const formatBookingTime = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  const getBookingStatusText = (status: string) => {
    const statusMap = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      cancelled: "Đã hủy",
      completed: "Hoàn thành",
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getPaymentStatusText = (status: string) => {
    const statusMap = {
      pending: "Chờ thanh toán",
      paid: "Đã thanh toán",
      failed: "Thanh toán thất bại",
      refunded: "Đã hoàn tiền",
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  return {
    // State
    myBookings,
    currentBooking,
    loading,
    courtAvailability,
    selectedDate,
    selectedTimeSlots,
    bookingNotes,

    // Actions
    getMyBookings,
    getCourtAvailability,
    createBooking,
    cancelBooking,
    getBookingDetails,

    // Utilities
    calculateTotalPrice,
    formatBookingTime,
    getBookingStatusText,
    getPaymentStatusText,
  };
};
