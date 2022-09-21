import axios from "axios"
const https = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
https.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
}
)
https.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})
const request = (options) => {

    options.method = options.method || 'get'
    if (options.method.toLowerCase() === "get") {
        options.params = options.data || options.params
        delete options.data
    }

    // 解决多个代理请求的问题
    https.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API

    return https(options)
}


// 导出实例对象
export default request
