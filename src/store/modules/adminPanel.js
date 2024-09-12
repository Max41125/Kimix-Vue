import axios from "axios";

export default {
  state: { adminProductsList: [] },
  getters: {
    getAdminProductsList: ({ adminProductsList }) => adminProductsList,
  },
  mutations: {
    changeAdminProductsList(state, data) {
      state.adminProductsList = data;
    },
    deleteItemProductsList(state, id) {
      state.adminProductsList = state.adminProductsList.filter(
        (item) => item.id != id
      );
    },
  },
  actions: {
    async confirmProductRequest(context, { id }) {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };
      const result = await axios
        .get(
          `https://backend.kimix.space/api/v1/admin/products/${id}/change-status`,
          { headers: headers }
        )
        .then((resp) => {
          if (resp.status == 200) {
            context.commit("deleteItemProductsList", id);
          }
        });
      return result;
    },
    async deleteButtonRequest(context, { id }) {
      context.commit("deleteItemProductList", id);
    },
    async getAdminProductsListRequest({ commit }) {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };
      const result = await axios.get(
        `https://backend.kimix.space/api/v1/admin/products`,
        { headers: headers }
      );
      commit("changeAdminProductsList", result.data);
      return result;
    },
  },
};
