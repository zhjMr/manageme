const TOKEN = "token"
const USER = "userInfo"


//设置token
const setToken = (token) => {
    localStorage.setItem(TOKEN, token)
}
// 获取token
const getToken = () => {
    return localStorage.getItem(TOKEN)
}
//用户信息
const setUserInfo = (userInfo) => {
    localStorage.setItem(USER, JSON.stringify(userInfo))
}
//获取用户信息
const getUserInfo = () => {
    return JSON.parse(localStorage.getItem(USER || "{}"))
}
//删除token和用户信息
const removeTokenUser = () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USER)
}

export default {
    setToken,
    getToken,
    setUserInfo,
    getUserInfo,
    removeTokenUser
}