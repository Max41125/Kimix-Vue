<template>
  <div class="registration" v-if="show">
    <form
      class="registration_content_block"
      @submit.prevent="validateEmailReg"
      v-if="!swapLogin && !swapMenu"
    >
      <div class="registration_content" v-if="!swapText">
        <img
          class="close_svg"
          src="/icons/closeIcon.svg"
          alt=""
          @click="this.hideDialog()"
        />
        <input
          placeholder="Введите email"
          name="email"
          ref="emailReg"
          id="emailReg"
          class="input_registration"
          v-model="emailReg"
          required
          autofocus
        />
        <p
          class="registration_confirm_email deleted"
          id="emailCheck"
          ref="emailCheck"
        >
          Пользователь с таким логином существует
        </p>
        <p class="registration_confirm_text deleted" id="confirmationText">
          Пароли не совпадают
        </p>
        <button type="submit" class="registration-button">
          Зарегистрироваться
        </button>
        <p class="registration_content_text">
          Зарегистрированы?
          <span class="blue-text" @click="swapLogin = !swapLogin"
            >Войти в аккаунт</span
          >
        </p>
      </div>

      <div class="registration_content" v-if="swapText">
        <img
          class="close_svg"
          src="/icons/closeIcon.svg"
          alt=""
          @click="this.hideDialog()"
        />
        <p class="header_input_list">Вам на почту выслан код подтверждения</p>
        <div class="input_list">
          <input
            class="input_list_content"
            name="confCode"
            type="tel"
            inputmode="numeric"
            v-for="item in 6"
            :key="item"
            @keyup="checkNum($event, item)"
            v-model="confCode[item - 1]"
          />
        </div>
      </div>
    </form>
    <form class="registration_1" v-if="swapLogin" @submit.prevent="onLogin">
      <div class="registration_content_block">
        <div class="registration_content">
          <img
            class="close_svg"
            src="/icons/closeIcon.svg"
            alt=""
            @click="this.hideDialog()"
          />
          <input
            type="email"
            ref="emailLog"
            id="emailLog"
            placeholder="Введите email"
            name="email"
            class="input_registration"
            v-model="emailLog"
            required
          />
          <input
            type="password"
            name="password"
            id="passwordLog"
            ref="passwordLog"
            placeholder="Введите пароль"
            class="input_registration"
            v-model="passwordLog"
            required
          />
          <p
            id="loginCheckText"
            class="registration_confirm_text deleted"
            ref="loginCheckText"
          >
            Неправильный логин или пароль
          </p>
          <button
            type="submit"
            class="registration-button"
            @click="validateEmailLog"
          >
            Войти
          </button>
          <p class="registration_content_text">
            Не зарегистрированы?
            <span class="blue-text" @click="swapLogin = !swapLogin"
              >Зарегистрироваться</span
            >
          </p>
        </div>
      </div>
    </form>
    <RegistrationDataMenu
      v-model:showReg="swapMenu"
      :emailRegistration="emailReg"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import RegistrationDataMenu from "@/components/RegistrationDataMenu.vue";

