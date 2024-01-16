<script setup>
import {ref} from 'vue'

// 自定义表单校验规则：校验二次密码是否和第一次输入的一致，参考 element-plus 官方文档编写
const checkre_pwd=(rule,value,callback)=>{
    if(value===''){
        callback(new Error("请再次确认密码！"))
    }else if(value!==resetData.value.new_pwd){
        callback(new Error('请确保两次输入的密码一样！'))
    }else{
        callback()
    }
}


// 定义表单校验规则，由于使用的是 Element-Plus ，所以，表单校验规则需要参考官方文档进行编写
const rules={
    old_pwd:[
        {required:true,message:'请输入旧密码',trigger:'blur'},
        {min:5,max:16,message:'请输入旧密码长度在5-16位非空字符',trigger:'blur'}
    ],
    new_pwd:[
        {required:true,message:'请输入新密码',trigger:'blur'},
        {min:5,max:16,message:'请输入新密码长度在5-16位非空字符',trigger:'blur'}
    ],
    re_pwd:[
        {validator:checkre_pwd,trigger:'blur'}
    ]
}

// 定义注册表单的数据模型，并绑定到对应的标签
const resetData=ref({
    old_pwd:'',
    new_pwd:'',
    re_pwd:''
}
)

// 重置密码
import {userPasswordResetService} from '@/api/user.js'
import { ElMessage } from 'element-plus'
const resetPassword=async()=>{
    let result=await userPasswordResetService(resetData.value);
    ElMessage.success(result.msg?result.msg:"密码重置成功！")
}

</script>

<template>
    <el-col :span="6" :offset="3" class="form">
    <!-- 登录表单 ,这里复用注册表单的 resetData 变量信息，并复用注册表单的校验规则-->
    <el-form ref="form" size="large" autocomplete="off" :model="resetData" :rules="rules">
                <el-form-item>
                    <h1>密码重置</h1>
                </el-form-item>
                <!--prop 指定使用表单校验规则中 old_pwd 那一项-->
                <el-form-item prop="old_pwd">
                    <!--这里复用注册表单的 resetData.old_pwd-->
                    <el-input name="old_pwd" :prefix-icon="Lock" type="password" placeholder="请输入你的旧密码" v-model="resetData.old_pwd"></el-input>
                </el-form-item>
                <!--prop 指定使用表单校验规则中 password 那一项-->
                <el-form-item prop="new_pwd">
                    <!--这里复用注册表单的 resetData.password-->
                    <el-input name="new_pwd" :prefix-icon="Lock" type="password" placeholder="请输入要重置的密码" v-model="resetData.new_pwd"></el-input>
                </el-form-item>
                <el-form-item prop="re_pwd">
                    <!--这里复用注册表单的 resetData.re_pwd-->
                    <el-input name="re_pwd" :prefix-icon="Lock" type="password" placeholder="再次确认密码" v-model="resetData.re_pwd"></el-input>
                </el-form-item>
               
                <!-- 登录按钮 -->
                <el-form-item>
                    <!--添加点击事件，点击后进行登录操作-->
                    <el-button class="button" type="primary" auto-insert-space @click="resetPassword">重置密码</el-button>
                </el-form-item>
                
            </el-form>
        </el-col>
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