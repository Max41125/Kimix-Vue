<template>
  <div class="container">
    <div class="header">
      <div class="logo-section">
        <div class="header-logo" @click="pushMainPage">
          <HeaderLogo />
        </div>
        <div class="header-options">
          <HeaderOptions />
        </div>

        <router-link
          class="router_link_to_catalog"
          :to="{ name: 'catalogSearch' }"
        >
          <div class="catalog_link_section">
            <p class="catalog_link_section_text">Каталог</p>
          </div>
        </router-link>
      </div>
      <div class="input-section">
        <input
          type="text"
          placeholder="реагента по номеру/названию/коду..."
          name="search"
          v-model="postData.fullName"
          id="message"
          @keyup.enter="
            this.$router.push({
              name: 'catalogSearch',
            })
          "
        />
        <router-link type="button" :to="{ name: 'catalogSearch' }">
          <img
            src="/icons/MagnifyingGlass.png"
            alt=""
            class="input-section_img"
          />
        </router-link>
      </div>
      <!-- <div class="header-lang-section">
        <p class="current-lang_text">RU</p>
        <div class="current-lang_button">
          <HeaderLangButton />
        </div>
      </div> -->
      <div class="header-icons-section">
        <router-link
          v-if="userRole == 'ADMIN'"
          to="/admin-panel"
          style="display: flex"
        >
          <AdminSvg style="cursor: pointer" />
        </router-link>
        <HeaderLoginIcon
          v-if="!isLoggedIn"
          @click="openRegistration"
          style="cursor: pointer"
        />

        <HeaderMyProfileIcon
          style="cursor: pointer"
          v-else
          @click.prevent="toggleDropdown"
        />

        <Transition name="slide-fade"
          ><div
            class="drop-down"
            :class="{
              settings: settingsBttn == true,
              orders: ordersButton == true,
            }"
            v-show="showProfileDropdown"
          >
            <div class="user_info_column">
              <router-link
                style="color: inherit; text-decoration: none"
                class="router_link_user"
                to="/user-profile/profile"
              >
                <div class="user_info_text">
                  <div class="user_name">
                    {{
                      this.$store.getters.getUserInfo.firstName +
                      " " +
                      this.$store.getters.getUserInfo.lastName
                    }}
                  </div>
                  <div class="user_email">
                    {{ this.$store.getters.getUserInfo.email }}
                  </div>
                  <div class="edit_profile_text">Редактировать профиль</div>
                </div>
              </router-link>
            </div>
            <div class="user_procurement">
              <TransitionGroup name="slide"
                ><div
                  class="slide_content"
                  @click="settingsBttn = !settingsBttn"
                  v-if="!settingsBttn && !ordersButton"
                >
                  Настройки <MoreIconSvg />
                </div>
                <div class="slide_block" v-if="settingsBttn">
                  <div
                    class="slide_content_left_header"
                    @click="settingsBttn = !settingsBttn"
                  >
                    <MoreIconSvg
                      style="transform: rotate(180deg); margin-right: 20px"
                    />
                    Настройки
                  </div>
                  <router-link to="/user-profile/profile">
                    <div class="slide_content_left">Мой кабинет</div>
                  </router-link>
                  <router-link to="/user-profile/company">
                    <div class="slide_content_left">Мои пользователи</div>
                  </router-link>
                </div>
              </TransitionGroup>
              <TransitionGroup name="slide"
                ><div
                  class="slide_content"
                  @click="ordersButton = !ordersButton"
                  v-if="!ordersButton && !settingsBttn"
                >
                  Мои заказы <MoreIconSvg />
                </div>
                <div class="slide_block" v-if="ordersButton">
                  <div
                    class="slide_content_left_header"
                    @click="ordersButton = !ordersButton"
                  >
                    <MoreIconSvg
                      style="transform: rotate(180deg); margin-right: 20px"
                    />
                    Мои заказы
                  </div>
                  <router-link to="/user-profile/orders">
                    <div class="slide_content_left">Мои заказы</div>
                  </router-link>
                  <router-link to="/user-profile/products">
                    <div class="slide_content_left">Мои товары</div>
                  </router-link>
                </div></TransitionGroup
              >
            </div>
            <div
              class="sign_out_bttn slide_content"
              v-if="!ordersButton && !settingsBttn"
              @click="logout"
            >
              Выйти из аккаунта
            </div>
          </div></Transition
        >

        <HeaderHeartIcon />
        <HeaderBasketIcon
          style="cursor: pointer"
          v-if="!isLoggedIn"
          @click="openRegistration"
        />
        <router-link v-if="isLoggedIn" to="/basket">
          <HeaderBasketIcon
            style="cursor: pointer; color: inherit; text-decoration: none"
          />
        </router-link>
      </div>
      <RegistrationMenu v-model:show="dialogVisible" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { MoreIconSvg } from "./UI";
