import { getToken,setToken,getUser,setUser,removeUser } from "../../utils/auth";
import { login,getUserInfo,logout } from "../../api/login";

export default{
    namespaced: true,
    state: {
        token:getToken(),
        user:getUser()
    },
    mutations: {
       set_token(state,token){
        state.token=token
        setToken(token)
       },
       set_user(state,user){
        state.user=user
        // console.log(state.user);
        setUser(user)
       } 
    },
    actions: {
        Login({commit},form){
            return new Promise((resolve,reject)=>{
                login(form.username,form.password).then(res=>{
                    let resArr=res.data
                    commit("set_token",resArr.data.token)
                    resolve(resArr)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        GetUser({commit,state}){
            return new Promise((res,rej)=>{
                getUserInfo(state.token).then(response=>{
                    let resArr=response.data
                    commit("set_user",resArr.data)
                    res(resArr)
                }).catch(err=>{
                    rej(err)
                })
            })
        },
        Logout({commit,state}){
            return new Promise((resolve,reject)=>{
                logout(state.token).then(res=>{
                    let resArr=res.data
                    commit("set_token","")
                    commit("set_user",null)
                    removeUser()
                    resolve(resArr)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
}