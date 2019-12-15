import {baseUrl} from '@/utils/global'

export default {
    method:'get',
    //基础URL前缀
    baseUrl:baseUrl,
    //请求头信息
    headers:{
        'Content-Type':'application/json;charset=UTF-8'
    },
    //参数
    data:{},
    timeout:10000,
    //携带凭证
    withCredentials:true,
    //返回数据类型
    responseType:'json'
}