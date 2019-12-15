import axios from '@/https/axios.ts'
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
//查询机构树
export const findDeptTree=()=>{
    return axios({
        url:'/dept/findTree',
        methood:'get'
    })
};