<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

//调用函数，获取用户详细信息
import { userInfoService } from '@/api/user.js';
import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore=useUserInfoStore()
const getUserInfo=async()=>{
    //调用接口
    let result=await userInfoService();
    //用户信息存储到 pinia 中
    userInfoStore.setInfo(result.data)
}
getUserInfo();

// 下拉菜单中条目被点击后执行的函数
import {useRouter} from 'vue-router'
const router=useRouter()
import { userTokenStore } from '@/stores/token.js';
import { ElMessageBox,ElMessage } from 'element-plus'
const tokenStore=userTokenStore();
const handleCommand=(command)=>{
    // 判断指令
    if(command==="logout"){
        //退出登录
        // 从 element-plus 上复制的代码
        ElMessageBox.confirm(
        '你确认要退出登录吗?',
        '温馨提示',
        {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        }
    )
        .then(async() => {
            // 退出登录
            //1.清空pinia中存储的token和个人信息
            tokenStore.removeToken()
            userInfoStore.removeInfo()
            //2.跳转到登录页面
            router.push("/login")

            ElMessage({
                type: 'success',
                message: '退出登录成功！',
            })
            
            
            })
            .catch(() => {
            ElMessage({
                type: 'info',
                message: '用户取消退出登录！',
            })
        })

    }
    else{
        // 路由至个人信息相关功能模块
        router.push('/user/'+command)
    }
}

</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
                router>
                <!--index 属性的值不能重复，填写路由访问路径，有点像 href 属性-->
                <el-menu-item index="/article/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu >
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>黑马程序员：<strong>{{ userInfoStore.info.nickname }}</strong></div>
                <!--下拉菜单，注意这里的 @command，让其捆绑自定义的事件处理函数，用于对下面个人信息中捆绑的command属性进行处理-->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <!--如果用户有头像就显示用户头像，否则显示默认头像-->
                        <el-avatar :src="userInfoStore.info.userPic?userInfoStore.info.userPic:avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    
                    <template #dropdown>
                        <el-dropdown-menu>
                            <!--command 表示当前条目被点击后会触发，在事件函数上可以声明一个参数，接收条目对于的指令-->
                            <!--command="info" 这里的info指的是当初在 /router/index.js 中设置的路由-->
                            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <!--
                    <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div>
                -->
                <!--内容展示区，根据子路由显示不同的页面-->
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>