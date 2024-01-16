<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
// 控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

// 定义注册表单的数据模型，并绑定到对应的标签
const registerData=ref({
    username:'',
    password:'',
    rePassword:''
}
)

// 自定义表单校验规则：校验二次密码是否和第一次输入的一致，参考 element-plus 官方文档编写
const checkRePassword=(rule,value,callback)=>{
    if(value===''){
        callback(new Error("请再次确认密码！"))
    }else if(value!==registerData.value.password){
        callback(new Error('请确保两次输入的密码一样！'))
    }else{
        callback()
    }
}


// 定义表单校验规则，由于使用的是 Element-Plus ，所以，表单校验规则需要参考官方文档进行编写
const rules={
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {min:5,max:16,message:'请输入用户名长度在5-16位非空字符',trigger:'blur'}
    ],
    password:[
        {required:true,message:'请输入密码',trigger:'blur'},
        {min:5,max:16,message:'请输入密码长度在5-16位非空字符',trigger:'blur'}
    ],
    rePassword:[
        {validator:checkRePassword,trigger:'blur'}
    ]
}

// 美化提示信息
import { ElMessage } from 'element-plus'

// 点击注册按钮后，触发这里的方法，发送请求至后端接口，完成注册
import {userRegisterService,userLoginService} from '@/api/user.js'
const register=async()=>{
    // 上面自定义的 registerData 变量是 ref 响应式变量，要想获取值，需要 registerData.value
    let result=await userRegisterService(registerData.value)
    
    /*
    // 这里的 result.code 和 result.msg ，都是后端开发时，当初定义的返回数据 json 格式。
    if(result.code===0){
        // 成功了
        alert(result.msg?result.msg:'注册成功！')
    }else{
        // 失败了
        alert("注册失败！")
    }
    */

    // 利用改良后的响应拦截器，若代码到这里，则说明成功。
    //alert(result.msg?result.msg:'注册成功！')
    // 美化提示信息的写法
    ElMessage({message: '注册成功！',type: 'success',})

}

// 绑定登录表单数据的时候，复用了注册表单的数据模型，因此这里没有重新定义登录数据模型
// 表单数据校验也是复用注册表单的，也没有创建新的规则

// 使用路由，方便用户点击登录按钮后，能自动跳转主页
import {useRouter} from 'vue-router'
const router=useRouter()

// 为了能记录后端的 token，这里使用 pinia
import {userTokenStore} from '@/stores/token.js'
const tokenStore=userTokenStore();

// 登录功能点击后触发的函数
const login=async()=>{
    // 调用接口，完成登录
    let result=await userLoginService(registerData.value)
    
    /*
    if(result.code===0){
        alert(result.msg?result.msg:'登录成功！')
    }else{
        alert("登录失败！")
    }
    */

    // 利用改良后的响应拦截器，若代码到这里，说明成功
    //alert(result.msg?result.msg:'登录成功！')
    // 美化提示信息的写法
    ElMessage({message: '登录成功！',type: 'success',})
    
    // 记录后端传过来的 token
    tokenStore.setToken(result.data);

    // 跳转到主界面
    router.push('/')
}

// 定义清空数据模型，使用户点击注册或返回按钮时，数据清空
const clearRegisterData=()=>{
    registerData.value={
        username:'',
        password:'',
        rePassword:''
    }
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单，使用 :model 绑定 script 标签中的的表单数据 registerData ，使用 :rules 绑定 rules 表单校验规则 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <!--prop 指定使用表单校验规则中 username 那一项-->
                <el-form-item prop="username">
                    <!-- v-model 绑定 script 标签中定义的 registerData.username -->
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <!--prop 指定使用表单校验规则中 password 那一项-->
                <el-form-item prop="password">
                    <!-- v-model 绑定 script 标签中定义的 registerData.password-->
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <!--prop 指定使用表单校验规则中 rePassword 那一项-->
                <el-form-item prop="rePassword">
                    <!-- v-model 绑定 script 标签中定义的 registerData.rePassword-->
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <!--绑定注册事件-->
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <!--如果一个点击事件想执行多个函数，用分号分割-->
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()" >
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 ,这里复用注册表单的 registerData 变量信息，并复用注册表单的校验规则-->
            <el-form ref="form" size="large" autocomplete="off" :model="registerData" :rules="rules" v-else>
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <!--prop 指定使用表单校验规则中 username 那一项-->
                <el-form-item prop="username">
                    <!--这里复用注册表单的 registerData.username-->
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <!--prop 指定使用表单校验规则中 password 那一项-->
                <el-form-item prop="password">
                    <!--这里复用注册表单的 registerData.password-->
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <!--添加点击事件，点击后进行登录操作-->
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <!--如果一个点击事件想执行多个函数，用分号分割-->
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()" >
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>