<template>
  <div>
    <header></header>
    <main class="login-main">
      <h1 class="logintype">Login</h1>
      <br>
      <div class="social-login">
        <img src="@/assets/image/kakaoLogin.png" alt="카카오로 시작하기" class="kakao-login" @click="loginStart">

      </div>
      <div class="divider">또는</div>
      <form class="login-form" @submit.prevent="bt_login">
        <input type="text" id="username" v-model="userId" placeholder="아이디" >
        <input type="password" id="password" v-model="userPassword" placeholder="비밀번호" >
        <span class="remember-me">
          <input type="checkbox" id="remember" v-model="rememberMe"><label for="remember"><div class="remember-me-text">로그인 상태 유지</div></label>
        </span>
        <button type="submit" class="login-button">로그인</button>
      </form>
      <div class="help-links">
        <router-link to="/golf-register">회원가입</router-link><br/>
        <!-- <a href="#">아이디 · 비밀번호 찾기</a> -->
      </div>
    </main>
  </div>
</template>
<script>
import { getKakaoToken } from "@/views/kakaoLogin";
import axios from 'axios';
export default {
  name: 'member-login',
  data() {
    return {
      userId: '',
      userPassword: '',
      rememberMe: false
    };
  },
  methods: {
    loginStart() {
      window.Kakao.Auth.authorize({
        redirectUri: "http://localhost:8080/kakaoLogin",
        prompt: 'select_account'
      });
    },
    async fetchToken(code) {
      if (code) {
        try {
          const tokenResult = await getKakaoToken(code);
          console.log("토큰 결과: ", tokenResult.data);
        } catch (error) {
          console.error("로그인 실패: ", error);
        }
      } else {
        console.error("인증 코드를 받지 못했습니다.");
      }
    },
    bt_login(){
    let url = "http://localhost:3000/member-login";
    let obj = {};
    obj.id = this.userId;
    obj.pw = this.userPassword;
    console.log(obj.id);
    axios
    .post(url, {
      params: obj,
    })
    .then((res) => {
      let data = res.data;
      console.log(res);
      console.log(data.info);
      console.log("state: " + data.state);
      if (res.data.state == "none") {
        alert("아이디 또는 비밀번호 오류입니다.");
      } else {
        let obj1 = new Object();
        obj1.memberid = data.info.memberid;
        obj1.pw = data.info.pw;
        obj1.email = data.info.email;
        obj1.name = data.info.name;
        obj1.status = data.info.status;
        console.log(obj1.id);
        console.log(obj1.pw);
        this.$store.commit("addInfo", obj1);
        this.$store.commit("onOff");
        alert(data.info.memberid + "님 환영합니다.");
        this.$router.push("/");
      }
    })
  },
  created() {
    const code = this.$route.query.code;
    if (code) {
      this.fetchToken(code);
    }
  }
}
}
</script>


<style scoped>
@import 'login.css';
</style>
