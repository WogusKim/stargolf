import { createStore } from "vuex";
const store = createStore({
  state: {
    userInfo: new Array(),
    isLogin: false,
  },
  mutations: {
    addInfo(state, obj) {
      console.log(state);
      console.log("=========");
      console.log(obj);
      state.userInfo.push(obj);
    },
    resetInfo(state) {
      state.userInfo.splice(0, 1);
    },
    onOff(state) {
      state.isLogin = !state.isLogin;
    },
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getIsLogin(state) {
      return state.isLogin;
    },
  },
});
export default store;