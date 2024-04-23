<template>
    <div class="about">
      <h1>This is an about page</h1>

      <button @click="btn_userInfo">사용자 정보 가져오기</button>
      <button @click="btn_off">연결 끊기</button>
      <button @click="btn_logOut">로그아웃</button>
      <button @click="message2">메세지</button>
      <button @click="cookieStatus">쿠키 상태 확인</button>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { getKakaoToken} from '@/views/kakaoLogin.js';
import vueCookies from 'vue-cookies';


export default {
  name: 'testComponent',
  data() {
    return{
        code: null,
        token: null
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
        const { data } = await getKakaoToken(this.$route.query.code);
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
        },

        //사용자 정보 가져오기
        btn_userInfo() {
            console.log('btn_userInfo');
            axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: 'Bearer '+this.token
                }
            })
            .then(res => {
                console.log(res);
            })
        },

        //연결 끊기
        async btn_off() {

            window.Kakao.API.request({
                url: '/v1/user/unlink',
            })
            .then(function(response) {
                console.log(response);
                vueCookies.keys().forEach(cookie => vueCookies.remove(cookie)); //캐시 삭제
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        ,

        message2() {
            window.Kakao.API.request({
            url: '/v2/api/talk/memo/default/send',
            data: {
                template_object: {
                    object_type: 'text',
                    text: 'text 영역 입니다',//메세지 내용
                    link: {
                        web_url: 'https://www.naver.com',  //?
                        mobile_web_url: 'https://m.naver.com/'//?
                    },
                    button_title: '클릭 해보기'
                }
            }
            })

        },


        //쿠키 상태 확인하기
        cookieStatus() {
            let cookie = vueCookies.keys().join('\\');
            console.log(cookie);
            console.log(vueCookies.isKey('access-token'));
        }

        ,
        btn_logOut() {
            window.Kakao.Auth.logout()
            .then(function(response) {
                console.log(response);
                console.log(window.Kakao.Auth.getAccessToken()); // null
                vueCookies.keys().forEach(cookie => vueCookies.remove(cookie));
            })
            .catch(function(error) {
                console.log(error);
                console.log('Not logged in.');
            });
        }
    }
};
</script>