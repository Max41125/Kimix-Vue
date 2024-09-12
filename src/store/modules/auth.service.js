import axios from "axios";

export default {
  state: { status: "", token: localStorage.getItem("token") || "", user: {} },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    async login({ commit }, params) {
      try {
        commit("auth_request");
        const response = await axios.post(
          "https://backend.kimix.space/api/v1/auth/login",
          params
        );
        const token = response.data.token;
        const userData = response.data.user;
        localStorage.setItem("token", token);

        commit("auth_success", token, userData);
      } catch (error) {
        commit("auth_error", error);
        localStorage.removeItem("token");
        throw error;
      }
    },
    async register({ commit }, params) {
      try {
        commit("auth_request");
        const response = await axios.post(
          "https://backend.kimix.space/api/v1/auth/send-code",
          params
        );

        return response;
      } catch (error) {
        commit("auth_error", error);
        localStorage.removeItem("token");
        throw error;
      }
    },
    async registration({ commit }, { params }) {
      try {
        commit("auth_request");
        const response = await axios.post(
          "https://backend.kimix.space/api/v1/auth/registration",
          { ...params }
        );

        const token = response.data.token;
        const userData = response.data.user;
        localStorage.setItem("token", token);
            
        commit("auth_success", token, userData);
        return response;
      } catch (error) {
        commit("auth_error", error);
        throw error;
      }
    },
    async checkConfirmationCode({ commit }, params) {
      try {
        commit("auth_request");
        const response = await axios.post(
          "https://backend.kimix.space/api/v1/auth/check-code",
          params
        );
        return response;
      } catch (error) {
        commit("auth_error", error);
        throw error;
      }
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        resolve();
      });
    },
  },
};
