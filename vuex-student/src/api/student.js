import request from "@/utils/request.js"

export default{
    search(page,size,searchMap){
        return request({
            url:"/student/list",
            method:"post",
            data :{
                page,
                size,
                searchMap
            }
        })
    },

    save(pojo){
        return request({
            url:"/student",
            method:"post",
            data:pojo
        })
    },

    getById(id){
        return request({
            url:"/student?id="+id,
            method:"get"
        })
    },

    update(pojo){
        return request({
            url:"/student",
            method:"put",
            data:pojo
        }) 
    },

    delete(id){
        return request({
            url:"/student",
            method:"delete",
            data:{
                id
            }
        }) 
    }
}