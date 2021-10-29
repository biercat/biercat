let tonke_key="sms-token"
let user_key="sms-user"

// 拿到token
export function getToken(){
    return localStorage.getItem(tonke_key)
}
// 设置token
export function setToken(token){
    return localStorage.setItem(tonke_key,token)
}
// 拿到 用户信息
export function getUser(){
    // return JSON.parse(localStorage.getItem(user_key))
    return localStorage.getItem(user_key)
}
// 设置用户信息
export function setUser(user){
    console.log(user);
    return localStorage.setItem(user_key,JSON.stringify(user))
}
// 移出用户信息
export function removeUser(){
    localStorage.removeItem(tonke_key)
    localStorage.removeItem(user_key)
}