import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Auth module
const auth = {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
  },
  getters: {
    isOwner: (state) => {
      return (
        state.user?.roles?.includes("owner") ||
        state.user?.roles?.includes("admin") ||
        false
      );
    },
    getUserName: (state) => state.user?.name || "",
    getUserEmail: (state) => state.user?.email || "",
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    CLEAR_USER(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, { user, token }) {
      commit("SET_USER", user);
      commit("SET_TOKEN", token);
      commit("SET_AUTHENTICATED", true);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout({ commit }) {
      commit("CLEAR_USER");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
};

// Venue module
const venue = {
  namespaced: true,
  state: {
    venues: [],
    currentVenue: null,
    courts: [],
    currentCourt: null,
    filters: {
      search: "",
      sport_type: "",
      location: "",
      price_min: null,
      price_max: null,
    },
    loading: false,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 12,
      total: 0,
    },
  },
  mutations: {
    SET_VENUES(state, venues) {
      state.venues = venues;
    },
    SET_CURRENT_VENUE(state, venue) {
      state.currentVenue = venue;
      state.courts = venue?.courts || [];
    },
    SET_CURRENT_COURT(state, court) {
      state.currentCourt = court;
    },
    SET_FILTERS(state, filters) {
      state.filters = { ...state.filters, ...filters };
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
  },
};

// Booking module
const booking = {
  namespaced: true,
  state: {
    myBookings: [],
    currentBooking: null,
    courtAvailability: null,
    ownerBookings: [],
    stats: {
      total_bookings: 0,
      completed_bookings: 0,
      cancelled_bookings: 0,
      total_revenue: 0,
    },
    loading: false,
  },
  mutations: {
    SET_MY_BOOKINGS(state, bookings) {
      state.myBookings = bookings;
    },
    SET_CURRENT_BOOKING(state, booking) {
      state.currentBooking = booking;
    },
    SET_COURT_AVAILABILITY(state, availability) {
      state.courtAvailability = availability;
    },
    SET_OWNER_BOOKINGS(state, bookings) {
      state.ownerBookings = bookings;
    },
    SET_STATS(state, stats) {
      state.stats = stats;
    },
    ADD_BOOKING(state, booking) {
      state.myBookings.unshift(booking);
    },
    UPDATE_BOOKING(state, updatedBooking) {
      const index = state.myBookings.findIndex(
        (b) => b.id === updatedBooking.id
      );
      if (index !== -1) {
        state.myBookings.splice(index, 1, updatedBooking);
      }
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
  },
};

// UI module
const ui = {
  namespaced: true,
  state: {
    sidebar: false,
    notifications: [],
    toast: {
      show: false,
      message: "",
      type: "info", // success, error, warning, info
    },
    modal: {
      show: false,
      component: null,
      props: {},
    },
    loading: false,
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sidebar = !state.sidebar;
    },
    SET_SIDEBAR(state, status) {
      state.sidebar = status;
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push({
        id: Date.now(),
        ...notification,
        timestamp: new Date(),
      });
    },
    REMOVE_NOTIFICATION(state, id) {
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
    SHOW_TOAST(state, { message, type = "info" }) {
      state.toast = { show: true, message, type };
    },
    HIDE_TOAST(state) {
      state.toast.show = false;
    },
    SHOW_MODAL(state, { component, props = {} }) {
      state.modal = { show: true, component, props };
    },
    HIDE_MODAL(state) {
      state.modal = { show: false, component: null, props: {} };
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
  },
  actions: {
    showToast({ commit }, payload) {
      commit("SHOW_TOAST", payload);
      setTimeout(() => {
        commit("HIDE_TOAST");
      }, 5000);
    },
    showModal({ commit }, payload) {
      commit("SHOW_MODAL", payload);
    },
    hideModal({ commit }) {
      commit("HIDE_MODAL");
    },
  },
};

// Create store instance
const store = createStore({
  modules: {
    auth,
    venue,
    booking,
    ui,
  },
  plugins: [
    createPersistedState({
      key: "booking-sport-app",
      paths: ["auth.user", "auth.token", "auth.isAuthenticated"],
    }),
  ],
  state: {
    apiBase: import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1",
    storageUrl:
      import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage/",
  },
  getters: {
    apiBase: (state) => state.apiBase,
    storageUrl: (state) => state.storageUrl,
  },
});

export default store;
