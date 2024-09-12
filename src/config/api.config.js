const API = process.env.VUE_APP_URL;

const API_ENV = {
  apiGetAllItems: `${API}localhost:7000/api/v1/catalog`,
  apiMain: `${API}localhost:7000/api/v1`,
};
export default API_ENV;
