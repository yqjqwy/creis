/* store.js */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default function createStore() {
    let store = new Vuex.Store({
        state: {
            homeInfo: ''
        },
        actions: {
            getHomeInfo({
                commit
            }) {
                //发请求 疑问6 和server中的 请求有何区别
                return axios.get('http://localhost:8080/api/getHomeInfo').then((res) => {
                    commit('setHomeInfo', res.data)
                })
            }
        },
        mutations: {
            setHomeInfo(state, res) {
                state.homeInfo = res
            }
        }
    })

    return store
}