<template>
  <div class="container">
    <div class="item-page_content">
      <div class="item-page-info_block">
        <div class="item-page_links">
          <router-link
            to="/catalog"
            style="text-decoration: none; color: inherit"
            ><button class="pages_link">В каталог</button></router-link
          >
        </div>
        <div class="item-page_information">
          <div class="item-main_info">
            <h1 class="item_title">
              {{ currentItem?.commonName }}
            </h1>
            <div></div>
            <div class="item-info_block">
              <div
                class="item_image_block"
                v-if="currentItem && currentItem.image"
              >
                <img class="item_image" :src="currentItem.image" />
              </div>
              <div class="item_image_block" v-else>
                <img class="item_image" src="/icons/mockupIcon.png" />
              </div>
              <ul class="item-info_list">
                <li
                  class="item-info_text"
                  @click="showSpec = !showSpec"
                  :class="{ active: showSpec }"
                >
                  ХАРАКТЕРИСТИКИ
                  <HeaderLangButton :class="{ activeImg: showSpec }" />
                </li>
                <Transition name="slide-fade"
                  ><div v-if="showSpec" class="item-info_specification">
                    <div class="spec_list">
                      <div class="spec_item">
                        <p class="spec_name">SMILES</p>
                        <p class="spec_description">
                          {{ currentItem?.smiles }}
                        </p>
                      </div>
                      <div class="spec_item">
                        <p class="spec_name">INCHI</p>
                        <p class="spec_description">{{ currentItem?.inchi }}</p>
                      </div>
                      <div class="spec_item">
                        <p class="spec_name">Молекулярный вес</p>
                        <p class="spec_description">
                          {{ currentItem?.molecularWeight }}
                        </p>
                      </div>
                    </div>
                  </div>
                </Transition>

                <li
                  class="item-info_text"
                  :class="{ active: showDescr }"
                  @click="showDescr = !showDescr"
                >
                  ОПИСАНИЕ
                  <HeaderLangButton :class="{ activeImg: showDescr }" />
                </li>
                <Transition name="slide-fade">
                  <div class="spec_item" v-if="showDescr">
                    <p class="spec_description">
                      {{ currentItem.description }}
                    </p>
                  </div>
                </Transition>
                <li class="item-info_text">
                  ДОСТАВКА И ОПЛАТА <HeaderLangButton />
                </li>
                <li class="item-info_text">
                  ВОПРОСЫ И ОТВЕТЫ <HeaderLangButton />
                </li>
                <li class="item-info_text">ОТЗЫВЫ <HeaderLangButton /></li>
              </ul>
            </div>
            <!-- <div class="popular_items_block"> -->
            <!-- <div class="popular_items_title">ЧАСТО ПОКУПАЮТ</div> -->
            <!-- <ul class="popular_items_list"> -->
            <!-- <li v-for="item in this.popularItemsArray" :key="item.id"> -->
            <!-- <router-link -->
            <!-- style=" -->
            <!-- /* text-decoration: none; */ /* color: inherit; */ /* text-align:
            center; */ /* " */ -->
            <!-- v-if="item" -->
            <!-- :to="{ path: '/catalog/' + item.id }" -->
            <!-- > -->
            <!-- <div class="popular_item_image"></div> -->
            <!-- <div class="popular_item_name"> -->
            <!-- {{ item.commonName }} -->
            <!-- </div> -->
            <!-- </router-link> -->
            <!-- </li> -->
            <!-- </ul> -->
            <!-- </div> -->
          </div>
          <div class="item-main_price_block">
            <div class="item-main_price_menu">
              <div class="item_cas item_text">
                <div class="name_info_top_items">
                  <p class="name_info_text">CAS</p>
                  <div class="top_item_info_svg">
                    <CatalogItemPropertiesSvg />
                  </div>
                </div>
                <p class="name_info_description">
                  {{ currentItem.casNumbers?.join(" ") }}
                </p>
                <div class="name_info_bottom_items">
                  <div class="bottom_item_info_svg">
                    <CatalogItemPropertiesSvg />
                  </div>
                  <div class="copy_button_svg">
                    <CopySvgButton />
                  </div>
                </div>
              </div>
              <div class="item_cas item_text">
                <!-- <div class="name_info_top_items"> -->
                <!-- <p class="name_info_text">ФОРМУЛА</p> -->
                <!-- <div class="top_item_info_svg"> -->
                <!-- <CatalogItemPropertiesSvg /> -->
                <!-- </div> -->
                <!-- </div> -->
                <!-- <div class="name_info_description" v-if="currentItem?.formula"> -->
                <!-- <div v-html="clearFormula(currentItem?.formula)"></div> -->
                <!-- </div> -->
                <!-- <div class="name_info_bottom_items"> -->
                <!-- <div class="bottom_item_info_svg"> -->
                <!-- <CatalogItemPropertiesSvg /> -->
                <!-- </div> -->
                <!-- <div class="copy_button_svg">
                    <CopySvgButton />
                  </div> -->
                <!-- </div> -->
              </div>
              <div class="item_buy-menu">
                <div class="item_buy-menu_content">
                  <div class="item_buy-menu_top">
                    <StatisticsSvgButton />
                    <p
                      class="status_buy-menu_top"
                      :style="{ background: types.orderOnly.bg }"
                    >
                      {{ types.orderOnly.title }}
                    </p>
                    <HeartIcon />
                  </div>
                  <div class="item_buy-menu_bottom">
                    <p class="item_current_price">
                      {{
                        currentItem?.price *
                        currentItemAmount *
                        currentItemValue
                      }}
                      <span class="green-text">$</span>
                    </p>

                    <button
                      v-if="isLoggedIn && !inTheCart"
                      type="button"
                      class="item_buy_button"
                      @click="setItemToCartMethod(currentItem?.id)"
                      id="toCart"
                    >
                      В КОРЗИНУ
                    </button>

                    <button
                      v-else-if="isLoggedIn && inTheCart"
                      type="button"
                      class="item_buy_button changed"
                      id="toCart"
                      @click="this.$router.push('/basket')"
                    >
                      В КОРЗИНE
                    </button>

                    <button
                      v-else-if="!isLoggedIn"
                      type="button"
                      class="item_buy_button"
                      @click="openRegistration()"
                    >
                      В КОРЗИНУ
                    </button>

                    <RegistrationMenu v-model:show="dialogVisible" />

                    <div class="item_bottom_bonus-text_block">
                      <p class="item_bottom_bonus-text">
                        если на вашем аккаунте есть
                        <span class="blue-text">бонусы</span>, вы сможете
                        списать их в корзине
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationMenu from "@/components/RegistrationMenu.vue";
import { mapActions } from "vuex";
import {
  StatisticsSvgButton,
  CopySvgButton,
  CatalogItemPropertiesSvg,
  HeaderLangButton,
  HeartIcon,
} from "@/components/UI";
export default {
  name: "CatalogItem",
  data() {
    let currentItemAmount = 1;
    let currentItemSystem = "КГ";
    var currentItemValue = 1;
    const dialogVisible = false;
    const showSpec = false;
    const intoCart = false;
    const showDescr = false;

    const types = {
      aLotOfItems: {
        title: "МНОГО В НАЛИЧИИ",
        bg: "rgba(20, 216, 181, 0.10)",
      },
      fewOfItems: {
        title: "МАЛО В НАЛИЧИИ",
        bg: "rgba(216, 126, 20, 0.10)",
      },
      onStock: {
        title: "НА СКЛАДЕ",
        bg: "rgba(216, 197, 20, 0.10)",
      },
      orderOnly: {
        title: "ПОД ЗАКАЗ",
        bg: "rgba(60, 20, 216, 0.10)",
      },
      outOfStock: {
        title: "НЕТ В НАЛИЧИИ",
        bg: "rgba(216, 20, 20, 0.10)",
      },
      comingSoon: {
        title: "СКОРО ПОЯВИТСЯ",
        bg: "rgba(20, 87, 216, 0.10);",
      },
    };
    return {
      types,
      currentItemAmount,
      currentItemSystem,
      currentItemValue,
      dialogVisible,
      showSpec,
      intoCart,
      showDescr,
    };
  },
  methods: {
    ...mapActions([
      "getAllItemsRequest",
      "setItemToCart",
      "getPopularItemsRequest",
      "getBasketAllItemsRequest",
      "getCurrentItemRequest",
    ]),

    openRegistration() {
      this.dialogVisible = true;
    },

    deleteAllBackSlashesMain(str) {
      let cleanedStr = str.replace(/\\/g, "");
      var cleanedStrElems = cleanedStr.split(/\s+/);
      var width = window.innerWidth;
      cleanedStrElems[1] = `width="${width / 8}"`;
      cleanedStrElems[17] = `height="${width / 8}"`;

      cleanedStr = cleanedStrElems.join(" ");
      return cleanedStr;
    },

    deleteAllBackSlashesPopular(str) {
      let cleanedStr = str.replace(/\\/g, "");
      var cleanedStrElems = cleanedStr.split(/\s+/);
      var width = window.innerWidth;
      cleanedStrElems[1] = `width="${width / 10}"`;
      cleanedStrElems[17] = `height="${width / 10}"`;

      cleanedStr = cleanedStrElems.join(" ");
      return cleanedStr;
    },

    clearFormula(str) {
      let cleanedFormula = str.replaceAll("_{", "<sub>");
      cleanedFormula = cleanedFormula.replaceAll("}", "</sub>");
      return cleanedFormula;
    },

    openForm() {
      this.dialogVisible = true;
    },

    plusValue() {
      if (this.currentItemAmount) {
        this.currentItemAmount = parseInt(this.currentItemAmount) + 1;
      } else {
        this.currentItemAmount = 1;
      }
    },

    minusValue() {
      if (this.currentItemAmount > 0) {
        this.currentItemAmount = parseInt(this.currentItemAmount) - 1;
      }
    },
    setItemToCartMethod(id) {
      let toCartButton = document.getElementById("toCart");

      this.setItemToCart({ id: id }).then((resp) => {
        if (resp.status == 200) {
          toCartButton.classList.add("changed");
          toCartButton.textContent = "В КОРЗИНЕ";
          this.getBasketAllItemsRequest();
        }
      });
    },
  },

  computed: {
    currentItem() {
      const currentItem = this.$store.getters.getCurrentItem;
      console.log(currentItem);
      return currentItem;
    },

    inTheCart() {
      const currentItem = this.$store.getters.getBasketAllItems?.find(
        (item) => item.orderDTO.productDTO.id == this.$route.params.id
      );
      if (currentItem) {
        return true;
      } else {
        return false;
      }
    },

    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    this.getCurrentItemRequest(this.$route.params.id);
    if (this.isLoggedIn) {
      this.getBasketAllItemsRequest();
    }
  },
  watch: {
    currentItemSystem() {
      if (this.currentItemSystem == "КГ") {
        this.currentItemValue = 1;
      } else {
        this.currentItemValue = 0.001;
      }
    },
  },
  components: {
    HeaderLangButton,
    CatalogItemPropertiesSvg,
    CopySvgButton,
    StatisticsSvgButton,
    HeartIcon,
    RegistrationMenu,
  },
};
</script>

