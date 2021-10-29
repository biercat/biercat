import request from "@/utils/request.js"

export function register(username,nikename,password){
    return request({
        url:"/user/register",
        method:"post",
        data:{
            username,
            nikename,
            password
        }
    })
}

export function login(username,password){
    return request({
        url:"/user/login",
        method:"post",
        data:{
            username,
            password
        }
    })
}

export function getUserInfo(token){
    return request({
        url:"/user/info?token="+token,   //"/user/info?token="+token  `/user/info?token=${token}`
        method:"get",
    })
}

export function logout(token){
    return request({
        url:'/user/logout',
        method:'post',
        data:{
            token
        }
    })
}