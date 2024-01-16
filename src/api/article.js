import request from '@/utils/request.js'
import { userTokenStore } from '@/stores/token.js'
// 文章分类列表查询
export const articleCategoryListService=()=>{
    const tokenStore=userTokenStore();
    // 在 pinia 中定义的 ref() 响应式数据，不需要 .value 格式赋值取值
    //console.log("当前进入了 article.js")
    //return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    // 添加请求拦截器之后，就不用向上面这一行代码这样手动添加身份 token 了
    return request.get('/category')
}

// 文章分类添加
export const articleCategoryAddService=(categoryData)=>{
    // 如果 categoryData 是json格式数据，这里可以直接附加
    return request.post('/category',categoryData);
}

// 文章分类列表修改
export const articleCategoryUpdateService=(categoryData)=>{
    return request.put('/category',categoryData)
}

// 文章分类列表删除
export const articleCategoryDeleteService=(id)=>{
    return request.delete('/category?id='+id)
}

// 文章列表查询
export const articleListService=(params)=>{
    return request.get('/article',{params:params})
}

//保存添加文章
export const articleAddService=(articleData)=>{
    return request.post('/article',articleData)
}