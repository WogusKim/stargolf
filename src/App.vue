<template>
  <div>
    <div class="logo">
      <li><router-link to ="/"><img src="@/assets/image/golf-logo.png" alt="stargolf 로고" /></router-link></li>
          </div>
          <div class="user-greeting" v-if="loginyn">
          <p>{{ memberid }} 님 환영합니다.</p>
          </div>
        <nav class="nav-menu">
          <ul>
            <li><router-link to ="/golfcourse">골프장 소개</router-link></li>
            <li><router-link to ="/golf-membership">회원권 안내</router-link></li>
            <li><router-link to ="/golf_reservation">예약</router-link></li>
            <li><router-link to ="/golf-feedback">공지사항</router-link></li>
            <li>
              <router-link v-if="!loginyn" to="/member-login">로그인/가입</router-link>
              <router-link v-if="loginyn" @click="logout">로그아웃</router-link>
            </li>
          </ul>
        </nav>
        <router-view/>
      </div>
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
</template>
<script>
export default {
  computed: {
    loginyn() {
      return this.$store.getters.getIsLogin;
    },
    memberid() {
      // 로그인된 사용자 정보를 가져오는 코드 (예: 첫 번째 사용자의 아이디)
      const userInfo = this.$store.getters.getUserInfo;
      return userInfo.length > 0 ? userInfo[0].memberid : '';
    },
  },
  methods: {
    logout() {
      // 로그아웃 로직 (예: 상태 초기화 및 필요한 동작 수행)
      this.$store.commit("onOff");
      // 추가적으로 로그아웃에 필요한 로직을 수행할 수 있습니다.
    },
  },
};
</script>
<style scoped>
/* 여기에 CSS 스타일 추가. 'scoped' 속성은 이 스타일이 이 컴포넌트에만 적용됨을 의미합니다. */
@import '@/assets/styles.css';

.header {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%; /* 전체 너비 사용 */
}

.user-greeting p {
  font-weight: bold;
  text-align: right; /* 텍스트 우측 정렬 */
  margin-right: 20px;
}
</style>