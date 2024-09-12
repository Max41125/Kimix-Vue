<template>
  <form
    class="registration_content_block"
    @submit.prevent="validateEmailReg"
    v-if="showReg"
  >
    <div class="registration_content">
      <p class="registration_header">Введите данные для регистрации</p>
      <img
        class="close_svg"
        src="/icons/closeIcon.svg"
        alt=""
        @click="this.hideDialog()"
      />
      <div class="inputs_list">
        <input
          type="name"
          name="email"
          id="emailReg"
          :placeholder="this.$props.emailRegistration"
          class="input_registration"
          disabled="disabled"
          v-model="emailReg"
          required
          autofocus
        />
        <input
          type="name"
          placeholder="Ваше имя"
          name="email"
          class="input_registration"
          v-model="name"
          required
          autofocus
        />
        <input
          type="name"
          placeholder="Ваша фамилия"
          name="email"
          class="input_registration"
          v-model="surname"
          required
          autofocus
        />
        <input
          type="name"
          placeholder="Название компании"
          name="email"
          class="input_registration"
          v-model="companyName"
          required
          autofocus
        />
        <input
          type="password"
          placeholder="Введите пароль"
          name="passwordReg"
          autocomplete="off"
          class="input_registration"
          v-model="password"
          required
          autofocus
          @input="newPasswordCheck"
        />
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
              ><WarningSvg v-if="!upperLowerConfirmed" /><ConfirmIcon v-else />
              Содержит заглавные и строчные буквы
            </span>
          </div>
        </div>
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="Подтвердите пароль"
          name="passwordReg"
          class="input_registration"
          required
          @input="validatePasswordReg"
          autofocus
        />
      </div>
      <div class="settings_block">
        <div class="setting_item">
          <span
            class="confirmation_text"
            id="confirmationText"
            :class="{ confirmed: this.confirm }"
            ><WarningSvg v-if="!confirm" /><ConfirmIcon v-else />
            Пароли не совпадают
          </span>
        </div>
      </div>
      <button type="submit" class="registration-button" @click="onRegistration">
        Зарегистрироваться
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import {
  WarningSvg,
  ConfirmIcon,
  //EyeSvg
} from "./UI";

export default {
  props: {
    showReg: {
      type: Boolean,
      default: false,
    },
    emailRegistration: { type: String, default: "" },
  },
  components: {
    //EyeSvg,
    WarningSvg,
    ConfirmIcon,
  },
  data: () => ({
    emailReg: "",
    companyName: "",
    passwordConfirmation: "",
    password: "",
    surname: "",
    letRegister: false,
    name: "",
    lenConfirmed: false,
    numConfirmed: false,
    upperLowerConfirmed: false,
  }),
  name: "RegistrationDataMenu",
  methods: {
    ...mapActions(["registration"]),
    setEmailReg() {
      this.emailReg = this.$props.emailRegistration;
    },
    newPasswordCheck() {
      this.lenConfirmed = false;
      this.numConfirmed = false;
      this.upperLowerConfirmed = false;

      let numCheck = /\d/g;
      if (this.password.length >= 8) {
        this.lenConfirmed = true;
      }
      if (numCheck.test(this.password)) {
        this.numConfirmed = true;
      }
      if (
        this.password.toUpperCase() != this.password &&
        this.password.toLowerCase() != this.password
      ) {
        this.upperLowerConfirmed = true;
      }
    },
    hideDialog() {
      this.$emit("update:showReg", false);
    },
    validatePasswordReg() {
      let confText = document.getElementById("confirmationText");

      if (this.passwordConfirmation == this.password) {
        this.letRegister = true;
        confText.classList.add("deleted");
      } else {
        this.letRegister = false;
        confText.classList.remove("deleted");
      }
    },
    onRegistration() {
      let params = {
        firstName: this.name,
        lastName: this.surname,
        email: this.$props.emailRegistration,
        password: this.password,
        companyName: this.companyName,
      };
      this.registration({ params }).then((response) => {
        if (response.status == 200) {
          location.reload();
        }
      });
    },
  },
  mounted() {
    this.setEmailReg();
  },
};
</script>

<style lang="scss" scoped>
.settings_block {
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0 15px;
}
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
.inputs_list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.registration_content_block {
  position: relative;
  background-color: #fff;
  border-radius: 30px;
}
.registration-button {
  margin-top: 30px;
  padding: 20px 50px;
  border-radius: 64px;
  background: #14d8b5;
  font-family: Helvetica;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #f7f7f7;
}
.blue-text {
  cursor: pointer;
  color: #216ee3;
}
input {
  border: 1px solid #5d5d5d;
  padding: 20px 64px 20px 16px;
  border-radius: 36px;
  outline: none;
}
.input_registration {
  width: 100%;
  margin-top: 30px;
  background: #fff;
}
.registration_content {
  display: flex;
  flex-direction: column;
  width: 440px;
  padding: 100px 60px;
}
.close_svg {
  position: absolute;
  right: 5%;
  top: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.close_svg:hover {
  transform: scale(115%);
}
.registration {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0%;
  bottom: 0;
  left: 0%;
  right: 0%;
  background: rgb(0, 0, 0, 0.5);
  position: fixed;
  z-index: 10000;
  backdrop-filter: blur(4px);
}
.deleted {
  display: none;
}
.redBorder {
  border: 1px solid red;
}
</style>
