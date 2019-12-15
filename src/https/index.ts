import api from './api'

const install =(Vue:any)=>{
    if((install as any).installed)
        return ;
    (install as any).installed=true;
    Object.defineProperties(Vue.prototype,{
        //注意，此处挂载在Vue原型的$api对象上
        $api:{
            get(){
                return api;
            }
        }
    })
};
export default install