import RegistrationMenu from "./RegistrationMenu.vue";
import {
  HeaderLogo,
  HeaderOptions,
  // HeaderLangButton,
  HeaderLoginIcon,
  HeaderBasketIcon,
  HeaderHeartIcon,
  HeaderMyProfileIcon,
  AdminSvg,
} from "./UI";
export default {
  data() {
    return {
      postData: { fullName: "" },
      dialogVisible: false,
      showProfileDropdown: false,
      settingsBttn: false,
      slideBack: false,
      ordersButton: false,
    };
  },
  name: "HeaderSection",
  components: {
    HeaderLogo,
    HeaderOptions,
    // HeaderLangButton,
    HeaderLoginIcon,
    HeaderBasketIcon,
    HeaderHeartIcon,
    RegistrationMenu,
    HeaderMyProfileIcon,
    MoreIconSvg,
    AdminSvg,
  },
  methods: {
    ...mapActions(["getUserInfoRequest"]),
    pushMainPage() {
      this.$router.push("/");
    },
    toggleDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.showProfileDropdown = false;
      }
    },
    openRegistration() {
      this.dialogVisible = true;
    },
    logout: function () {
      this.$router.push({ path: "/", replace: true });
      this.$store.dispatch("logout").then(() => {
        this.showProfileDropdown = false;
      });
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
    if (this.isLoggedIn) {
      this.getUserInfoRequest();
    }
  },
  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    userRole() {
      return this.$store.getters.getUserRole;
    },
  },
};
</script>

<style lang="scss" scoped>
.slide_block {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  overflow: hidden;
}
.slide_content_left {
  display: flex;
  min-width: 100%;
  align-items: center;
  padding: 10px 32px 10px 32px;
  overflow: hidden;
  svg {
    margin-left: 20px;
  }
}
.slide_content_left:hover {
  background: rgb(232, 232, 232);
}
.slide_content_left_header {
  width: 100%;
  font-weight: 500;
  display: flex;
  padding: 10px 32px 10px 32px;
  align-items: center;
  border-bottom: 1px solid #cdcdcd;
}
.slide_content {
  cursor: pointer;
  font-weight: 500;
  display: flex;
  min-width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 32px 10px 32px;
  overflow: hidden;
}
.slide_content:hover {
  background: rgb(232, 232, 232);
}
.user_procurement {
  width: 100%;
  flex-direction: column;
  cursor: pointer;
  display: flex;
  border-top: 1px solid #cdcdcd;
  border-bottom: 1px solid #cdcdcd;
  overflow: hidden;
}
.user_info_column:hover {
  background: rgb(232, 232, 232);
}
.slide_content_left_header:hover {
  background: rgb(232, 232, 232);
}
.router_link_user {
  display: flex;
}
.user_email {
  font-size: 14px;
  font-weight: 500;
  color: rgb(117, 117, 117);
}
.edit_profile_text {
  font-size: 14px;
  font-weight: 500;
  color: rgb(117, 117, 117);
}
.user_info_text {
  margin-left: 20px;
}
.slide-leave-active,
.slide-enter-active {
  transition: 0.2s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
.slideback-leave-active,
.slideback-enter-active {
  transition: 0.2s;
}
.slideback-enter {
  transform: translate(-100%, 0);
}
.slideback-leave-to {
  transform: translate(100%, 0);
}
.user_name {
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.33333;
}
.user_info_column:hover {
  .user_email {
    display: none;
  }
  .edit_profile_text {
    display: block;
  }
}
.drop-down {
  overflow: hidden;
  transition: ease 0.2s;
  z-index: 100000;
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 300px;
  background: #f4f4f4;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.06) 0px 0px 16px;
  max-height: 1500px;
  top: 70px;
  right: 5%;
}
.user_info_column {
  cursor: pointer;
  list-style-type: none;
  margin: 10px 24px 0px 24px;
  position: relative;
  stroke: none;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 100px;
}
.catalog_link_section {
  display: none;
}
.current-lang_text {
  margin-right: 5px;
  color: var(--Base, #14d8b5);

  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 100% */
}
.header-lang-section {
  display: flex;
  justify-content: space-between;
}
.header-logo {
  margin: 0px 20% 0px 10px;
  cursor: pointer;
}
.header-options {
  display: flex;
  align-items: center;
}
.input-section_img {
  margin: 5px 0 0 -50px;
}
.input-section {
  display: flex;
  width: 50%;
}
.container {
  display: flex;
  justify-content: center;
}
.header-icons-section {
  display: flex;
  justify-content: space-between;
  width: 10%;
  margin-right: 10px;
  align-items: center;
}
.logo-section {
  width: 20%;
  display: flex;
}
.header {
  background: var(--gray-bg, #f7f7f7); //#f0f0f0
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px 20px 10px;
  width: 90%;
}
input {
  border: 1px solid #555;
  padding: 9px 4px 9px 30px;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  border: none;
  outline: none;
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
.edit_profile_text {
  display: none;
}
a {
  color: inherit;
  text-decoration: none;
}
@media screen and (max-width: 1440px) {
  .header {
    padding: 0;
  }
  .input-section {
    width: 30%;
    .input-section_img {
      margin: 5px 0 0 -40px;
    }
  }
  .header-options {
    margin-top: 10px;
  }
  .header-logo {
    margin: 0px 10% 0px 10px;
  }
  .logo-section {
    width: 30%;
    display: flex;
    align-items: center;
  }
  .input-section {
    justify-content: right;
    margin: 0 20px 0 0;
  }

  .router_link_to_catalog {
    text-decoration: none;
    color: inherit;
  }
  .catalog_link_section {
    margin-left: 30px;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 31.5px 40px 31.5px 40px;
    cursor: pointer;
    border-right: 1px solid #cdcdcd;
    border-left: 1px solid #cdcdcd;
    transition: 0.3s ease;
    &:hover {
      border: none;
      background: #14d8b5;
    }
  }
  .catalog_link_section_text {
    font-size: 16px;
    font-weight: 550;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
  }
}
</style>
