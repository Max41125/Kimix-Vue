<template>
  <div class="search-results">
    <h2>Результаты поиска для "{{ searchQuery }}"</h2>
    <div class="results-container">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div v-html="product.image"></div>
        <h3>{{ product.title }}</h3>
        <p><strong>CAS Number:</strong> {{ product.cas_number }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getSearchProductsList']),
    searchQuery() {
      return this.$route.query.q; // Получаем значение из URL
    },
    products() {
      return this.getSearchProductsList; // Получаем список продуктов из состояния поиска
    },
  },
  methods: {
    ...mapActions(['getProductsSearchRequest']), // Добавляем action для поиска
    async fetchProducts() {
      if (this.searchQuery) {
        await this.getProductsSearchRequest({ name: this.searchQuery });
      }
    },
  },
  mounted() {
    this.fetchProducts(); // Вызываем метод при монтировании компонента
  },
};
</script>

<style scoped>
.search-results {
  padding: 20px;
}

.results-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(33% - 20px);
}
</style>
