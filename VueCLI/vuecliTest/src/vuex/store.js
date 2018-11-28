import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    count: 3,
    sonicStatus: '1',
    gameArea: ''
}
const mutations = {
    add(state) {
        state.count++;
    },
    reduce(state) {
        state.count--;
    },
    sonicStatus(res){
        console.log("設定成功: res: "+ res);
        state.sonicStatus = res
    },
    initImgArr(res){
        state.gameArea = res
    }
}
const getters = {
    count: function (state) {
        return state.count += 100;
    }
}

const actions = {
    addAction(context) {
        context.commit('add', 10);
    },
    reduceAction({ commit }) {
        commit('reduce');
    },
    setSonicStatusAct({ commit }) {
        commit('SonicStatus');
    },
    initImgArrAct({ commit }) {
        commit('initImgArr');
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})