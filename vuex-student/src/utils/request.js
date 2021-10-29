import axios from "axios"
import { Loading ,Message } from 'element-ui';

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

let loading = {
    loadingInstance: null,
    open: function () {
        console.log("页面正在加载中");
        if (this.loadingInstance == null) {
            this.loadingInstance = Loading.service({
                target: ".main",
                text: "页面正在加载中",
            })
        }
    },
    close: function () {
        if (this.loadingInstance != null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}

// Add a request interceptor
request.interceptors.request.use(function (config) {
    loading.open()
    return config;
}, function (error) {
    loading.close()
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    loading.close()
    if(response.data.code!=2000){
        Message({
            message:response.data.message || "系统异常",
            type:"warning",
            duration:5000
        })
    }else{
        Message({
            message:response.data.message || "成功",
            type:"warning",
            duration:5000
        })
    }
    return response;
}, function (error) {
    loading.close()
    Message({
        message:response.data.message || "系统异常",
        type:"warning",
        duration:5000
    })
    return Promise.reject(error);
});

export default request