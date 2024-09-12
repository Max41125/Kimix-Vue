import { createStore } from "vuex";
import searchList from "./modules/searchList";
import authService from "./modules/auth.service";
import basketModule from "./modules/basketModule";
import catalogModule from "./modules/catalogModule";
import userProfile from "./modules/userProfile";
import adminPanel from "./modules/adminPanel";

const store = new createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    searchList: searchList,
    adminPanel,
    authService,
    basketModule,
    catalogModule,
    userProfile,
  },
});

export default store;
