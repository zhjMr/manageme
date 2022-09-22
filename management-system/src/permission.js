import router from './router'
import store from './store'
// import remover from "./utlis/auts"
router.beforeEach(async (to, from, next) => {
    let token = store.getters.token
    // console.log(token==false);
    if (token) {
        console.log(token);
        // 当有token 的时候，判断是否要跳转到登录页面
        // 如果为true 则返回到 原本的页面
        if (to.path === '/login') {
            next(from.path)
        } else {
            let userInfo = store.getters.userInfo
            userInfo = typeof userInfo === Object ? JSON.stringify(userInfo) : userInfo
            if (userInfo == "{}" || userInfo == "") {
                let response = await store.dispatch("userInfos")
                if (response) {
                    next()
                } else {
                    next("/login")
                }
            } else {
                next()
            }
        }
    } else {
        // 没有token 的 时候
        // 如果要跳 token 页面 通行
        // 否则跳转登录
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})