import Vue from 'vue'
import Vuex from 'vuex'
import isApi from '../api/user'
import tokenUser from '../utlis/auts'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {}
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    //存储token
    SET_TOKEN(state, token) {
      state.token = token
      tokenUser.setToken(token)
    },
    //存储用户信息
    USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      tokenUser.setUserInfo(userInfo)
    }
  },
  actions: {
    //获取登录信息
    async login({ commit }, FormLogin) {
      try {
        const response = await isApi.login(FormLogin)
        console.log(response.data.data.token);
        commit("SET_TOKEN", response.data.data.token)
        return response.data.data.token
      } catch (e) {
        console.log(e.message);
      }
    },
    //获取用户信息
    async userInfos({ commit }) {
      try {
        const headlInfo = await isApi.userInfo()
        commit('USER_INFO', headlInfo.data.data)
        console.log(headlInfo);
        return headlInfo.data.data
      } catch (e) {
        console.log(e.message);
      }
    }
  },
  modules: {

  }
})
