<template>
  <div class="catalog_block">
    <div class="catalog_block_content">
      <div class="basket_pointers">
        <router-link to="/">
          <button type="button" class="basket_pointer">
            главная
          </button></router-link
        ><router-link to="/catalog">
          <button type="button" class="basket_pointer green_bttn">
            каталог
          </button></router-link
        >
      </div>
      <div class="catalog_block_content_search">
        <ul class="search_categories_list">
          <li
            class="search_category"
            v-for="item in this.$store.getters?.getCategoriesList"
            :key="item.id"
            :class="{ active: currentString == item.russianName }"
            @click="
              if (currentString != item.russianName) {
                setSelectedCategory(
                  item.name
                    .toLowerCase()
                    .replaceAll(' & ', '-')
                    .replaceAll(' ', '-')
                    .replaceAll(',', '')
                );
              }
              currentString = item.russianName;
              currentStringEng = item.name;
            "
          >
            {{ item.russianName }}
          </li>
        </ul>
        <div class="search_sub-categories_list">
          <router-link
            style="color: inherit; text-decoration: none"
            :to="{
              path:
                '/catalog/' +
                currentStringEng
                  .toLowerCase()
                  .replaceAll(' & ', '-')
                  .replaceAll(' ', '-')
                  .replaceAll(',', ''),
            }"
          >
            <div class="main_category_header">
              <p class="main_category_name">{{ currentString }}</p>
              <div class="more_button">СМОТРЕТЬ ВСЕ</div>
            </div>
          </router-link>

          <div class="sub-categories_content">
            <div
              class="sub-categories_list"
              v-for="item in this.$store.getters.getSubCategoriesList
                .subcategoryDTOList"
              :key="item.id"
            >
              <div v-if="item && item.subsubcategories.length >= 1">
                <router-link
                  style="text-decoration: none; color: inherit"
                  :to="{
                    path:
                      '/catalog/' +
                      currentStringEng
                        .toLowerCase()
                        .replaceAll(' & ', '-')
                        .replaceAll(' ', '-')
                        .replaceAll(',', '') +
                      '/' +
                      item.commandName,
                  }"
                >
                  <p
                    class="sub-category_name"
                    @click="setProductsValue(item.name)"
                  >
                    {{ item.russianName }}
                  </p>
                </router-link>
              </div>
              <div v-else>
                <router-link
                  style="text-decoration: none; color: inherit"
                  :to="{
                    path: '/catalog/' + item.commandName + '/products',
                  }"
                >
                  <p
                    class="sub-category_name"
                    @click="setProductsValue(item.name)"
                  >
                    {{ item.russianName }}
                  </p>
                </router-link>
              </div>
              <div
                class="sub-category"
                v-for="subCategory in item.subsubcategories"
                :key="subCategory.id"
              >
                <router-link
                  v-if="subCategory"
                  style="text-decoration: none; color: inherit"
                  :to="{
                    path: '/catalog/' + subCategory.commandName + '/products',
                  }"
                  >{{ subCategory.russianName }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CatalogPage",
  data: () => ({
    firstLoad: true,
    currentString: "Клеи и герметики",
    currentStringEng: "Adhesives & Sealants",
  }),
  watch: {
    "$route.query.search"() {
      this.$store.state.searchList = [];
      var previousText = document.getElementById("maintext");
      var futureText = document.getElementById("subtext");
      previousText?.classList.remove("deleted");
      futureText?.classList.add("deleted");

      if (this.firstLoad) return;

      var params = { fullName: this.$route.query.search };

      this.$store.dispatch("getAllItemsRequest");

      this.$store.dispatch("getSearchListRequest", params).catch((error) => {
        var previous_text = document.getElementById("maintext");
        previous_text.classList.add("deleted");

        var future_text = document.getElementById("subtext");
        future_text.classList.remove("deleted");
        return error;
      });
    },
  },
  methods: {
    ...mapActions([
      "getSearchListRequest",
      "getAllItemsListRequest",
      "getCategoriesListRequest",
      "getSubCategoriesListRequest",
      "setProductRequestValue",
    ]),
    setProductsValue(str) {
      this.setProductRequestValue({ data: str });
    },
    deleteAllBackSlashesMain(str) {
      let cleanedStr = str.replace(/\\/g, "");
      var cleanedStrElems = cleanedStr.split(/\s+/);
      var width = window.innerWidth;
      cleanedStrElems[1] = `width="${width / 9}"`;
      cleanedStrElems[17] = `height="${width / 9}"`;

      cleanedStr = cleanedStrElems.join(" ");

      return cleanedStr;
    },
    setSelectedCategory(name) {
      this.getSubCategoriesListRequest({ name: name });
    },
    deleteAllBackSlashesSub(str) {
      let cleanedStr = str.replace(/\\/g, "");
      var cleanedStrElems = cleanedStr.split(/\s+/);
      var width = window.innerWidth;
      cleanedStrElems[1] = `width="${width / 12}"`;
      cleanedStrElems[17] = `height="${width / 12}"`;

      cleanedStr = cleanedStrElems.join(" ");

      return cleanedStr;
    },
  },
  mounted() {
    this.$store.state.searchList = [];
    var previousText = document.getElementById("maintext");
    var futureText = document.getElementById("subtext");
    previousText?.classList.remove("deleted");
    futureText?.classList.add("deleted");

    this.getSubCategoriesListRequest({ name: "adhesives-sealants" });

    this.getCategoriesListRequest();
  },
};
</script>

