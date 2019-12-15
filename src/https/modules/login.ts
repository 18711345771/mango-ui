import axios from '@/https/axios.ts'

/**
 * 系统登录模块
 * @param data
 * @returns {Promise}
 */
//登录
export const login=(data:any)=>{
    return axios({
        url:'login',
        method:'post',
        data
    })
};

//登出
export const logout=()=>{
    return axios({
        url:'logout',
        method:'get'
    })
};