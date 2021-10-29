import request from "@/utils/request"

export default {
    getList() {
        return request({
            url: "/teacher/list",
            method: "get"
        })
    },
    seacrch(page, size, searchMap) {
        return request({
            url: "/teacher/list",
            method: "post",
            data: {
                page,
                size,
                searchMap
            }
        })
    },
    add(pojo) {
        return request({
            url: "/teacher",
            method: "post",
            data: pojo
        })
    },
    getId(id) {
        return request({
            url: "/teacher?id=" + id,
            method: "get",
        })
    },
    update(pojo) {
        return request({
            url: "/teacher",
            method: "put",
            data:pojo
        })
    },
    delete(id){
        return request({
            url:"/teacher",
            method:"delete",
            data :{
                id
            }
        })
    }

}