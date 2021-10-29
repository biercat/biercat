import router from "./router/index.js"
import { getUserInfo } from "@/api/login.js"

router.beforeEach((to, from, next) => {
    let tonken = localStorage.getItem("sms-token")

    if (!tonken) {
        if (to.path == "/login") {
            next()
        } else if (to.path == "/register") {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        if (to.path == "/login") {
            next()
        } else if (to.path == "/register") {
            next()
        } else {
            let userinfo = localStorage.getItem("sms-user")
            if (userinfo) {
                next()
            } else {
                getUserInfo(token).then(res => {
                    let resArr = res.data
                    if (resArr.flag) {
                        localStorage.setItem("sms-user", JSON.stringify(resArr.data))
                        next()
                    } else {
                        next({ path: '/login' })
                    }
                })
            }
        }
    }

})