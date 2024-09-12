<template>
  <div class="user_profile_block" v-if="isLoggedIn">
    <div class="user_profile_block_content">
      <div class="account_menu_block">
        <div class="account_menu">
          <div
            class="user_company_name"
            v-if="this.$store.getters.getUserInfo?.companyDTO?.name"
          >
            <CompanySvg />{{ this.$store.getters.getUserInfo?.companyDTO.name }}
          </div>
          <div class="user_company_name menu_item_name" v-else>
            <CompanySvg /> Не задано
          </div>
          <div class="my_profile">
            <p
              class="menu_item_name"
              :class="{ active: profile }"
              @click="settingsMenu"
            >
              Настройки <MoreIconSvg />
            </p>
            <transition name="slide-fade">
              <div class="my_procurements_list" v-if="!procurements && profile">
                <div
                  class="procurement"
                  @click="this.$router.push('/user-profile/profile')"
                >
                  Мой профиль
                </div>
                <div class="procurement">Пользователи</div>
              </div>
            </transition>
          </div>
          <div class="my_procurements">
            <p
              class="menu_item_name"
              :class="{ active: procurements }"
              @click="procurementsMenu"
            >
              My procurements
              <MoreIconSvg />
            </p>
            <transition name="slide-fade">
              <div class="my_procurements_list" v-if="!profile && procurements">
                <div class="procurement">Sample Requests</div>
                <div class="procurement">Document Requests</div>
                <div class="procurement">RFQs</div>
                <div class="procurement">Quotes</div>
                <div class="procurement">Orders</div>
              </div>
            </transition>
          </div>
          <div class="my_products">
            <p
              class="menu_item_name"
              :class="{ active: products }"
              @click="productsMenu"
            >
              Мои продукты
              <MoreIconSvg />
            </p>
            <transition name="slide-fade">
              <div
                class="my_procurements_list"
                v-if="!profile && !procurements && products"
              >
                <div
                  class="procurement"
                  @click="this.$router.push('/user-profile/products')"
                >
                  Мои продукты
                </div>
                <div
                  class="procurement"
                  @click="this.$router.push('/user-profile/new-product')"
                >
                  Создать продукт
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div
        class="current_menu"
        v-if="this.$route.params.currentComponent == 'products'"
      >
        <div class="current_menu_header">Мои продукты</div>
        <div class="current_menu_block">
          <div class="current_menu_content">
            <div
              class="current_menu_info"
              v-for="item in this.$store.getters"
              :key="item"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="current_menu"
        v-if="
          this.$route.params.currentComponent == 'new-product' &&
          this.$store.getters.getUserInfo?.companyDTO?.name
        "
      >
        <div class="current_menu_header">Создать продукт</div>
        <div class="current_menu_block">
          <div class="current_menu_content">
            <div class="current_menu_info">
              <div class="menu_header">Заполните поля ниже</div>
              <div class="inputs_list">
                <div class="input_info">
                  <input
                    class="info_input"
                    type="text"
                    v-model="newItemCas"
                    @input="filterStr"
                    ref="CAS"
                  /><span class="input_placeholder">CAS</span>
                </div>
                <div class="input_info">
                  <input
                    class="info_input"
                    type="text"
                    v-model="newItemName"
                    ref="itemName"
                  /><span class="input_placeholder">Название продукта</span>
                </div>
                <div class="input_info">
                  <input
                    class="info_input"
                    type="text"
                    v-model="newItemFormula"
                    ref="itemFormula"
                  /><span class="input_placeholder">Формула</span>
                </div>
                <div class="input_info">
                  <input
                    class="info_input"
                    type="text"
                    v-model="newItemSmiles"
                    ref="itemSmiles"
                  /><span class="input_placeholder">SMILES</span>
                </div>
                <div class="input_info">
                  <input
                    class="info_input"
                    type="text"
                    v-model="newItemInchi"
                    ref="itemInchi"
                  /><span class="input_placeholder">Inchi</span>
                </div>
                <div class="input_info">
                  <input
                    class="info_input"
                    type="text"
                    @input="filterStr"
                    ref="itemMolecularWeight"
                    v-model="newItemMolecularWeight"
                  /><span class="input_placeholder">Молекулярный вес</span>
                </div>
                <div class="input_info">
                  <input
                    class="info_input"
                    type="text"
                    v-model="newItemPrice"
                    @input="filterStr"
                    ref="itemPrice"
                  /><span class="input_placeholder">Цена</span>
                </div>

                <div class="input_info">
                  <textarea
                    class="info_input"
                    type="text"
                    v-model="newItemDescription"
                    ref="itemDescription"
                    placeholder="Дополнительная информация для покупателя"
                  />
                  <span class="input_placeholder" v-if="!newItemDescription"
                    >Описание товара</span
                  >
                </div>
                <div
                  v-if="setProductCategory"
                  class="select_block"
                  ref="setCategory"
                  @click="setMainCategory = !setMainCategory"
                >
                  <MoreIconSvg
                    :class="{ rotate: setMainCategory }"
                    @click="setMainCategory = !setMainCategory"
                  />
                  <span class="input_placeholder"
                    >Категория вашего продукта</span
                  >
                  <span>{{ mainCategoryName }}</span>
                </div>

                <transition name="slide-fade">
                  <div
                    class="select_list"
                    name="select_list"
                    v-if="setMainCategory"
                  >
                    <div
                      class="select_item"
                      @click="
                        setNewProductCategory(
                          this.$store.getters.getUserInfo.categoryDTO
                            .commandName
                        )
                      "
                    >
                      {{
                        this.$store.getters.getUserInfo.categoryDTO.russianName
                      }}
                    </div>
                  </div>
                </transition>
                <div
                  v-if="setProductSubCategory"
                  ref="setCategory"
                  class="select_block"
                  @click="setSubCategory = !setSubCategory"
                >
                  <MoreIconSvg
                    :class="{ rotate: setSubCategory }"
                    @click="setSubCategory = !setSubCategory"
                  />
                  <span class="input_placeholder"
                    >Подкатегория вашего продукта</span
                  >
                  <span>{{ subCategoryName }}</span>
                </div>
                <transition name="slide-fade">
                  <div
                    class="select_list"
                    name="select_list"
                    v-if="setSubCategory"
                  >
                    <div
                      class="select_item"
                      v-for="item in this.$store.getters.getSubCategoriesList
                        .subcategoryDTOList"
                      :key="item.id"
                      @click="setNewProductSubCategory(item)"
                    >
                      {{ item.russianName }}
                    </div>
                  </div>
                </transition>
                <div
                  v-if="
                    setProductSubSubCategory &&
                    this.$store.getters.getSubSubCategoriesList
                      .subsubcategoryDTOList?.length > 0
                  "
                  ref="setCategory"
                  class="select_block"
                  @click="setSubSubCategory = !setSubSubCategory"
                >
                  <MoreIconSvg
                    :class="{ rotate: setSubSubCategory }"
                    @click="setSubSubCategory = !setSubSubCategory"
                  />
                  <span class="input_placeholder"
                    >Подподкатегория вашего продукта</span
                  >
                  <span>{{ subSubCategoryName }}</span>
                </div>
                <transition name="slide-fade">
                  <div
                    class="select_list"
                    name="select_list"
                    v-if="setSubSubCategory"
                  >
                    <div
                      class="select_item"
                      v-for="item in this.$store.getters.getSubSubCategoriesList
                        .subsubcategoryDTOList"
                      :key="item.id"
                      @click="setNewProductSubSubCategory(item)"
                    >
                      {{ item.russianName }}
                    </div>
                  </div>
                </transition>
                <button
                  class="save_button"
                  type="button"
                  @click="setNewProduct"
                  ref="saveButton"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="current_menu"
        v-else-if="
          this.$route.params.currentComponent == 'new-product' &&
          !this.$store.getters.getUserInfo?.companyDTO?.name
        "
      >
        <div class="current_menu_header">
          Заполните все важные поля в вашем профиле прежде чем приступить к
          добавлению товаров
        </div>
        <div class="current_menu_block">
          <div class="current_menu_content">
            <div class="current_menu_info"></div>
          </div>
        </div>
      </div>
      <div
        class="current_menu"
        v-if="this.$route.params.currentComponent == 'profile'"
      >
        <div class="current_menu_header">Мой профиль</div>
        <div class="current_menu_block">
          <div class="current_menu_content">
            <div class="current_menu_info">
              <div class="user_name_logo">
                <div
                  class="user_name_short"
                  v-if="this.$store.getters.getUserInfo"
                >
                  {{
                    this.$store.getters.getUserInfo?.firstName[0] +
                    this.$store.getters.getUserInfo?.lastName[0]
                  }}
                </div>
              </div>
              <div class="input_info">
                <input
                  @input="filterStr"
                  class="info_input"
                  type="text"
                  v-model="firstName"
                /><span class="input_placeholder">Имя</span>
              </div>
              <div class="input_info">
                <input
                  class="info_input"
                  type="text"
                  v-model="lastName"
                  @input="filterStr"
                /><span class="input_placeholder">Фамилия</span>
              </div>
              <div class="input_info">
                <input
                  class="info_input"
                  type="text"
                  disabled
                  v-model="userEmail"
                /><span class="input_placeholder">Email</span>
              </div>
              <div class="input_info">
                <input
                  class="info_input"
                  type="text"
                  v-model="userCompany"
                  disabled
                /><span class="input_placeholder">Компания</span>
              </div>
              <div
                class="select_block"
                @click="categorySelect = !categorySelect"
              >
                <MoreIconSvg
                  :class="{ rotate: categorySelect }"
                  @click="categorySelect = !categorySelect"
                />
                <span class="input_placeholder">Категория ваших продуктов</span>
                <span v-if="marketCategoryRus != null">{{
                  marketCategoryRus
                }}</span>
                <span v-else>Не задано</span>
              </div>
              <transition name="slide-fade">
                <div class="select_list" v-if="categorySelect">
                  <div
                    class="select_item"
                    v-for="item in this.$store.getters.getCategoriesList"
                    :key="item.id"
                    @click="changeMarketCategory(item)"
                  >
                    {{ item.russianName }}
                  </div>
                </div>
              </transition>
              <div class="input_info">
                <input
                  class="info_input"
                  type="text"
                  v-model="userJobTitle"
                  ref="jobTitle"
                /><span class="input_placeholder">Ваша должность</span>
              </div>

              <button
                class="save_button"
                type="button"
                @click="saveMethod"
                ref="saveButtonProfile"
              >
                Сохранить
              </button>
            </div>
            <div class="reset_menu">
              <div class="reset_menu_header">Восстановление пароля</div>
              <div class="input_info">
                <input
                  class="info_input"
                  type="password"
                  v-model="currentPassword"
                  ref="currentPassword"
                /><span class="input_placeholder">Ваш нынешний пароль </span>
                <ShowSvg
                  @click="
                    showCurrent = !showCurrent;
                    this.$refs.currentPassword.type = 'text';
                  "
                  v-if="!showCurrent"
                />
                <EyeSvg
                  v-else
                  @click="
                    showCurrent = !showCurrent;
                    this.$refs.currentPassword.type = 'password';
                  "
                />
              </div>
              <div class="input_info">
                <input
                  class="info_input"
                  type="password"
                  v-model="newPassword"
                  ref="newPassword"
                  @input="newPasswordCheck"
                /><span class="input_placeholder">Ваш новый пароль </span>
                <ShowSvg
                  @click="
                    showNew = !showNew;
                    this.$refs.newPassword.type = 'text';
                  "
                  v-if="!showNew"
                />
                <EyeSvg
                  v-else
                  @click="
                    showNew = !showNew;
                    this.$refs.newPassword.type = 'password';
                  "
                />
              </div>
              <div class="settings_block">
                <div class="setting_item">
                  <span
                    class="confirmation_text"
                    :class="{ confirmed: this.lenConfirmed }"
                    ><WarningSvg v-if="!lenConfirmed" /><ConfirmIcon v-else />
                    Длина пароля больше 8 символов
                  </span>
                </div>
                <div class="setting_item">
                  <span
                    class="confirmation_text"
                    :class="{ confirmed: this.numConfirmed }"
                    ><WarningSvg v-if="!numConfirmed" /><ConfirmIcon v-else />
                    Содержит минимум 1 цифру
                  </span>
                </div>
                <div class="setting_item">
                  <span
                    class="confirmation_text"
                    :class="{ confirmed: this.upperLowerConfirmed }"
                    ><WarningSvg v-if="!upperLowerConfirmed" /><ConfirmIcon
                      v-else
                    />
                    Содержит заглавные и строчные буквы
                  </span>
                </div>
                <button
                  class="save_button"
                  type="button"
                  @click="recoverPassword"
                  ref="saveButtonPassword"
                >
                  Восстановить
                </button>
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
import {
  MoreIconSvg,
  WarningSvg,
  ConfirmIcon,
  ShowSvg,
  EyeSvg,
  CompanySvg,
} from "@/components/UI";
export default {
  name: "UserProfile",
  data() {
    const phone = "";
    const procurements = false;
    const lastName = "";
    const profile = false;
    const component = this.$route.params.component;
    const userEmail = "";
    const userCompany = "";
    const marketCategoryRus = "";
    const userJobTitle = "";
    const firstName = "";
    const categorySelect = false;
    const marketCategoryId = 0;
    const marketCategoryName = "";
    const newPassword = "";
    let lenConfirmed = false;
    let numConfirmed = false;
    let upperLowerConfirmed = false;
    const products = false;

    //newItemMenu
    const mainCategoryName = "Не задано";
    const newItemName = "";
    const newItemFormula = "";
    const newItemSmiles = "";
    const newItemInchi = "";
    const newItemPrice = "";
    const newItemMolecularWeight = "";
    const newItemDescription = "";
    const newItemCas = "";
    const setProductCategory = true;
    const setSubCategory = false;
    const setMainCategory = false;
    const setProductSubCategory = false;
    const subCategoryName = "Не задано";
    const subSubCategoryName = "Не задано";
    const setSubSubCategory = false;
    const subSubCategory = {};
    const letSetNewItem = false;

    return {
      //newItemMenu
      newItemName,
      mainCategoryName,
      newItemMolecularWeight,
      newItemSmiles,
      newItemInchi,
      newItemPrice,
      newItemCas,
      newItemFormula,
      subSubCategory,
      subSubCategoryName,
      setSubSubCategory,
      setMainCategory,
      newItemDescription,
      setProductCategory,
      setProductSubCategory,
      setSubCategory,
      subCategoryName,
      letSetNewItem,
      //endNewItemMenu
      numConfirmed,
      upperLowerConfirmed,
      lenConfirmed,
      newPassword,
      lastName,
      isValid: false,
      marketCategoryRus,
      userEmail,
      bindProps: { placeholder: "Введите номер телефона" },
      userCompany,
      products,
      phone,
      procurements,
      profile,
      component,
      firstName,
      userJobTitle,
      categorySelect,
      marketCategoryId,
      marketCategoryName,
      showCurrent: false,
      showNew: false,
    };
  },
  methods: {
    ...mapActions([
      "getUserInfoRequest",
      "getSubCategoriesListRequest",
      "getCategoriesListRequest",
      "setUserInfoRequest",
      "getPasswordStatusRequest",
      "getSubSubCategoriesListRequest",
      "setNewItemRequest",
    ]),
    newPasswordCheck() {
      this.lenConfirmed = false;
      this.numConfirmed = false;
      this.upperLowerConfirmed = false;

      let numCheck = /\d/g;
      if (this.newPassword.length > 8) {
        this.lenConfirmed = true;
      }
      if (numCheck.test(this.newPassword)) {
        this.numConfirmed = true;
      }
      if (
        this.newPassword.toUpperCase() != this.newPassword &&
        this.newPassword.toLowerCase() != this.newPassword
      ) {
        this.upperLowerConfirmed = true;
      }
    },
    myProducts() {},
    setNewProductCategory(name) {
      this.setMainCategory = !this.setMainCategory;
      this.subCategoryName = "Не задано";
      this.subSubCategoryName = "Не задано";
      this.mainCategoryName =
        this.$store.getters.getUserInfo.categoryDTO.russianName;
      this.setProductSubCategory = true;
      this.getSubCategoriesListRequest({ name: name });
    },
    setNewProductSubCategory(item) {
      this.setSubCategory = !this.setSubCategory;
      this.subCategoryName = item.russianName;
      this.subSubCategoryName = "Не задано";
      this.setProductSubSubCategory = true;
      this.getSubSubCategoriesListRequest({ name: item.commandName });
      if (
        this.$store.getters.getSubSubCategoriesList.subsubcategoryDTOList
          .length == 0
      ) {
        this.subSubCategory = item;
        console.log(this.subSubCategory);
      }
    },
    setNewProductSubSubCategory(item) {
      console.log(item);
      this.setSubSubCategory = !this.setSubSubCategory;
      this.subSubCategoryName = item.russianName;
      this.subSubCategory = item;
    },
    recoverPassword() {
      if (this.numConfirmed && this.currentPassword != null) {
        this.getPasswordStatusRequest({
          password: this.currentPassword,
          newPassword: this.newPassword,
          email: this.userEmail,
        })
          .then((resp) => {
            if (resp.status == 200) {
              this.$refs.saveButtonPassword.classList.add("confirmed");
              this.$refs.saveButtonPassword.textContent = "Изменено";
            }
          })
          .catch((error) => {
            this.$refs.currentPassword.classList.add("redBorder");
            return error;
          });
      }
    },
    setNewProduct() {
      let listsWrong = document.querySelectorAll(".select_block");
      let itemsWrong = document.getElementsByClassName("info_input");
      this.letSetNewItem = true;
      const params = {
        commonName: this.newItemName,
        inchi: this.newItemInchi,
        molecularWeight: this.newItemMolecularWeight,
        price: this.newItemPrice,
        casNumbers: [this.newItemCas],
        description: this.newItemDescription,
        subsubcategoryDTO: this.subSubCategory,
      };
      if (
        this.mainCategoryName != null &&
        this.subCategoryName != null &&
        this.subSubCategoryName != null &&
        params.commonName &&
        params.inchi &&
        params.molecularWeight &&
        params.price &&
        params.casNumbers &&
        params.description &&
        params.subsubcategoryDTO?.name
      ) {
        for (let i = 0; i < itemsWrong.length; i++) {
          itemsWrong[i].classList.remove("redBorder");
        }
        this.setNewItemRequest({ params: params }).then((resp) => {
          if (resp.status == 200) {
            this.$refs.saveButton.classList.add("confirmed");
            this.$refs.saveButton.textContent = "Добавлено";
          }
        });
      } else {
        for (let i = 0; i < listsWrong.length; i++) {
          if (
            listsWrong[i].querySelector("span:not(.input_placeholder)")
              .textContent == "Не задано"
          ) {
            listsWrong[i].classList.add("redBorder");
          } else {
            listsWrong[i].classList.remove("redBorder");
          }
        }
        for (let i = 0; i < itemsWrong.length; i++) {
          if (itemsWrong[i].value) {
            itemsWrong[i].classList.remove("redBorder");
          } else {
            itemsWrong[i].classList.add("redBorder");
          }
        }
      }
    },
    settingsMenu() {
      this.profile = !this.profile;
      this.procurements = false;
      this.products = false;
    },
    filterStr() {
      if (this.lastName) {
        this.lastName = this.lastName.replace(/[^a-zа-яё\s]/gi, "");
      }
      if (this.newItemMolecularWeight) {
        this.newItemMolecularWeight = this.newItemMolecularWeight.match(/\d+/g);
        if (this.newItemMolecularWeight) {
          this.newItemMolecularWeight = this.newItemMolecularWeight.join("");
        }
      }
      if (this.newItemPrice) {
        this.newItemPrice = this.newItemPrice.match(/\d+/g);
        if (this.newItemPrice) {
          this.newItemPrice = this.newItemPrice.join("");
        }
      }
      if (this.firstName) {
        this.firstName = this.firstName.replace(/[^a-zа-яё\s]/gi, "");
      }
    },
    saveMethod() {
      if (this.userJobTitle != null) {
        this.$refs.jobTitle.classList.remove("redBorder");

        this.setUserInfoRequest({
          firstName: this.firstName,
          lastName: this.lastName,
          jobPosition: this.userJobTitle,
          phone: this.phone,
          categoryDTO: {
            id: this.marketCategoryId,
            name: this.marketCategoryName,
            russianName: this.marketCategoryRus,
          },
        }).then((response) => {
          if (response.status == 200) {
            this.$refs.saveButtonProfile.classList.add("confirmed");
            this.$refs.saveButtonProfile.textContent = "Сохранено";
          }
        });
      } else {
        if (this.isValid) {
          this.$refs.jobTitle.classList.add("redBorder");
        }
      }
    },
    phoneObject(object) {
      if (object.valid || object.valid == null) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    changeMarketCategory(item) {
      this.marketCategoryRus = item.russianName;
      this.categorySelect = false;
      this.marketCategoryId = item.id;
    },
    productsMenu() {
      this.products = !this.products;
      this.profile = false;
      this.procurements = false;
    },
    procurementsMenu() {
      this.procurements = !this.procurements;
      this.profile = false;
      this.products = false;
    },
    close(e) {
      if (this.categorySelect == true && e.target.className != "select_block") {
        this.categorySelect = false;
      }
    },
  },
  components: {
    MoreIconSvg,
    ConfirmIcon,
    WarningSvg,
    ShowSvg,
    EyeSvg,
    CompanySvg,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    const userInfo = this.$store.getters.getUserInfo;
    addEventListener("click", this.close);
    4;
    if (this.userRole == "ADMIN") {
      console.log("1");
    }
    if (this.isLoggedIn) {
      this.getUserInfoRequest();
      this.getCategoriesListRequest();
      this.phone = userInfo?.phoneNumber;
      this.lastName = userInfo?.lastName;
      this.userCompany = userInfo?.companyDTO?.name;
      this.userEmail = userInfo?.email;
      this.marketCategoryRus = userInfo?.categoryDTO?.russianName;
      this.firstName = userInfo?.firstName;
      this.userJobTitle = userInfo?.jobPosition;
      this.marketCategoryName = userInfo?.categoryDTO?.name;
      this.marketCategoryId = userInfo?.categoryDTO?.id;
    }
  },
};
</script>

<style lang="scss" scoped>
.setting_item {
  display: flex;
  font-size: 14px;
  span {
    color: rgb(210 68 50);
  }
  .confirmed {
    color: rgb(0 151 61);
  }
}
.menu_header {
  margin: 0px 0px 15px 0px;
  font-size: 22px;
  font-weight: 500;
}
.reset_menu_header {
  margin: 50px 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
}
.reset_menu {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.save_button {
  width: 100%;
  margin-top: 20px;
  padding: 15px 0;
  background: #14d8b5;
  border-radius: 4px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  font-weight: 600;
  line-height: 1.375;
  transition: 0.3s;
}
.save_button:hover:not(.confirmed) {
  background-color: #00d2ac;
}
.select_list {
  position: absolute;
  z-index: 10000;
  max-width: 450px;
  text-align: left;
  background-color: #fff;
  max-height: 160px;
  box-sizing: border-box;
  overflow: hidden auto;
  border: 1px solid #cdcdcd;
  min-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.06) 0px 0px 16px;
}
.select_item {
  padding: 5px 20px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.42857;
}
.select_item:hover {
  background: rgb(244 244 244);
}

.select_block {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 26px 0 10px 16px;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.375;
  letter-spacing: 0px;
  border: 1px solid rgb(204, 204, 204);
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  height: 56px;
  margin-bottom: 20px;
}
input:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
input:disabled:hover {
  border-color: rgb(204, 204, 204);
}
input:disabled + .input_placeholder {
  opacity: 0.4;
}
.select_block {
  cursor: pointer;
  svg {
    position: absolute;
    right: 20px;
    top: 40%;
    transform: rotate(90deg);
    transition: 0.3s;
  }
  .rotate {
    transform: rotate(270deg);
  }
}
textarea::placeholder {
  font-size: 14px;
  color: #b2b2b2;
}
.input_placeholder {
  margin: 0px;
  font-style: normal;
  position: absolute;
  pointer-events: none;
  transition: all 75ms ease-in 0s;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.33333;
  letter-spacing: 0px;
  top: 8px;
  left: 16px;
  color: rgb(153, 153, 153);
  transition: 0.3s;
}
.input_info {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  transition: 0.3s;
  input {
    width: 100%;
    padding: 26px 0 10px 16px;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.375;
    letter-spacing: 0px;
    border: 1px solid rgb(204, 204, 204);
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    height: 56px;
  }
  textarea {
    overflow: hidden;
    width: 100%;
    padding: 26px 0 10px 16px;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.375;
    letter-spacing: 0px;
    border: 1px solid rgb(204, 204, 204);
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    height: 100px;
  }
  select {
    width: 100%;
    padding: 26px 0 10px 16px;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.375;
    letter-spacing: 0px;
    border: 1px solid rgb(204, 204, 204);
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    height: 56px;
    max-height: 160px;
  }
  input:hover:not(:disabled):not(:focus) {
    border-color: rgb(153, 153, 153);
  }
  .info_input:focus {
    border-color: #14d8b5 !important;
  }
  .info_input:focus + span {
    color: #14d8b5;
  }
  svg {
    position: absolute;
    top: 40%;
    right: 35px;
    cursor: pointer;
  }
}
.user_name_logo {
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
}
.current_menu_info {
  width: 50%;
}
.current_menu {
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rgb(244, 244, 244);
}
.user_name_short {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-align: center;

  font-size: 48px;
  line-height: 1.375;
  background: linear-gradient(
    302deg,
    rgb(244, 170, 59) 23.71%,
    rgb(221, 66, 66) 84.26%
  );
  width: 128px;
  height: 128px;
  border-radius: 100px;
}
.current_menu_block {
  padding: 29px 16px;
}
.current_menu_header {
  margin: 0px 0px 28px;
  font-style: normal;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.16667;
}
.current_menu_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.my_procurements_list {
  display: flex;
  flex-direction: column;
  padding: 5px 10px 5px 10px;
  border-radius: 4px;
  --tw-bg-opacity: 1;
  background-color: rgb(244 244 244);
  border-top: 1px solid rgb(227 227 227);
}
.procurement {
  padding: 10px 10px 5px 10px;
  transition: 0.3s;
  cursor: pointer;
}
.procurement:hover {
  background: rgb(236 236 236);
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.menu_item_name {
  cursor: pointer;
  padding: 15px 15px 15px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  transition: 0.5s;
  svg {
    transition: 0.3s ease-in-out;
    transform: rotate(90deg);
  }
}
.redBorder {
  border-color: red !important;
}
.redBorder + span {
  color: red;
}
.menu_item_name:hover {
  background: rgb(244, 244, 244);
}
.account_menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #cdcdcd;
  border-bottom: 1px solid #cdcdcd;
}

.user_company_name {
  cursor: auto;
  display: flex;
  border-bottom: 1px solid #cdcdcd;
  padding: 0px 0px 10px 10px;
  svg {
    margin: 0px 10px 0 5px;
    width: 20px;
    height: 20px;
  }
}

.confirmed {
  background: #e0fff9;
  color: #14d8b5;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.current_menu_block {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
}
.user_profile_block_content {
  display: flex;
  width: 90%;
  justify-content: space-between;
}
.user_profile_block {
  display: flex;
  justify-content: center;
}
.account_menu_block {
  display: flex;
  width: 20%;
}

.active {
  svg {
    transform: rotate(270deg);
  }
}
.wrong {
  border-color: red;
}
</style>
