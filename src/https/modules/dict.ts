import axios from '@/https/axios.ts'

/**
 * 字典管理模块
 * @param data
 * @returns {Promise}
 */
//保存
export const save=(data:any)=>{
    return axios({
        url:'/dict/save',
        method:'post',
        data
    })
};

//删除
export const batchDelete=(data:any)=>{
    return axios({
        url:'/dict/delete',
        method:'post',
        data
    })
};
//分页查询
export const findPage=(data:any)=>{
    return axios({
        url:'/dict/findPage',
        method:'post',
        data
    })
};
