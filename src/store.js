import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state: {
    UrlServe: "http://127.0.0.1:8000/api",
    token: null,
    isAuthenticated: false,
  },
  getters: {
    doneLogin(state) {
      return state.tokenUser.length > 20
        ? (state.isLogin = true)
        : (state.isLogin = false);
    },
    getToken: (state) => state.token,
  },
  actions: {
    saveToken({ commit }, token) {
      commit("setToken", token);
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
});

export default store;
