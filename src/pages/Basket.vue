<template>
  <div class="basket_block">
    <div class="basket_block_content">
      <div class="basket_pointers">
        <router-link to="/">
          <button type="button" class="basket_pointer">
            главная
          </button></router-link
        ><router-link to="/catalog">
          <button type="button" class="basket_pointer">
            каталог
          </button></router-link
        ><button type="button" class="basket_pointer green_bttn">
          корзина
        </button>
      </div>
      <div class="basket_items_header">Оформление заказа</div>
      <div class="basket_items_list">
        <div class="basket_items">
          <div
            class="basket_item"
            v-for="item in this.$store.getters?.getBasketAllItems"
            :key="item.orderDTO.productDTO.id"
          >
            <div
              class="basket_img"
              v-if="item.orderDTO.productDTO?.image"
              v-html="item.orderDTO.productDTO?.image"
            ></div>
            <div class="basket_item_info" v-if="item.orderDTO.productDTO">
              <div class="item_info_content">
                <div class="item_text_info">
                  <p class="item_articule">
                    <span class="item_articule_text">артикул : </span
                    >{{ item.orderDTO.productDTO.id }}
                  </p>
                  <p class="item_name">
                    {{ item.orderDTO.productDTO.commonName }}
                  </p>
                </div>
                <div class="item_quantity_buttons">
                  <div class="item_quantity">
                    <div class="item_quantity_value">
                      <div class="item_quantity_header">Фасовка</div>
                      <div class="item_quantity_value_choice">
                        <select
                          name="value_amount"
                          id=""
                          class="value_amount"
                          v-model="item.orderDTO.units"
                          @change="
                            setItemUnitsMethod(
                              item.orderDTO.productDTO.id,
                              item.orderDTO.units
                            )
                          "
                        >
                          <option value="КГ">КГ</option>
                          <option value="ГРАММ">ГРАММ</option>
                          <option value="ЛИТР">ЛИТР</option>
                          <option value="МЛ">МЛ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="item_quantity">
                    <div class="item_quantity_header">Количество</div>
                    <div class="item_quantity_amount">
                      <button
                        type="button"
                        class="minus"
                        id="plus"
                        @click="
                          console.log(item);
                          if (item.orderDTO.productCount > 1) {
                            setItemAmountMethod(
                              item.orderDTO.productDTO.id,
                              parseInt(item.orderDTO.productCount) - 1
                            );
                            item.orderDTO.productCount =
                              parseInt(item.orderDTO.productCount) - 1;
                          }
                        "
                      >
                        -
                      </button>
                      <input
                        type="text"
                        :placeholder="item?.count"
                        id="item_amount"
                        class="amount"
                        v-model="item.orderDTO.productCount"
                        @input="checkItemCount(item)"
                      />
                      <button
                        class="plus"
                        id="plus"
                        type="button"
                        @click="
                          setItemAmountMethod(
                            item.orderDTO.productDTO.id,
                            parseInt(item.orderDTO.productCount) + 1
                          );
                          item.orderDTO.productCount =
                            parseInt(item.orderDTO.productCount) + 1;
                        "
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item_price">
                <CloseIcon
                  class="basket_close_icon"
                  @click="deleteItemFromCartMethod(item.orderDTO.productDTO.id)"
                  style="cursor: pointer"
                />
                <p class="item_current_price">
                  {{
                    setItemPrice(
                      item?.orderDTO.productDTO.price *
                        item.orderDTO.productCount *
                        checkItemAmount(item.orderDTO.units)
                    )
                  }}
                  <span class="green-text">$</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="basket_current_price">
          <div class="basket_price_header">Оформление заказа</div>
          <div class="basket_final_price">
            <p class="final_price_text">ИТОГО :</p>
            <p class="final_price_text">
              {{ checkItemsPrice() }} <span class="green-text">$</span>
            </p>
          </div>
          <button
            class="final_price_bttn"
            type="button"
            @click="dialogVisible = !dialogVisible"
          >
            ОФОРМИТЬ
          </button>
          <DialogMenu
            v-model:show="dialogVisible"
            :totalPrice="checkItemsPrice()"
          />
          <p class="final_price_subtext">
            если на вашем аккаунте есть <span class="blue_text">бонусы</span>,
            вы сможете списать их в корзине
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DialogMenu from "@/components/DialogMenu.vue";
import CloseIcon from "@/components/UI/icons/CloseIcon.vue";
export default {
  name: "BasketPage",
  data: () => ({ dialogVisible: false }),
  methods: {
    ...mapActions([
      "getBasketAllItemsRequest",
      "setItemAmount",
      "deleteItemFromCart",
      "setItemUnits",
    ]),
    setItemAmountMethod(id, count) {
      const countt = parseInt(count);
      this.setItemAmount({ id: id, count: countt });
    },

    setItemPrice(value) {
      if (value % 1 > 0) {
        return value.toFixed(3);
      } else {
        return value;
      }
    },

    setItemUnitsMethod(id, units) {
      const unitss = units;
      this.setItemUnits({ id: id, units: unitss });
    },

    checkItemCount(item) {
      if (item.orderDTO.productCount == "") {
        return;
      }
      if (item.count > 0) {
        this.setItemAmountMethod(
          item.orderDTO.productDTO.id,
          item.orderDTO.productCount
        );
      } else {
        item.count = 1;
        this.setItemAmountMethod(
          item.orderDTO.productDTO.id,
          item.orderDTO.productCount
        );
      }
    },
    checkItemsPrice() {
      let totalPrice = 0;
      let basketItems = this.$store.getters?.getBasketAllItems;
      for (let i = 0; i < basketItems.length; i++) {
        totalPrice +=
          basketItems[i].orderDTO.productDTO.price *
          basketItems[i].orderDTO.productCount *
          this.checkItemAmount(basketItems[i].orderDTO.units);
      }
      return this.setItemPrice(totalPrice);
    },
    deleteItemFromCartMethod(id) {
      this.deleteItemFromCart({ id: id });
    },

    checkItemAmount(str) {
      if (str == "КГ" || str == "ЛИТР") {
        return 1;
      }
      if (str == "ГРАММ" || str == "МЛ") {
        return 0.001;
      }
    },
  },
  components: { CloseIcon, DialogMenu },
  mounted() {
    this.getBasketAllItemsRequest();
  },
};
</script>

