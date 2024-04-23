<template>
  <div>
    <div class="logo">
      <li><router-link to ="/"><img src="@/assets/image/golf-logo.png" alt="stargolf 로고" /></router-link></li>
          </div>
        <nav class="nav-menu">
          <ul>
            <li><router-link to ="/golfcourse">골프장 소개</router-link></li>
            <li><router-link to ="/golf-membership">회원권 안내</router-link></li>
            <li><router-link to ="/reservation">예약</router-link></li>
            <li><router-link to ="/feedback">고객의 소리</router-link></li>
            <li><router-link to ="/member-login">로그인/가입</router-link></li>
          </ul>
        </nav>
        <router-view/>
      </div>
</template>
<style scoped>
/* 여기에 CSS 스타일 추가. 'scoped' 속성은 이 스타일이 이 컴포넌트에만 적용됨을 의미합니다. */
@import '@/assets/styles.css';
</style>