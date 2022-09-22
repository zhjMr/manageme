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
const logout = () => {
    return request({
        url: "/user/logout",
        method: "POST"
    })
}
export default {
    login,//登录
    userInfo,//用户信息
    logout,//退出登录
}