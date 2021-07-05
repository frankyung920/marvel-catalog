import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state() {
        return {
            limits: [10, 20, 50, 100],
            limit: 10,
            offset: 0,
            total: 0,
            current: 1,
        };
    },
    mutations: {
        set(state, payload) {
            state[payload[0]] = payload[1]
        }
    },
    actions: {
        setTotal({ commit }, payload) {
            commit("set", ["total", payload]);
        },
        updateLimit({ commit }, payload) {
            commit("set", ["limit", payload]);
        },
        updateCurrent({ commit }, payload) {
            commit("set", ["current", payload]);
        },
        updateOffset({ commit, state }, payload) {
            commit("set", ["offset", state.offset + payload]);
        },
        resetOffset({ commit }) {
            commit("set", ["offset", 0]);
        }
    },
    getters: {
        limits: (state) => {
            return state.limits;
        },
        limit: (state) => {
            return state.limit;
        },
        offset: (state) => {
            return state.offset;
        },
        total: (state) => {
            return state.total;
        },
        current: (state) => {
            return state.current;
        }
    },
});

export default store;