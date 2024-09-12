<template>
  <div class="admin_panel_block">
    <div class="admin_panel_content">
      <div class="admin_panel_header">Панель разработчика</div>
      <div class="admin_panel_func">
        <div class="items_list">
          <div
            class="item"
            v-for="item in this.$store.getters.getAdminProductsList"
            :key="item.id"
          >
            <div class="item_info_block">
              <div class="item_image" v-if="item.image">ок</div>
              <div class="item_image" v-else>
                <img src="/icons/mockupIcon.png" />
              </div>
              <div class="item_info" v-if="item.companyDTO">
                <span class="item_info_name">Компания: </span>
                {{ item.companyDTO.name }}
              </div>
              <div class="item_info" v-if="item.smiles">
                <span class="item_info_name">smiles:</span> {{ item.smiles }}
              </div>
              <div
                class="item_info"
                v-if="item.commonName && item.russianCommonName"
              >
                <span class="item_info_name">Название: </span>
                {{ item.commonName + ", " + item.russianCommonName }}
              </div>
              <div class="item_info" v-if="item.inchi">
                <span class="item_info_name">inchi:</span> {{ item.inchi }}
              </div>
              <div class="item_info" v-if="item.subsubcategoryDTO">
                <span class="item_info_name">Категория:</span>
                {{ item.subsubcategoryDTO.russianName }}
              </div>
              <div class="item_info" v-if="item.molecularWeight">
                <span class="item_info_name">Молекулярный вес:</span>
                {{ item.molecularWeight }}
              </div>
              <div class="item_info" v-if="item.price">
                <span class="item_info_name">Цена:</span> {{ item.price }}
              </div>
              <div class="item_info" v-if="item.casNumbers">
                <span class="item_info_name">CAS: </span>
                {{ item.casNumbers.join() }}
              </div>
              <div class="item_info" v-if="item.description">
                <span class="item_info_name">Описание:</span>
                {{ item.description }}
              </div>
            </div>
            <div class="confirm_buttons">
              <ConfirmIcon
                @click="confirmMethod({ id: item.id })"
              /><RejectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { RejectButton, ConfirmIcon } from "@/components/UI";

export default {
  methods: {
    ...mapActions(["getAdminProductsListRequest", "confirmProductRequest"]),
    confirmMethod({ id }) {
      this.confirmProductRequest({ id: id });
    },
  },
  data() {},
  name: "AdminPanel",
  mounted() {
    this.getAdminProductsListRequest();
  },
  components: { RejectButton, ConfirmIcon },
};
</script>

<style lang="scss" scoped>
.item_info {
  color: gray;
  font-size: 14px;
  .item_info_name {
    color: black;
    font-weight: 500;
  }
}
.confirm_buttons {
  display: flex;
  padding: 20px;
  justify-content: space-around;
  svg {
    width: 30px;
    height: 30px;
    fill: black;
    transition: 0.3s;
    cursor: pointer;
  }
  svg:hover {
    transform: scale(1.2);
  }
}
.admin_panel_block {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.admin_panel_content {
  display: flex;
  flex-direction: column;
  width: 90%;
}
.admin_panel_header {
  margin: 30px 50px 30px 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.02em;
  text-align: left;
}
.items_list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: flex;
  width: 24%;
  min-width: 270px;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  background-color: #ffffff;
  fill: #ffffff;
  transition-duration: 0.5s;
  margin: 10px 10px 20px 0;
  img {
    max-width: 95%;
  }
}
</style>
