import request from "../utlis/request";

const login = (data = {}) => {
    return request({
        url: '/user/login',
        method: 'POST',
        data
    })
}
const userInfo = () => {
    return request({
        url: '/user/info/admin',
        method: 'GET',
    })
}
export default {
    login,
    userInfo,
}