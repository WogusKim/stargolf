<template>
    <div>
      <header>
        <div class="navbar">
          <!-- <div class="logo">
            <a href="mainPage.html">
              <img src="@/assets/golf-logo.png" alt="stargolf 로고" />
            </a>
          </div> -->
          <nav class="nav-menu">
          </nav>
        </div>
      </header>
      <main class="main-banner">
        <h1>ENJOY TRAVEL & GOLF<br>IN A WIDER WORLD</h1>
        <router-link to ="/member-login" class="join-btn">JOIN AS A MEMBER</router-link>
      </main>
    </div>
  </template>
  <script>
  export default {
    name: 'App',
    data() {
      return {
        // 여기에 데이터 속성 추가
      };
    },
    methods: {
      // 여기에 메소드 추가
    }
  };
  </script>
  <style scoped>
  /* 여기에 CSS 스타일 추가. 'scoped' 속성은 이 스타일이 이 컴포넌트에만 적용됨을 의미합니다. */
  @import '@/assets/styles.css';
  </style>