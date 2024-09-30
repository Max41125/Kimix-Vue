import axios from "axios";
import store from "..";

export default {
  state: {
    subCategoriesList: [],
    categoriesList: [],
    productsList: [],
    subSubCategoriesList: [],
    currentItem: [],
    productRequestValue: "",
    searchProductsList: [],
    
  },
  getters: {
    getCategoriesList: ({ categoriesList }) => categoriesList,
    getProductsList: ({ productsList }) => productsList,
    getSubCategoriesList: ({ subCategoriesList }) => subCategoriesList,
    getProductRequestValue: ({ productRequestValue }) => productRequestValue,
    getSubSubCategoriesList: ({ subSubCategoriesList }) => subSubCategoriesList,
    getCurrentItem: ({ currentItem }) => currentItem,
    getSearchProductsList: ({ searchProductsList }) => searchProductsList,
  },
  mutations: {
    changeCategoriesList(state, data) {
      state.categoriesList = data;
    },
    changeSubCategoriesList(state, data) {
      state.subCategoriesList = data;
    },
    changeProductsList(state, data) {
      state.productsList = data;
    },
    changeProductRequestValue(state, data) {
      state.productRequestValue = data;
    },
    changeSubSubCategoriesList(state, data) {
      state.subSubCategoriesList = data;
    },
    changeCurrentItem(state, data) {
      state.currentItem = data;
    },
    changeProductsSearch(state, products) {
      state.searchProductsList = products; // Обновляем список результатов поиска
    },

  },
  actions: {
    async getCurrentItemRequest(context, id) {
      const result = await axios.get(
        `https://backend.kimix.space/api/v1/catalog/${id}`
      );
      store.commit("changeCurrentItem", result.data);
      return result;
    },
    async getSubCategoriesListRequest(context, { name }) {
      const result = await axios.get(
        `https://backend.kimix.space/api/v1/catalog/categories/${name}/subcategories`
      );
      store.commit("changeSubCategoriesList", result.data);
      return result;
    },
    async getCategoriesListRequest() {
      try {
        const result = await axios.get(`https://backend.kimix.space/api/v1/catalog/categories`);
        store.commit("changeCategoriesList", result.data);
        return result;
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    },
    setProductRequestValue(context, { data }) {
      store.commit("changeProductRequestValue", data);
    },

    async getSubSubCategoriesListRequest(context, { name }) {
      const result = await axios.get(
        `https://backend.kimix.space/api/v1/catalog/find-by-subcategory-name/${name}`
      );
      store.commit("changeSubSubCategoriesList", result.data);
      return result;
    },
    async getProductsListRequest(context, { name }) {
      const result = await axios.get(
        `https://backend.kimix.space/api/v1/catalog/find-by-subsubcategory-name/${name}/products`
      );
      store.commit("changeProductsList", result.data);
      return result;
    },

    async getProductsSearchRequest(context, { name }) {
      try {
        const result = await axios.get(
          `https://test.kimix.space/api/chemicals/search?q=${name}`
        );
        console.log('API response:', result.data);
        context.commit("changeProductsSearch", result.data); // Коммитим результат в состояние поиска
        return result;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    







  },
};