<style lang="scss" scoped>
.more_button {
  cursor: pointer;
  color: #2c2c2c;
  font-family: Helvetica;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.02em;
  padding: 16px 28px 16px 28px;
  border: 1px solid #2c2c2c;
  border-radius: 64px;
  transition: 0.2s;
}
.more_button:hover {
  color: #14d8b5;
  border-color: #14d8b5;
}
.main_category_header {
  display: flex;
  align-items: center;
}
.sub-category {
  max-width: 100%;
  margin: 0 0 10px 20px;
  color: rgb(72, 72, 72);
  cursor: pointer;
  transition: 0.2s;
}
.sub-category:hover {
  color: rgb(0, 0, 0);
}
.sub-categories_content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 1200px;
}
.last_category {
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 20px;
}
.sub-category_name {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  padding-left: 20px;
  background: url("../assets/catalogLinkIcon.svg") no-repeat 0 40%;
  cursor: pointer;
  transition: 0.2s;
}
.sub-category_name:hover {
  color: rgb(80, 80, 80);
}
.sub-categories_list {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 45%;
  flex-direction: column;
}
.categories_list {
  margin: 3---0px;
}
.main_category_name {
  max-width: 700px;
  margin: 30px 50px 30px 30px;
  font-size: 36px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.02em;
  text-align: left;
}
.categories_list {
  display: none;
  flex-direction: column;
  justify-content: space-between;
}
.search_sub-categories_list {
  display: flex;
  flex-direction: column;
  width: 70%;
  border-left: 1px solid #cdcdcd;
  background: #f7f7f7;
  max-height: 1300px;
}
.catalog_block_content_search {
  border-top: #cdcdcd 1px solid;
  display: flex;
  justify-content: space-between;
}
.search_categories_list {
  display: flex;
  flex-direction: column;
}
.search_category {
  text-align: left;
  padding: 16px 0 16px 50px;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  background: url("../assets/catalogLinkIcon.svg") no-repeat 25px 50%;
  cursor: pointer;
}

.basket_pointers {
  margin: 20px 0 20px 20px;
  .green_bttn {
    border: 1px solid #14d8b5;
  }
}
.basket_pointer {
  margin: 0 10px 0 0;
  border: 1px solid #cdcdcd;
  padding: 5px 20px;
  border-radius: 64px;
  color: gray;
  font-size: 14px;
}
.search_categories_list {
  width: 30%;
  list-style: none;
}
.catalog_block_items_header_text {
  margin: 40px 0 20px 0;
  font-size: 30px;
  color: var(--black-base, #2c2c2c);
  font-style: normal;
  font-weight: 700;
  line-height: 64px;
  letter-spacing: -0.96px;
}
.catalog_block_header_subtext {
  text-align: left;
  margin: 20px 0 0 0;
  color: var(--black-base, #2c2c2c);
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 64px; /* 133.333% */
  letter-spacing: -0.96px;
  .subtext_mini {
    display: block;
    font-size: 20px;
    font-weight: 400;
  }
}
.catalog_block_content_items-list_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24%;
  text-decoration: none;
  color: inherit;
}
.catalog_block_content_items-list_sub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18%;
  text-decoration: none;
  color: inherit;
}
.catalog_block_content_items-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.catalog_block_content_links {
  margin: 20px 30px 30px 0;
  align-items: left;
  list-style: none;
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 300px;
}
.catalog_block_items {
  display: flex;
  flex-direction: column;
}
.block_content_link {
  padding: 20px 20px 20px 40px;
  margin-bottom: 5px;
  background: #f8f8f8 url("@/assets/catalogLinkIcon.svg") no-repeat;
  background-position: 2% 50%;
  border-radius: 4px;
}
.block_content_link,
text {
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
.catalog_block_header_text {
  margin: 20px 0;
  color: var(--black-base, #2c2c2c);
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 64px; /* 133.333% */
  letter-spacing: -0.96px;
}
.catalog_block_content {
  width: 90%;
}
.catalog_block {
  display: flex;
  justify-content: center;
}
.deleted {
  display: none;
}
.catalog_block_content_intems-list_image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11vw;
  height: 11vw;
}
.active {
  background-color: #1457d81a;
}

.search_category:hover:not(.active) {
  background-color: rgba(54, 121, 246, 0.052);
}
.visible {
  display: flex;
}
</style>
