import request from "@/utils/request.js"

const BASE_URL = ""

// request.get(BASE_URL+"/db.json").then(res=>{   第一种形式
//     console.log("测试结果",res.data);
// }).catch(err=>{
//     console.log("Err",err);
// })

// request({   方式2
//     url:BASE_URL+"/db.json",
//     method: "get"
// }).then(res=>{
//     console.log(res.data,"测试结果2");
// }).catch(err=>{
//     console.log("Err",err);
// })

export default {
    getList() {
        let req = request({
            url: BASE_URL + "/db.json",
            method: "get"
        })
        return req
    }
}