<template>
    <button @click="btn_ev7">체크7하기</button>
    <button @click="btn_ev8">카카오로그인</button>
    
    
    <button @click="btn_ev9">체크8하기</button>
    <button @click="btn_ev10">체크10하기</button>
    
    <input type="text" v-model="email" placeholder="이메일 입력">
    <div v-if="username">{{ username }}</div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'App',
    data() {
      return {
        responseData: ''
        ,username: ''
        
      }
    },
    components: {
    },
    computed: {
    
    // ...mapState(["username"]), // `user`와 `token` 상태를 매핑
    },
    methods: {
        btn_ev(){
            // alert('alert');
            // let url="http://localhost:3000/test";
            axios.get("http://localhost:3000/test")
            .then(res=>{
                // alert('obj');
                console.log(res);
            })
        }, 
        btn_ev2(){
            // alert('alert');
            // let url="http://localhost:3000/test";
            axios.get("http://localhost:3000/name")
            .then(res=>{
                // alert('obj');
                console.log(res.data.result);
            })
        },
        btn_ev3(){
            // alert('alert');
            // let url="http://localhost:3000/test";
            axios.get("http://localhost:3000/get1?name=짱구&age=5")
            .then(res=>{
                // alert('obj');
                console.log(res.data.result);
            })
        },
        btn_ev4(){
            let obj = {};
            obj.name = '맹구';
            obj.age = 5;
            axios.get("http://localhost:3000/get1",{
                params: obj
            })
            .then(res=>{
                // alert('obj');
                console.log(res.data.result);
            })
        },
        btn_ev5(){
            let obj = {};
            obj.name = '맹구';
            obj.age = 5;
            axios.post("http://localhost:3000/post1", obj)
            .then(res=>{
                // alert('obj');
                console.log(res.data.result);
            })
        },
        btn_ev6(){
            let obj = {};
            obj.job = '부장';
            obj.empNo = 1007;
            console.log('checck')
            axios.get("http://localhost:3000/query2",{
                params: obj
            })
            .then(res=>{
                console.log(res.data);
            })
        },
        btn_ev7(){
            let obj = {};
            obj.username = 'aaa';
            obj.name = '박세리';
            console.log('checck')
            axios.get("http://localhost:3000/query3",{
                params: obj
            })
            .then(res=>{
                console.log(res.data);
            })
        },
        btn_ev8(){
            let obj = {
                email: this.email,
            };
            // obj.email='bib@hanmail.net';
            axios.get("http://localhost:3000/querykakao",{
                params: obj
            })
            .then(res=>{
                console.log(res.data);
                if (res.data.state == 'ok' && res.data.data.length > 0) {
                //     this.username = res.data.data[0].username;
                // } else {
                //     this.username = 'Not found';
                // }
                    this.$store.dispatch('setusername', res.data.data[0].username);
                } else {
                    this.$store.dispatch('setusername', 'Not found');
                }
                // this.responseData = JSON.stringify(res.data, null, 2); // JSON 형태로 데이터를 화면에 출력
                // if (res.data.state === 'ok' && res.data.data.length > 0) {
                //     this.username = res.data.data[0].username;
                // } else {
                //     this.username = 'Not found';
                // }
            })
            .catch(err => {
                console.error('Error:', err);
            });
        },
        btn_ev9(){
            // console.log('checck')
            axios.post("http://localhost:3000/insert")
            .then(res=>{
                console.log(res);
            })
        },
        btn_ev10() {
        let obj = {};
        obj.deptNo = 60;
        obj.dname = '재정부';
        obj.loc = '부산';
        axios.post('http://localhost:3000/insert2', obj)
        .then(res => {
            console.log(res);
        });
    }
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>