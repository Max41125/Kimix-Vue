<template>
  <div class="container">
    <div class="main-section-block">
      <div class="main-section_upper">
        <div class="katalog-products-block" @click="catalogPath">
          <div class="first-block-svg">
            <FirstBlockSvg />
          </div>
          <p class="first-block-text block-text">Каталог <br />продукции</p>
        </div>
        <div class="constructor-block">
          <div>
            <SecondBlockLeftSvg class="second-block-svg" />
            <div class="second-block-text block-text">
              Конструктор <br />
              реагентов
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="second-section-block">
      <div class="second-section_content">
        <div class="second-section_upper">
          <SecondSectionBlockRightSvg class="second-section-upper-img" />
          <p class="second-section_upper__text bottom-text">
            удобно искать <br />— выгодно покупать.
          </p>
        </div>
        <div class="second-section_middle">
          <SecondSectionBlockLeftSvg class="second-section-bottom-img" />
          <p class="second-section_middle__text">
            Химические реагенты и товары для химических лабораторий
          </p>
          <button
            type="button"
            class="second-section-middle-button green-bttn"
            id="search"
            v-if="!isLoggedIn"
            @click="openRegistration"
          >
            <p class="second-section_middle__button-text">Зарегистрироваться</p>
          </button>
          <button
            type="button"
            class="second-section-middle-button green-bttn"
            id="search"
            v-if="isLoggedIn"
            @click="onLogout"
          >
            <p class="second-section_middle__button-text">Выйти из аккаунта</p>
          </button>
          <RegistrationMenu v-model:show="dialogVisible" />
        </div>
        <div class="second-section_bottom">
          <p class="second-section_bottom__text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationMenu from "@/components/RegistrationMenu.vue";
import { mapActions } from "vuex";
import {
  FirstBlockSvg,
  SecondBlockLeftSvg,
  SecondSectionBlockRightSvg,
  SecondSectionBlockLeftSvg,
} from "@/components/UI";
export default {
  name: "HeaderSection",
  data() {
    return { dialogVisible: false, registrationDataVisible: false };
  },
  components: {
    FirstBlockSvg,
    SecondBlockLeftSvg,
    SecondSectionBlockRightSvg,
    SecondSectionBlockLeftSvg,
    RegistrationMenu,
  },
  methods: {
    ...mapActions(["logout"]),
    catalogPath() {
      this.$router.push("/catalog");
    },
    onLogout() {
      this.logout().then(() => this.$router.push("/"));
    },
    openRegistration() {
      this.dialogVisible = true;
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="scss" scoped>
.second-section-middle-button {
  z-index: 10;
}
.green-bttn {
  display: flex;
  padding: 18px 45px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 64px;
  background: var(--Base, #14d8b5);
}
.second-section_middle__button-text {
  color: var(--gray-bg, #f7f7f7);

  font-size: 16px;
  font-style: normal;
  font-weight: 550;
  line-height: 21px; /* 131.25% */
  letter-spacing: 0.32px;
  text-transform: uppercase;
}
.second-section_bottom__text {
  height: 200px;
  margin: 0 0 0 57%;
  padding-bottom: 60px;
  color: var(--black-base, #2c2c2c);
  font-size: 64px;
  font-style: normal;
  font-weight: 550;
  line-height: 68px;
}
.green-text {
  color: var(--Base, #14d8b5);
}
.second-section-bottom-img {
  position: absolute;
  left: 5%;
}
.second-section_bottom {
  display: flex;
}
.second-section_middle {
  display: flex;
  flex-direction: wrap;
  margin-left: 35%;
}
.second-section-upper-img {
  position: absolute;
  right: 5%;
}
.second-section_middle__text {
  max-width: 260px;
  color: var(--gray-heavy, #808080);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 116.667% */
}
.second-section_upper__text {
  margin: 32px 0 78px 32px;
}
.bottom-text {
  color: var(--black-base, #2c2c2c);
  font-size: 64px;
  font-style: normal;
  font-weight: 550;
  line-height: 68px; /* 106.25% */
}
.second-section_content {
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 4px;
  background: var(--gray-bg, #f7f7f7);
}
.second-section-block {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.main-section-block {
  width: 100%;
  display: flex;
  justify-content: center;
}
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.constructor-block {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 49.7%;
  border-radius: 4px;
  background: var(--gray-bg, #f7f7f7);
}
.constructor-block :hover {
  .second-block-svg {
    transform: translateY(25px) scale(1.2);
    transition: 0.3s ease;
  }
  .second-block-text {
    transform: translateY(25px) scale(1.2);
    transition: 0.3s ease;
  }
}
.katalog-products-block {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 49.7%;
  border-radius: 4px;
  background: var(--gray-bg, #f7f7f7);
}
.katalog-products-block:hover {
  .first-block-svg {
    transform: translateY(25px) scale(1.2);
    transition: 0.3s ease;
  }
  .first-block-text {
    transform: translateY(25px) scale(1.2);
    transition: 0.3s ease;
  }
}
.main-section_upper {
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 90%;
  margin: 16px 0 0 0;
}
.block-text {
  margin: 10% 0 15% 0;
  color: var(--black-base, #2c2c2c);
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 550;
  line-height: 28px; /* 127.273% */
  text-transform: uppercase;
}
@media screen and (max-width: 1440px) {
  .second-section_bottom__text {
    font-size: 48px;
    line-height: 48px;
  }
  .block-text {
    font-size: 16px;
  }
  .bottom-text {
    font-size: 48px;
    line-height: 48px;
  }
  .second-section_middle__text {
    width: 200px;
    font-size: 14px;
    line-height: 18px;
  }
  .second-section_middle__button-text {
    font-size: 12px;
  }
}
</style>