<style lang="scss" scoped>
.item_image_block {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_image {
  height: auto;
  width: 300px;
}
.spec_name {
  color: #808080;
}
.item-info_specification {
  font-size: 16px;
}
.spec_item {
  border-bottom: 1px solid #14d8b5;
}
.spec_description {
  max-width: 300px;
}

.popular_item_name {
  font-size: 16px;
  font-weight: 500;
}

select {
  display: flex;
  justify-content: space-between;
  background-image: url("../components/UI/icons/ArrowDown.png");
  background-position: 90% 50%;
  color: var(--black-base, #2c2c2c);
  font-size: 20px;
  font-weight: 550;
  line-height: 22px; /* 137.5% */
  text-transform: uppercase;
  width: 200px;
  padding: 10px 0 10px 20px;
}

.item_amount_value_choice {
  margin-top: 20px;

  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid var(--gray-UI, #cdcdcd);
}
.item_bottom_bonus-text_block {
  display: flex;
  justify-content: center;
  max-width: 200px;
  margin-bottom: 30px;
}
.item_bottom_bonus-text {
  color: var(--gray-heavy, #808080);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  span {
    color: var(--Blue, #216ee3);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}
.item_buy_button {
  color: var(--gray-bg, #f7f7f7);
  text-align: center;
  font-size: 16px;
  font-weight: 550;
  letter-spacing: 0.32px;
  text-transform: uppercase;
  padding: 20px 80px;
  border-radius: 64px;
  background: var(--Base, #14d8b5);
  margin-bottom: 50px;
}
.amount {
  width: 110px;
  height: 32px;
  padding: 30px;
  margin: 0 20px;
  outline: none;
  text-align: center;
}
.item_current_amount {
  margin: 150px 0 30px 0;
  border-radius: 4px;
  border: 1px solid var(--gray-UI, #cdcdcd);
  width: 50%;
  font-size: 30px;
}

.item_buy-menu_bottom {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.item_current_price {
  margin: 0 0 50px 0;
  font-size: 32px;
  font-weight: 550;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: center;
}
.green-text {
  color: #14d8b5;
}
.status_buy-menu_top {
  color: var(--gray-heavy, #808080);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  padding: 20px 60px;
}

.item_buy-menu {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--gray-UI, #cdcdcd);
}
.item_buy-menu_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.copy_button_svg {
  margin: 0 10px 0 0;
}
.name_info_bottom_items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.name_info_top_items {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.name_info_description {
  text-align: center;
  color: var(--black-base, #2c2c2c);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
}
.top_item_info_svg {
  transform: rotate(180deg);
  display: flex;
  object-position: right top;
}
.name_info_text {
  text-align: left;
  color: var(--gray-heavy, #808080);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
}
.item_text {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.name_info {
  width: 100%;
  text-align: left;
}
.item-main_price_menu {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-main_price_block {
  display: flex;
  justify-content: center;
  width: 40%;
}
.item-main_info {
  display: flex;
  flex-direction: column;
  width: 60%;
}
.item-page_information {
  display: flex;
  flex-direction: row;
}
.popular_item_img {
  width: 100%;
  height: 105%;
}
.popular_items_list {
  margin: 20px 0 0 0;
  display: flex;
  gap: 8px;
}
.popular_items_title {
  color: var(--black-base, #2c2c2c);
  font-size: 12px;
  font-style: normal;
  font-weight: 550;
  line-height: 14px; /* 116.667% */
  letter-spacing: 0.24px;
}
ul {
  list-style-type: none;
}
.item-info_block {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 134px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
.item-info_text {
  cursor: pointer;
  display: flex;
  color: var(--gray-heavy, #808080);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 131.25% */
  display: flex;
  justify-content: space-between;
  padding: 16px 0px 20px 0px;
  align-items: center;
  gap: 8px;
  width: 300px;
  border-bottom: 1px solid var(--gray-UI, #cdcdcd);
}
.item-info_list {
  display: flex;
  list-style-type: none;
  flex-direction: column;
}
.item-page_content {
  margin: 16px;
  width: 90%;
}
.item_title {
  color: var(--black-base, #2c2c2c);
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 64px; /* 133.333% */
  letter-spacing: -0.96px;
  margin-bottom: 100px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-page_links {
  margin-bottom: 42px;
  justify-content: left;
  display: flex;
}
.pages_link {
  color: var(--gray-heavy, #808080);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 114.286% */
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 64px;
  border: 1px solid var(--gray-UI, #cdcdcd);
}
.pages_link:not(:last-child) {
  margin-right: 8px;
}
.active {
  color: #14d8b5;
  border-bottom: 1px solid var(--gray-UI, #14d8b5);
  transition: 0.3s;
}
.activeImg {
  transform: rotateX(180deg);
  transition: 0.5s;
}
.changed {
  background: #e0fff9;
  color: #14d8b5;
}
</style>