export default {
  name: "RegistrationMenu",
  data() {
    return {
      swapLogin: false,
      swapMenu: false,
      emailReg: "",
      passwordReg: "",
      passwordConfirmationReg: "",
      emailLog: "",
      passwordLog: "",
      confCode: ["", "", "", "", "", ""],
      swapText: false,
      lastStr: "",
    };
  },
  components: { RegistrationDataMenu },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(["register", "login", "checkConfirmationCode"]),
    openRegistration() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.$emit("update:show", false);
      this.swapText = false;
      this.confCode = ["", "", "", "", "", ""];
    },
    ctrlV(item) {
      let confText = this.confCode[item - 1];

      if (confText.length == 6) {
        this.confCode = confText.split("");
        this.checkConfirmationCodeFunc(this.emailReg, this.confCode.join(""));
      } else {
        this.confCode[item - 1] = "";
      }
    },
    firstTry(str) {
      if (this.lastStr == str) {
        return false;
      } else {
        this.lastStr = str;
        return true;
      }
    },
    async checkConfirmationCodeFunc(email, code) {
      let inputsList = document.getElementsByName("confCode");
      var params = { email: email, code: code };
      this.checkConfirmationCode(params)
        .then((response) => {
          if (response.status == 200) {
            this.swapMenu = true;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 403) {
              for (let i = 0; i < 6; i++) {
                inputsList[i].classList.add("redBorder");
              }
            }
          }
        });
    },
    checkNum($event, item) {
      let inputsList = document.getElementsByName("confCode");
      var keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (keyCode > 47 && keyCode < 58) {
        let currentInputNum = item - 1;
        this.confCode[item - 1] = $event.key;
        if (this.confCode.join("").length == 6) {
          this.checkConfirmationCodeFunc(this.emailReg, this.confCode.join(""));
        } else {
          if (inputsList[currentInputNum + 1]) {
            inputsList[currentInputNum + 1].focus();
          }
        }
      } else {
        if (keyCode == 86 && $event.ctrlKey) {
          this.ctrlV(item);
        } else {
          if (this.confCode[item - 1] >= 0) {
            return;
          } else {
            this.confCode[item - 1] = "";
          }
        }
      }
    },
    validateEmailReg() {
      let inputsList = document.getElementsByName("confCode");
      this.$refs.emailCheck.classList.add("deleted");
      this.$refs.emailReg.classList.remove("redBorder");

      if (this.swapText) {
        for (let i = 0; i < 6; i++) {
          inputsList[i].classList.remove("redBorder");
        }
      }

      if (inputsList) {
        this.register({ email: this.emailReg })
          .then((response) => {
            if (response.status == 200) {
              this.swapText = !this.swapText;
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status == 403) {
                this.$refs.emailReg.classList.add("redBorder");
                this.$refs.emailCheck.classList.remove("deleted");
              }
            }
          });
      }
    },
    validateEmailLog() {
      if (this.emailLog) {
        this.onLogin();
      }
    },
    passwordConfirmation() {
      if (this.passwordReg == this.passwordConfirmationReg) {
        this.letRegister = true;
      } else {
        this.letRegister = false;
      }
    },

    async onLogin() {
      let email = this.emailLog;
      let password = this.passwordLog;

      let loginCheckText = document.getElementById("loginCheckText");
      let emailInput = document.getElementById("emailLog");
      let passwordInput = document.getElementById("passwordLog");

      loginCheckText.classList.add("deleted");
      emailInput.classList.remove("redBorder");
      passwordInput.classList.remove("redBorder");

      this.login({ email, password })
        .then((error) => {
          if (!error) {
            location.reload();
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 403) {
              emailInput.classList.add("redBorder");
              passwordInput.classList.add("redBorder");
              loginCheckText.classList.remove("deleted");
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header_input_list {
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 20px 0;
}
.input_list {
  display: flex;
  justify-content: space-between;

  input {
    margin: 0 0 20px 0;
    height: 60px;
    width: 40px;
    border-radius: 15px;
    padding: 15px;
  }
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
.registration_confirm_email {
  margin-top: 5px;
  font-weight: 400;
  color: red;
  text-align: center;
  font-size: 14px;
}
.registration_confirm_text {
  margin-top: 5px;
  font-weight: 400;
  color: red;
  text-align: center;
  font-size: 14px;
}
input {
  border: 1px solid #5d5d5d;
  padding: 20px 64px 20px 16px;
  border-radius: 36px;
  outline: none;
}
::placeholder {
  color: #5d5d5d;
}
.registration_content_block {
  position: relative;
  background-color: #fff;
  border-radius: 30px;
}
.registration_content_text {
  text-align: center;
  margin: 50px 0 0 0;
  color: #808080;
}

.blue-text {
  cursor: pointer;
  color: #216ee3;
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
.input_registration:not(:first-of-type) {
  margin-top: 30px;
  background: #fff;
}
.registration_content {
  display: flex;
  flex-direction: column;
  width: 440px;
  padding: 100px 60px;
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
