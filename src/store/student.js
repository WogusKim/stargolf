import { createStore } from 'vuex'


const store = createStore( {
    state: { // 변수를 정의하는 곳
        studentList: new Array
    },
    mutations: { // 메소드 개념으로 데이터를 주고받음
        addStu(state1, obj){
            console.log(state1);
            console.log('========');
            console.log(obj);
            state.studentList.push(obj);
        }        
        ,editStu(state1, obj){
            console.log(state1);
            console.log('========');
            console.log(obj);
            state.studentList.push(obj);
        }        
    },
    getters: {
        getStudentList(state) {
            return state.studentList;
        }
    }
})

export default store;

