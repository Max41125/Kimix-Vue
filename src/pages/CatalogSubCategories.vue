<template>
  <div class="sub_categories_block">
    <div class="categories_content">
      <div class="categories_pointers">
        <router-link to="/">
          <button type="button" class="basket_pointer">
            главная
          </button></router-link
        ><router-link to="/catalog">
          <button type="button" class="basket_pointer">
            каталог
          </button></router-link
        >
        <router-link :to="'/catalog/' + this.$route.params.category">
          <button type="button" class="basket_pointer">
            {{ this.$store.getters.getSubSubCategoriesList.categoryName }}
          </button></router-link
        >
        <span>
          <button type="button" class="basket_pointer green_bttn">
            {{ this.$store.getters.getSubSubCategoriesList.subcategoryName }}
          </button></span
        >
      </div>
      <div class="sub_categories_header">
        {{ this.$store.getters.getSubSubCategoriesList.subcategoryName }}
      </div>
      <div class="sub_categories_list">
        <router-link
          class="category_item"
          v-for="item in this.$store.getters.getSubSubCategoriesList
            .subsubcategoryDTOList"
          :key="item.id"
          style="text-decoration: none; color: inherit"
          :to="{
            path: '/catalog/' + item.commandName + '/products',
          }"
          ><div class="item_image"><img src="/icons/mockupIcon.png" /></div>
          <div class="item_name">{{ item.russianName }}</div>
          <div class="item_more_button">
            <p class="more_button_text">Подробнее</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CatalogSubCategoriesBlock",
  data: () => ({
    isHovering: "",
  }),

  methods: {
    ...mapActions(["getSubSubCategoriesListRequest"]),
    getSubSub() {
      this.getSubSubCategoriesListRequest({
        name: this.$route.params.subCategory,
      });
    },
    setHoveredName(name) {
      this.isHovering = name;
    },
  },

  mounted() {
    this.getSubSub();
  },
};
</script>

<style lang="scss" scoped>
.sub_categories_header {
  margin: 20px 0 20px 5px;
  font-size: 30px;
  font-weight: 700;
  line-height: 64px;
  letter-spacing: -0.02em;
}
.item_more_button {
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
  padding: 0 20px 20px 0;
  cursor: pointer;
  color: #14d8b5;
  svg {
    transform: rotate(-90deg);
    transition: 0.3s;
  }
  img {
    transition: 0.3s;
    width: 16px;
    height: 12px;
  }
  .more_button_text {
    margin-right: 5px;
    font-size: 16px;
    font-weight: 500;
  }
}
.item_more_button:hover {
  img {
    translate: 10px;
  }
}
.item_sub-category_name {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4285714285714286;
  font-weight: 500;
  color: #505050;
  p {
    padding: 10px 0;
    transition: 0.3s;
  }
}
.category_item {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 22%;
  height: 330px;

  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}
.category_item {
  transition: 0.3s;
}
.category_item:hover {
  background: #f4f4f4;
}
.categories_pointers {
  margin: 20px;
}

.basket_pointer {
  margin: 0 10px 0 0;
  border: 1px solid #cdcdcd;
  padding: 5px 20px;
  border-radius: 64px;
  color: gray;
  font-size: 14px;
}
.categories_content {
  display: flex;
  width: 90%;
  flex-direction: column;
}
.sub_categories_block {
  display: flex;
  justify-content: center;
}
.sub_categories_list {
  display: flex;
  flex-wrap: wrap;
}
.item_name {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.375;
  padding: 20px 0 10px 0;
}
.hovered {
  background: #f4f4f4;
}
.green_bttn {
  border-color: #14d8b5;
}

.item_image {
  height: 150px;
  width: 100%;
  img {
    height: 150px;
    width: 100%;
    inset: 0px;
    transition: all 0.2s ease;
    object-fit: cover;
    color: transparent;
    object-position: center center;
  }
  img:hover {
    transform: scale(103%);
  }
}
</style>
