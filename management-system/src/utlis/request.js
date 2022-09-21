
import axios from 'axios'
import store from '../store/index'
// 自定义错误信息提示内容
const exceptionMessage = {
    1000: '用户名或者密码发生错误',
    3000: ''
}

import { Message } from "element-ui"

//创建axios实例配置, 返回实例对象
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(function (config) {
    //获取vuex的token
    const token = store.getters.token
    //token请求头
    if (token) config.headers.authorization = "Bearer" + token
    return config;
}, function (error) {
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(function (response) {

    if (response.status < 400) {
        return response
    }

    if (response.status === 401) {
        return
    }


    _showError(response.data.code, response.data.message)

    return response;
}, function (error) {
    return Promise.reject(error);
})


const _showError = (errorCode, message) => {
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    Message.error(title)
}


const request = (options) => {

    options.method = options.method || 'get'
    if (options.method.toLowerCase() === "get") {
        options.params = options.data || options.params
        delete options.data
    }


    service.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API

    return service(options)
}



export default request
