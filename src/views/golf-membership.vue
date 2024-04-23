<template>
  
      <main class="membership-main">
        <section class="membership-banner">
          <h1 class="membership-title"></h1>
        </section>
  
        <section class="membership-content">
          <h1>STAR GOLF 회원권 안내</h1>
          <h3>스타골프에서 펼쳐지는 그린 위의 여정!</h3>
        </section>
  
        <section class="golf-course-images">
          <img src="@/assets/image/golf-membership1.jpg" alt="Golf Course View 1">
          <img src="@/assets/image/golf-membership2.jpg" alt="Golf Course View 2">
          <img src="@/assets/image/golf-membership3.jpg" alt="Golf Course View 3">
        </section>
  
        <section class="membership-table-section">
          <h1>MEMBERSHIP</h1>
          <table class="membership-table">
            <tr>
              <th>상품</th>
              <th>회원 적용</th>
              <th>입회금</th>
              <th>기간</th>
            </tr>
            <tr>
              <td>VIP</td>
              <td>무기명 4인</td>
              <td>5,250만원</td>
              <td>20년</td>
            </tr>
            <tr>
              <td>GOLD</td>
              <td>기명 1인 + 무기명 3인</td>
              <td>2,835만원</td>
              <td>20년</td>
            </tr>
          </table>
        </section>
  
        <section class="notice-section">
          <h2>NOTICE</h2>
          <ul>
            <li>본 상품의 예약과 취소는 특별 약관이 적용됨을 알려드립니다.</li>
            <li>특별 약관 적용 시 표준 약관보다 높은 수수료가 부과될 수 있으며 이 경우 동의 절차를 구합니다.</li>
          </ul><br/>
          <h4>※취소료 규정※</h4>
          <h4>골프</h4>
          <ul>
            <li>주중, 일반 시즌</li>
            <li>- 출발일로부터 72시간 전: 패널티 없음</li>
            <li>- 출발일로부터 48~72시간 전: 지불 총액의 50%</li>
            <li>- 출발일로부터 48시간 전: 지불 총액의 100%</li>
          </ul>
          <ul>
              <li>주말, 피크 시즌</li>
              <li>- 출발일로부터 96시간 전: 패널티 없음</li>
              <li>- 출발일로부터 48~96시간 전: 지불 총액의 50%</li>
              <li>- 출발일로부터 72시간 전: 지불 총액의 100%</li>
            </ul>
        </section>
  
        <section class="inquiry-section">
          <div class="overlay"></div>
          <h2>문의하기</h2>
          <p>상담 가능 시간 평일 09:00 - 18:00</p>
          <div class="buttons">
            <button class="inquiry-button" @click="callPhoneNumber">전화문의 (모바일)</button>
            <button class="inquiry-button" @click="startChat">실시간 채팅 문의</button>
          </div>
        </section>
      </main>

  </template>
  
  <script>
  export default {
    name: 'golf-membership',
    methods: {
      callPhoneNumber() {
        // 전화 번호 다이얼 로직 구현
      },
      startChat() {
        // 채팅 시작 로직 구현
      }
    }
  }
  
  </script>
  
  <style scoped>
  @import '@/assets/styles.css';
  </style>
  