<style lang="scss" scoped>
.final_price_subtext {
  width: 40%;
  align-self: center;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #808080;
  span {
    color: #216ee3;
  }
}
.final_price_bttn {
  margin: 50px 0 20px 0;
  padding: 15px 25px;
  background: #14d8b5;
  width: 50%;
  align-self: center;
  border-radius: 64px;
  font-size: 16px;
  color: #f7f7f7;
}
.basket_final_price {
  display: flex;
  justify-content: space-between;
  width: 65%;
  align-self: center;
  margin-top: 50px;
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: 2%;
}
.final_price_text {
  transition: 0.3s ease;
  .green-text {
    color: #14d8b5;
  }
}
.basket_price_header {
  display: flex;
  justify-content: center;
  border: none;
  border-radius: 4px 4px 0 0;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  padding: 20px 0;
  background: #f7f7f7;
  color: #808080;
}
.basket_current_price {
  width: 35%;
  display: flex;
  flex-direction: column;
  max-height: 350px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
}
.item_current_price {
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: -2%;
  margin: 10px 20px 0 0;
  .green-text {
    color: #14d8b5;
  }
}
.item_quantity_header {
  color: #808080;
  font-size: 16px;
}
.item_name {
  margin-top: 10px;
  font-weight: 700;
  color: #2c2c2c;
  font-size: 24px;
  line-height: 24px;
}
.item_articule {
  font-weight: 400;
  font-size: 16px;
  line-height: 12px;
  color: #2c2c2c;
  .item_articule_text {
    color: #808080;
  }
}
.item_info_content {
  margin: 0px 0px 0px 20px;
}
.item_quantity_value_choice {
  width: 120px;
  .value_amount {
    padding: 16px 30px;
    outline: none;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    background-image: url("../components/UI/icons/ArrowDown.png");
    background-position: 90% 50%;
  }
}
.item_quantity_amount {
  width: 180px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #cdcdcd;
  button {
    font-size: 35px;
    font-weight: 400;
    color: #cdcdcd;
  }
  .plus {
    margin: 0 10px 5px 0;
  }
  .minus {
    margin: 0 0 5px 10px;
  }
}
.item_quantity {
  margin: 0 20px 0 0;
  .amount {
    width: 100px;
    padding: 10px 30px;
    outline: none;
    text-align: center;
    font-size: 18px;
  }
}
.item_quantity_buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.item_info_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.basket_pointers {
  margin: 20px 0 50px 0;
}
.basket_pointer {
  margin: 0 10px 0 0;
  border: 1px solid #cdcdcd;
  padding: 5px 20px;
  border-radius: 64px;
  color: #808080;
  font-size: 14px;
}
.basket_items_header {
  font-family: Helvetica;
  font-size: 48px;
  font-weight: 400;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0 0 40px 0;
}
.basket_items {
  display: flex;
  flex-direction: column;
  width: 55%;
}
.basket_item_info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.basket_item {
  display: flex;
  justify-content: space-between;
  margin: 0 0 40px 0;
  padding: 10px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
}
.basket_close_icon {
  display: flex;
  justify-content: right;
  svg {
    object-position: 0% 100px;
  }
}
.basket_items_list {
  display: flex;
  justify-content: space-between;
}
.basket_block {
  display: flex;
  align-items: center;
  justify-content: center;
}
.basket_block_content {
  display: flex;
  width: 90%;
  flex-direction: column;
}
.basket_img {
  svg {
    width: 180px;
    height: 180px;
  }
}
.basket_pointers {
  .green_bttn {
    border: #14d8b5 1px solid;
  }
}
</style>
