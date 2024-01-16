<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'
import avatar from '@/assets/default.png'
const uploadRef = ref()

import {userTokenStore} from '@/stores/token.js'
const tokenStore=userTokenStore()

import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore=useUserInfoStore()
//用户头像地址
const imgUrl= ref(userInfoStore.info.userPic)

// 图片上传成功的回调函数
const uploadSuccess=(result)=>{
    imgUrl.value=result.data
}

import {userAvatarUpdateService} from '@/api/user.js'
import { ElMessage } from 'element-plus'
//头像修改
const updateAvatar=async()=>{
    //调用接口
     let result=await userAvatarUpdateService(imgUrl.value)
     ElMessage.success(result.msg?result.msg:"头像修改成功！")

     //修改pinia中的数据
     userInfoStore.info.userPic=imgUrl.value;
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <!--
                    :auto-upload 自动上传
                    action="/api/upload"  别忘了这里的api是自己当初设置的前端路由标志，会被请求拦截器替换为空
                    name 是参数名称
                    :headers 是请求头，里面要加凭证
                    :on-success 是上传成功后要执行的回调函数
                -->
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader" 
                    :show-file-list="false"
                    :auto-upload="true"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else :src="avatar" width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                    选择图片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                    上传头像
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>