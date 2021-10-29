import request from "@/utils/request.js"

export default{
    getPass(msg){
        return request({
            url:"/user/pwd",
            method:"post",
            data:msg
        })
    },

    update(msg){
        return request({
            url:"/user/pwd",
            method:"put",
            data:msg
        })
    }
}