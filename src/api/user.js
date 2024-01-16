// 导入 request.js 请求工具
import request from '@/utils/request.js'

// 提供调用注册接口的函数，使用箭头函数写法，registerData 表示函数接收的参数，userRegisterService 是函数名称
export const userRegisterService =(registerData)=>{
    // registerData 是 json 数据，无法直接当作 url 参数传递，因此需要处理
    // 借助于 UserSearchParams 完成传递
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key])
    }
    return request.post('/user/register',params)
}

// 提供调用登录接口的函数
export const userLoginService=(loginData)=>{
    const params=new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    return request.post("/user/login",params)
}

// 获取用户详细信息
export const userInfoService=()=>{
    return request.get('/user/userInfo')
}

// 更新修改个人信息
export const userInfoUpdateService=(userInfoData)=>{
    return request.put('/user/update',userInfoData)
}

//保存更新修改头像
export const userAvatarUpdateService=(avatarUrl)=>{
    const params=new URLSearchParams();
    params.append('avatarUrl',avatarUrl);
    return request.patch('/user/updateAvatar',params)
}

//独立作业：用户密码重置功能实现
export const userPasswordResetService=(resetData)=>{
    return request.patch('/user/updatePwd',resetData)
}