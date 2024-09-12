<template>
  <div class="items_block">
    <div class="items_content">
      <div class="items_pointers">
        <router-link to="/">
          <button type="button" class="basket_pointer">
            главная
          </button></router-link
        ><router-link to="/catalog">
          <button type="button" class="basket_pointer">
            каталог
          </button></router-link
        >
      </div>
      <div class="item_list_main-category">
        {{
          this.$store.getters.getProductsList[0]?.subsubcategoryDTO.russianName
        }}
      </div>
      <div class="items_list_block">
        <div class="items_list">
          <div
            class="item"
            v-for="item in this.$store.getters.getProductsList"
            :key="item.id"
          >
            <router-link
              style="
                transition: 0.5s;
                color: inherit;
                text-decoration: none;
                max-height: 350px;
                overflow: hidden;
              "
              :class="{ moreMain: showDescription == true }"
              :to="'/catalog/product/' + item.id"
            >
              <img v-if="item.image" :src="item.image" class="item_image" />
              <img v-else src="/icons/mockupIcon.png" class="item_image" />
              <Transition
                name="slide-fade"
                :class="{ more: showDescription == true }"
              >
                <div class="item_info">
                  <div class="item_company">{{ item.companyDTO.name }}</div>
                  <div class="item_name">{{ item?.commonName }}</div>
                  <div class="item_cas">
                    <span class="name_characteristics">CAS number:</span>
                    {{ item?.casNumbers.join() }}
                  </div>

                  <div class="item_description">
                    {{ item?.description }}
                  </div>
                </div>
              </Transition>
            </router-link>
            <div class="bottom_buttons">
              <div
                class="more_icon"
                :class="{ reverse: showDescription == true }"
                @click="showDescription = !showDescription"
              >
                <MoreIconSvg />
              </div>
              <router-link
                style="color: inherit; text-decoration: none"
                class="bottom_button"
                :to="'/catalog/product/' + item.id"
                ><button type="button">Подробнее</button></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { MoreIconSvg } from "../components/UI";

export default {
  name: "CatalogItems",
  components: { MoreIconSvg },
  data() {
    return { showDescription: false };
  },

  methods: {
    ...mapActions(["getProductsListRequest"]),
    getItems() {
      this.getProductsListRequest({
        name: this.$route.params.category,
      });
    },
  },

  mounted() {
    this.getItems();
  },
};
</script>

<style lang="scss" scoped>
.items_list {
  display: flex;
  flex-wrap: wrap;
}

.bottom_buttons {
  display: flex;
  gap: 12px;
  padding: 20px 0;
  align-items: center;
  transition: 0.5s;
  box-shadow: 0px -4px 8px 0px rgba(34, 60, 80, 0.2);
  svg {
    margin-left: 10px;
    transition: 0.5s;
    transform: rotate(90deg);
  }
  .bottom_button {
    width: 75%;
    display: flex;
    justify-content: center;
    padding: 5px 10px;
    background: #efefef;
    border-radius: 4px;
    transition: 0.5s;
  }
}

.item:hover {
  .bottom_buttons {
    background-color: #efefef;
    .bottom_button {
      background: #ffffff;
    }
    .more_icon {
      background: #ffffff;
    }
  }
}
.bottom_buttons:hover {
  background-color: #efefef;
  .bottom_button {
    background: #ffffff;
  }
  .more_icon {
    background: #ffffff;
  }
}

.item_description {
  color: gray;
  font-size: 14px;
}

.name_characteristics {
  font-weight: 500;
}

.item_info {
  padding-left: 5px;
  overflow: hidden;
  max-height: 150px;
  transition: 0.5s;
  min-height: 200px;
}

.item_company {
  color: gray;
  font-size: 14px;
  padding: 5px 0;
}

.item_cas {
  color: gray;
  font-size: 14px;
  padding: 5px 0;
}

.item_name {
  color: #222c2e;
  font-style: normal;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 0;
}

.item {
  display: flex;
  width: 24%;
  min-width: 270px;
  flex-direction: column;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background-color: #ffffff;
  fill: #ffffff;
  transition-duration: 0.5s;
  margin: 10px 10px 20px 0;
}

.item_image {
  min-width: 100px;
  max-width: 100%;
  border-radius: 4px 4px 0 0;
}

.more_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 10px 15px 10px 5px;
  background: #efefef;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s;
}
.reverse {
  transform: rotate(180deg);
}

.item_list_main-category {
  display: flex;
  width: 100%;
  border-top: 1px solid #cdcdcd;
  font-size: 48px;
  font-weight: 700;
  line-height: 64px;
  letter-spacing: -0.02em;
  margin: 0 0 20px 0;
}

.items_pointers {
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
.items_block {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.items_content {
  display: flex;
  width: 90%;
  flex-direction: column;
}
.more {
  max-height: 200px;
}
.moreMain {
  max-height: 500px !important;
}
</style>
