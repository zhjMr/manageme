import axios from 'axios'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000
})
service.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})
service.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

const request = (options) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data || options.params
        delete options.data
    }
}
export default service
 