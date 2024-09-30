import axios from "axios";
import store from "..";
// import authService from "./auth.service";
export default {
  state: {
    requestStatus: null,
    searchList: [],
    popularItemsList: [],
    allItemsList: [],
  },
  getters: {
    getSearchList: ({ searchList }) => searchList,
    getPopularItemsList: ({ popularItemsList }) => popularItemsList,
    getRequestStatus: ({ requestStatus }) => requestStatus,
    getAllItemsList: ({ getAllItemsList }) => getAllItemsList,
  },
  mutations: {
    changeSearchList(state, data) {
      state.searchList = data;
    },
    changePopularItemsList(state, data) {
      state.popularItemsList = data;
    },
    changeRequestStatus(state, data) {
      state.requestStatus = data;
    },
    changeAllItemsList(state, data) {
      state.getAllItemsList = data;
    },
  },
  actions: {
    async getPopularItemsRequest() {
      const result = await axios.get(
        "https://backend.kimix.space:80/api/items"
      );
      const listOfPopularItems = result.data;

      store.commit("changePopularItemsList", listOfPopularItems);
      return listOfPopularItems;
    },
    async setTransfer(context, { params, price, basketDTO }) {
      const orderDTO = { basketDTO: basketDTO };
      const headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      };
      const result = await axios
        .post(
          `https://backend.kimix.space/api/v1/basket/send-email`,
          { ...params, price, orderDTO },
          { headers: headers }
        )
        .catch((error) => {
          throw error;
        });
      return result;
    },
    async getAllItemsRequest() {
      const result = await axios.get(
        "https://backend.kimix.space/api/v1/catalog"
      );

      const listOfAllItems = result.data;

      store.commit("changeAllItemsList", listOfAllItems);
      return listOfAllItems;
    },

    async getSearchListRequest(context, params) {
      const headers = {
        "Content-Type": "application/json",
      };

      const result = await axios
        .post("https://backend.kimix.space/api/v1", params, {
          headers: headers,
        })
        .catch((error) => {
          throw error;
        });
      const listOfItems = result.data;

      store.commit("changeSearchList", listOfItems);
      return listOfItems;
    },
  },
};
