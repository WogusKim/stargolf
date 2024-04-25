<template>
    <div class="register-container">
      <h2>STAR GOLF 회원가입</h2>
      <form @submit.prevent="submitRegistration" class="registration-form">
        <div class="form-field">
          <label for="memberid">아이디:</label>
          <input type="text" id="memberid" v-model="memberid" required>
        </div>
        <div class="form-field">
          <label for="password">비밀번호:</label>
          <input type="password" id="password" v-model="pw" required>
        </div>
        <div class="form-field">
          <label for="name">이름:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-field">
          <label for="phone">전화번호:</label>
          <input type="text" id="phone" v-model="phone" required>
        </div>
        <div class="form-field">
          <label for="email">이메일:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-field">
          <label for="birthdate">생년월일:</label>
          <input type="date" id="birthdate" v-model="birthdate" required>
        </div>
        <div class="form-field">
          <label for="gender">성별:</label>
          <select id="gender" v-model="gender">
            <option value="1">남성</option>
            <option value="2">여성</option>
          </select>
        </div>
        <div class="form-field">
          <button type="submit" class="register-button">회원가입</button>
        </div>
      </form>
      <div class="link-to-login">
        <router-link to="/member-login">이미 계정이 있나요? 로그인하기</router-link>
      </div>
    </div>
  </template>
    <script>
    import axios from 'axios';
    export default {
      name: 'golf-register',
      data() {
        return {
          memberid: '',
          pw: '',
          name: '',
          phone: '',
          email: '',
          birthdate: '',
          gender: '1'  // Default to 'male'
        };
      },
      methods: {
        submitRegistration() {
          // 날짜를 YYYY-MM-DD 형식에서 YYYYMMDD 형식으로 변환
          const formattedBirthdate = this.birthdate.replace(/-/g, '');
          axios.post('http://localhost:3000/register', {
            memberid: this.memberid,
            pw: this.pw,
            name: this.name,
            phone: this.phone,
            email: this.email,
            birthdate: formattedBirthdate, // 변환된 날짜를 사용
            gender: this.gender
          })
          .then(response => {
            if (response.data.state === 'ok') {
              this.$router.push('/member-login');
              alert('회원가입 성공! 이제 로그인 할 수 있습니다.');
            } else {
              alert('회원가입 실패: ' + response.data.message);
            }
          })
          .catch(error => {
            console.error('Registration error:', error);
          });
        }
      }
    }
    </script>
  <style scoped>
  @import '@/assets/styles.css';
  </style>