import axios from '@/https/axios.ts'

/**
 * 用户管理模块
 * @param data
 * @returns {Promise}
 */
//保存
export const save=(data:any)=>{
    return axios({
        url:'/user/save',
        method:'post',
        data
    })
};

//删除
export const batchDelete=(data:any)=>{
    return axios({
        url:'/user/delete',
        method:'post',
        data
    })
};
//分页查询
export const findPage=(data:any)=>{
    return axios({
        url:'/user/findPage',
        method:'post',
        data
    })
};

//查找用户的菜单权限标志集合
export const findPermissions=(params:any)=>{
    return axios({
        url:'/user/findPermissions',
        method:'get',
        params
    })
};