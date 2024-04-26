<template>
  <header>
        <div class="navbar">
            <div class="logo">
                <a href="mainPage.html">
                    <img src="@/assets/image/golf-logo.png" alt="stargolf 로고" />
                </a>
            </div>
            <nav class="nav-menu">
                <ul>
                    <li><a href="about.html">골프장 소개</a></li>
                    <li><a href="membership.html">회원권 안내</a></li>
                    <li><a href="reservation.html">예약</a></li>
                    <li><a href="feedback.html">고객의 소리</a></li>
                    <li><a href="login.html">로그인/가입</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main class="main-banner">
        <h1>ENJOY TRAVEL & GOLF<br>IN A WIDER WORLD</h1>
        <a href="login.html" class="join-btn">JOIN AS A MEMBER</a>
    </main>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import '@/assets/styles.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
