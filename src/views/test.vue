<template>
        <main class="main-banner">
        <h1>ENJOY TRAVEL & GOLF<br>IN A WIDER WORLD</h1>
      </main>
  
  <div v-if="kdata" >  {{ kdata.email }}</div>
    </template>
  
  <script>
import axios from 'axios';
import { getKakaoToken } from '@/views/kakaoLogin.js';
import vueCookies from 'vue-cookies';

// const kakaoHeader = {
//    "Authorization": "6391c6d463c2215a31a40506ed6ec73e", //ADMIN KEY
//    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//  };
//  const getKakaoToken = async code => {
//    try {
//      const data = {
//        grant_type: "authorization_code",
//        client_id: "3648ea223e4d0e9a853c7842d0b4aaa9", // REST_API_KEY
//        redirect_uri: "http://localhost:8080/kakaologin",
//        code: code
//      };
//      const queryString = Object.keys(data)
//        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
//        .join("&");
//      const result = await axios.post(
//        "https://kauth.kakao.com/oauth/token",
//        queryString,
//        { headers: kakaoHeader }
//      );
//      console.log(result);
//      console.log("카카오 토큰", queryString);
//      return result;
//    } catch (e) {
//      return e;
//    }
//  };


 export default {
name: 'testComponent',
setup() {
      return {};
    },
data() {
  return{
      code: null,
      token: null,
      email:'',
  }
},
  created() {
        if (this.$route.query.code) { //router을 이동 되더라도 request값을 유지한다.
            this.setKakaoToken();
        }
},
  methods: {
    
    async setKakaoToken() {
        console.log("카카오 인증 코드", this.$route.query.code);
        this.code = this.$route.query.code;
        console.log('error ', this.$route.query);
        console.log(this.code);
        const { data } = await getKakaoToken(this.$route.query.code);
        console.log(data);
        if (data.error) {
            alert("카카오톡 로그인 오류입니다.");
            this.$router.go();
        return;
        }
        window.Kakao.Auth.setAccessToken(data.access_token);
        console.log('token: ', data.access_token);
        this.token = data.access_token;
        vueCookies.set("access-token", data.access_token, "1d");
        vueCookies.set("refresh-token", data.refresh_token, "1d");

        //사용자 정보 가져오기
        axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: 'Bearer '+this.token
                }
            })
            .then(res => {
                console.log(res);
                this.email = res.data.kakao_account.email;
                let url = "http://localhost:3000/ckem?email=" + this.email;
                console.log("1단계: "+this.email)
      axios.get(url).then((res) => {
        console.log("1.5단계")
        console.log(res.data);
        if (res.data.state == "none") {
          alert("가입된 회원정보가 없습니다. 회원가입을 진행하세요.");
          this.$router.push("/join");
        } else {
        // console.log("이메일: "+this.email);
        let url = "http://localhost:3000/klogin";
        let obj = {};
        obj.email = this.email;
        console.log("2단계");
        axios
        .get(url, {
        params: obj,
        })
        .then((res) => {
        let data = res.data;
        console.log(data.info);
        console.log("3단계");
        console.log("state: " + data.state);
        if (res.data.state == "none") {
          alert("아이디 또는 비밀번호 오류입니다.");
        } else {
          if (data.info.status == "0") {
            alert("탈퇴한 회원입니다.");
          }else{
            let obj1 = new Object();
            obj1.memberid = data.info.memberid;
             console.log(obj1.memberid);
            obj1.pw = data.info.pw;
            obj1.email = data.info.email;
            console.log(obj1.email);  
            obj1.name = data.info.name;
            console.log(obj1.name);
            obj1.status = data.info.status;
            console.log(obj1.id);
            console.log(obj1.pw);
            this.$store.commit("addInfo", obj1);
            this.$store.commit("onOff");
            alert(data.info.memberid + "님 환영합니다.");
            this.$router.push("/");

          }}
          });
        }
      });


            })



        },







        // //연결 끊기
        // async btn_off() {

        //     window.Kakao.API.request({
        //         url: '/v1/user/unlink',
        //     })
        //     .then(function(response) {
        //         console.log(response);
        //         vueCookies.keys().forEach(cookie => vueCookies.remove(cookie)); //캐시 삭제
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
        // }
        // ,

        // //쿠키 상태 확인하기
        // cookieStatus() {
        //     let cookie = vueCookies.keys().join('\\');
        //     console.log(cookie);
        //     console.log(vueCookies.isKey('access-token'));
        // }

        // ,
        // btn_logOut() {
        //     window.Kakao.Auth.logout()
        //     .then(function(response) {
        //         console.log(response);
        //         console.log(window.Kakao.Auth.getAccessToken()); // null
        //         vueCookies.keys().forEach(cookie => vueCookies.remove(cookie));
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //         console.log('Not logged in.');
        //     });
        // }
    }
};
</script>

<style scoped>
/* 여기에 CSS 스타일 추가. 'scoped' 속성은 이 스타일이 이 컴포넌트에만 적용됨을 의미합니다. */
@import '@/assets/styles.css';
</style>