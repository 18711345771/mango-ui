import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/store'
import api from '@/https/api.ts'
import {getIFramePath, getIFrameUrl} from "@/utils/iframe";
import {resolve} from "q";
// import '@/mock/index.ts'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
       {
           path:'',
           name:'系统介绍',
           component:()=>import('@/views/Intro/Intro.vue'),
           meta:{
               icon:'fa fa-home fa-lg',
               index:0
           }
       }
    ]
  },
  {
    path: '/404',
    name: 'notFind',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  },
    {
        path: '/login',
        name: 'login',
        component: ()=>import('@/views/Login.vue')
    }
]

const router:any = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/mango-ui',
  routes
});

router.beforeEach((to:any,from:any,next:any)=>{
  //登录界面在登陆成功之后会把用户信息保存在会话
    //存在时间为会话生命周期，页面网关即失效
    let userName=sessionStorage.getItem('user');
    if(to.path==='/login'){
      //如果是登录的路由，且会话信息存在，则代表已经登录过，直接跳转到主页
        if(userName){
          next({path:'/'});
        }else{
          next();
        }
    }else{
      if(!userName){
        next({path:'/login'});
      }else{
        //加载动态菜单和路由
          addDynamicMenuAndRoutes(userName,to,from);
        next();
      }
    }
});

/**
 * 加载动态菜单和路由
 * @param {string} userName
 * @param to
 * @param from
 */
function addDynamicMenuAndRoutes(userName:string,to:any,from:any):void{
  if(store.state.menuRouteLoaded){
      console.log('动态菜单和路由已经存在.')
      return;
  }
    api.menu.findNavTree({'userName':userName})
        .then((res:any) => {
            // 添加动态路由
            let dynamicRoutes = addDynamicRoutes(res.data)
            router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes);
            router.addRoutes(router.options.routes)
            // 保存加载状态
            store.commit('menuRouteLoaded', true)
            // 保存菜单树
            store.commit('setNavTree', res.data)
        }).then((res:any) => {
        api.user.findPermissions({'name':userName}).then((res:any) => {
            // 保存用户权限标识集合
            store.commit('setPerms', res.data)
        })
    })
        .catch(function(res) {
        })
}

/**
 * 处理IFrame嵌套页面
 * @param {string} path
 * @returns {{}}
 */
function handleIframeUrl(path:string){
    //嵌套页面，保存iframeUrl到store，共IFrame读取展示
    let url=path;
    let length=store.state.iframeUrls.length;
    for(let i=0;i<length;i++){
        let iframe=store.state.iframeUrls[i];
        if(path!=null&&path.endsWith(iframe.path)){
            url=iframe.url;
            store.commit('setIFrameUrl',url);
            break;
        }
    }
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes (menuList:any= [], routes:any = []) {
    var temp:any = []
    for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length >= 1) {
            temp = temp.concat(menuList[i].children)
        } else if (menuList[i].url&& /\S/.test(menuList[i].url)) {//注意此处的正则表达式！！！// && /\S/.test(menuList[i].url)
            menuList[i].url = menuList[i].url.replace(/^\//, '')//去掉开头的/
            // console.log(menuList[i].url+"----------------------");
            // 创建路由配置
            let route:any = {
                path: menuList[i].url,
                component: null,
                name: menuList[i].name,
                meta: {
                    icon: menuList[i].icon,
                    index: menuList[i].id
                }
            }
            let path=getIFramePath(menuList[i].url);
            if(path){
                //如果是嵌套页面，通过iframe展示
                route['path']=path;
                route['component']=(resolve:any)=>require([`@/views/IFrame/IFrame.vue`],resolve);
                //存储嵌套页面路由路径和访问URL
                let url=getIFrameUrl(menuList[i].url);
                let iFrameUrl:any;
                iFrameUrl={'path':path,'url':url};
                store.commit('addIFrameUrl',iFrameUrl);
            }else {
                try {
                    // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
                    // 如url="sys/user"，则组件路径应是"@/views/sys/User.vue",否则组件加载不到
                    let array = menuList[i].url.split('/')
                    let url = '';
                    for(let i=0; i<array.length; i++) {
                        url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
                    }
                    url = url.substring(0, url.length - 1)
                    console.log(url+"+********************");
                    route['component'] = (resolve:any) => require([`@/views/${url}`], resolve)
                } catch (e) {}
            }
            routes.push(route)
        }
    }
    if (temp.length >= 1) {
        addDynamicRoutes(temp, routes)
    } else {
        console.log('动态路由加载...')
        console.log(routes)
        console.log('动态路由加载完成.')
    }
    return routes
}

export default router
