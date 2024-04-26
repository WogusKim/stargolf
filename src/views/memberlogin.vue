<template>
    <div>
      <header>
      </header>
  
      <main class="login-main">
        <h1>Login</h1>
        <div class="social-login">
            <button class="kakao-login" @click="loginStart">카카오로 시작하기</button>
          <button class="naver-login" @click="naverLogin">네이버로 시작하기</button>
        </div>
  
        <div class="divider">또는</div>
  
        <form class="login-form" @submit.prevent="submitLogin">
          <label for="username">아이디</label>
          <input type="text" id="username" v-model="username">
          
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password">
          
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe">
            <label for="remember">로그인 상태 유지</label>
          </div>
          
          <button type="submit" class="login-button">로그인</button>
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
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false
      };
    },
    methods: {
      loginStart() {
        // 카카오 로그인 로직 구현
      },
      naverLogin() {
        // 네이버 로그인 로직 구현
      },
      submitLogin() {
        // 로그인 로직 구현
        alert('로그인 시도: ' + this.username);
      }
    }
  }
  </script>
  
  <style scoped>
@import'login.css';
  </style>
  