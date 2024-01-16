import { createRouter,createWebHistory } from "vue-router";

// 导入组件，方便将访问路径与渲染的组件绑定
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'

// 导入组件，制定子路由
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPassword from '@/views/user/UserResetPassword.vue'


// 定义路由关系redirect 属性是重定向，这里默认重定向到 /article/category
const routes=[
    {path:'/login',component:LoginVue},    
    {path:'/',component:LayoutVue,redirect:'/article/manage',children:[
        // 定义子路由
        {path:'/article/category',component:ArticleCategoryVue},
        {path:'/article/manage',component:ArticleManageVue},
        {path:'/user/avatar',component:UserAvatarVue},
        {path:'/user/info',component:UserInfoVue},
        {path:'/user/resetPassword',component:UserResetPassword},

    ]}
]

// 创建路由器
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})

// 导出路由
export default router