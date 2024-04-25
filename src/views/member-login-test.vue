<template>
    <div>
      <header>
      </header>
  
      <main class="login-main">
      <h1>Login</h1>
      <div class="social-login">
          <button class="kakao-login" @click="loginType = 'kakao'; loginStart()">카카오로 시작하기</button>
      </div>
  
      <div class="divider">또는</div>
  
      <form class="login-form" @submit.prevent="submitLogin">
        <label for="memberid">아이디</label>
        <input type="text" id="memberid" v-model="memberid">
        
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password">
        
        <div class="remember-me">
          <input type="checkbox" id="remember" v-model="rememberMe">
          <label for="remember">로그인 상태 유지</label>
        </div>
        
        <button type="submit" class="login-button">로그인</button>
        <!-- <button v-if="loginType === 'general'" @click="bt_login" class="login-button">일반 로그인</button> -->
      </form>
      
        
        <div class="help-links">
          <a href="#">회원가입</a>
          <a href="#">아이디 · 비밀번호 찾기</a>
        </div>
      </main>
  
      <footer class="login-footer">
        <p style="font-weight: bold; font-size: 12px;">스타골프</p>
        <p>대표자: 김이박 / 사업자번호 : 114-01-012345 / 통신판매업 신고번호 : 제2010-서울강남-0001호</p>
        <p>고객센터 : 02)123-1234 FAX:02)123-1244 / 입금 계좌 : 국민은행 123456-04-123456 (주)스타골프</p>
        <p>본사 : (00001) 서울 강남구 스타동 123 스타비즈타워 12층 (주)스타골프</p>
        <footer class="company_info"> 
            <ul>
                <li class ="policy_menu">
                    <data>이용약관</data>
                    <data>개인정보처리방침</data>
                    <data>회사소개</data>
                </li>
            </ul>
            <p>Copyright ⓒ 2024 스타골프 All rights reserved</p>
        </footer>
      </footer>
    </div>
  </template>
  
  <script>
  // import { getKakaoToken } from "@/views/kakaoLogin";
  
  import axios from 'axios';
  
  export default {
    name: 'member-login',
    data() {
      return {
        userId: '', // memberid 대신 userId로 변경
        userPassword: '' // password 대신 userPassword로 변경
        
      }
    },
    methods: {
  
      loginStart(){
          window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:8080/kakaoLogin",
            prompt: 'select_account'
          });  
        },
        async getKakaoToken(code) {
        try {
          const response = await axios.post('@/views/kakaoLogin', {
            code: code
          });
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch Kakao token');
        }
      },
        async fetchToken(code) {
        if (code) {
          try {
            const tokenResult = await this.getKakaoToken(code);
            console.log("토큰 결과: ", tokenResult.data);
            // 토큰을 사용하여 사용자 정보 요청 등 추가 처리
          } catch (error) {
            console.error("로그인 실패: ", error);
          }
        } else {
          console.error("인증 코드를 받지 못했습니다.");
        }
      }
    },
    mounted() {
      const code = this.$route.params.code;
      if (code) {
        this.fetchToken(code);
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
          alert(data.info.name + "님 환영합니다.");
          this.$router.push("/");
        }
      })
    }
    }
  
  </script>
  
  <style scoped>
  @import'@/assets/login.css';
  </style>