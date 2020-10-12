<template>
  <div class="login-wrappper">
    <enter-phonenumber
      v-if="flag"
      @enter-phonenumber="enterPhone"
    ></enter-phonenumber>
    <enter-password
      @goback="goback"
      v-if="!flag"
      @enter-password="enterPass"
    ></enter-password>
  </div>
</template>

<script>
import EnterPassword from "../components/enter-password/enter-password";
import EnterPhonenumber from "../components/enter-phonenumber/enter-phonenumber";
import { userLogin, getUserInfo } from "../api/request";
import { mapActions } from "vuex";
import { getUserInfo as utillGetUserInfo } from "../api/utils";

export default {
  components: {
    EnterPassword,
    EnterPhonenumber
  },
  data() {
    return {
      flag: true,
      phone: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["userLoginInfo"]),
    enterPhone(val) {
      this.phone = val;
      this.flag = false;
    },
    enterPass(val) {
      this.password = val;
      if (this.phone && this.password) {
        userLogin(this.phone, this.password).then(res => {
          // 设置cookie，通过用户的id来更新store，从而获取用户的信息
          document.cookie = res.cookie;
          const uid = res.account.id;
          localStorage.setItem("uid", uid);
          utillGetUserInfo(this.userLoginInfo, uid);
          this.$router.push("recommend");
          // 最好封装一个提示通知的组件
        });
      }
    },
    goback() {
      this.flag = true;
    }
  }
};
</script>

<style></style>
