import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import router from '@/router'


export default function $axios(options:any){
    return new Promise((resolve,reject)=>{
        const instance = axios.create({
            baseURL:config.baseUrl,
            headers:config.headers,
            timeout:config.timeout,
            withCredentials:config.withCredentials
        })
        instance.interceptors.request.use(
            (config:AxiosRequestConfig)=>{
            let token=Cookies.get('token')
            if(token){
                config.headers.token=token;
            }else{
                // alert('这不是/是第一次登录！');
                router.push('/login')
            }
            return config;
        },
            (error:any) =>{
            return Promise.reject(error);
        })
        instance.interceptors.response.use(
            (res:AxiosResponse)=>{
                return res.data;
        },
            (error:any)=>{
                return Promise.reject(error);
        })
        //请求处理
        instance(options).then((res:any)=>{
            resolve(res);
            return false;
        }).catch((error:any)=>{
            reject(error);
        })

    })
}