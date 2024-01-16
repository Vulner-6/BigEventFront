// 定义 store
import {defineStore} from 'pinia'
// 导入响应式对象，后面会用
import {ref} from 'vue'

/*
第一个参数：名字唯一性
第二个参数：函数，函数的内部可以定义状态的所有内容

返回值：函数
*/
export const userTokenStore=defineStore('token',()=>{
    // 下面都是定义状态的内容

    //1.响应式变量
    const token=ref('')

    //2.定义一个函数修改token的值
    const setToken=(newToken)=>{
        token.value=newToken
    }

    //3.函数，移除token的值
    const removeToken=()=>{
        token.value=''
    }

    //4.返回定义的变量
    return {
        token,setToken,removeToken
    }
},{
    // 开启 persist 持久化存储插件
    persist:true
})
