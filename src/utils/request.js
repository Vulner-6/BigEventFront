//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';

// 美化提示信息
import { ElMessage } from 'element-plus'  

//定义一个变量,记录公共的前缀  ,  baseURL 此刻为了解决跨域问题，改成了 /api ，方便设置代理的时候进行替换
const baseURL = '/api';
const instance = axios.create({baseURL})

// request.js 文件中，这样导入无法使用 router
//import { useRouter } from 'vue-router';
//const router=useRouter()



// 添加请求拦截器
import {userTokenStore} from '@/stores/token.js'
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        //添加token
        const tokenStore=userTokenStore();
        //判断有没有token
        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token;
        }
        return config;
    },
    (err)=>{
        //请求错误的回调
        Promise.reject(err);
    }
)

// 懒加载引入 router ，否则可能会导致加载时机不对，无法解析 Login.vue 视图，非常离谱的错误！
const getRouter = () => import('@/router');
//import router from '@/router'
//添加响应拦截器
instance.interceptors.response.use(
    async result=>{
        // 判断业务状态码
        if(result.data.code===0){
            return result.data;
        }
        // 业务状态码为1，就弹出服务器端返回从校验信息
        if(result.data.code===1){
            ElMessage.error(result.data)
        }
        else{
            // 若是操作失败
            //alert(result.data.msg?result.data.msg:'操作失败！');
            //alert('服务异常');    这里美化了提示信息
            ElMessage.error('服务异常')
        }

        

        // 异步操作的状态转换成失败
        return Promise.reject(result.data);
    },
    async err=>{
        const router = await getRouter()
        if(err.response.status==401){
            // 未登录，跳转到登录页面
            ElMessage.error('请先登录')
            //router.push('/login')
            router.default.push('/login');  // 注意这里使用 router.default
        }
        
        else{
            //alert('服务异常');    这里美化了提示信息
             ElMessage.error('服务异常')
            
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
        
    }
)

export default instance;