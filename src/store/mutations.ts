import {MutationTree} from "vuex";

const mutations:MutationTree<any>={
    //改变收缩状态
    onCollapse(state:any):void{
        state.collapse=!state.collapse;
    },
    //改变主题颜色
    setThemeColor(state:any,themeColor:any):void{
        state.oldThemeColor=state.themeColor;
        state.themeColor=themeColor;
    },
    //改变菜单和路由的加载状态
    menuRouteLoaded(state:any,menuRouteLoaded:any):void{
        state.menuRouteLoaded=menuRouteLoaded;
    },

    //设置导航菜单树
    setNavTree(state:any,navTree:any[]):void{
        state.navTree=navTree;
    },

    //设置用户权限标志集合
    setPerms(state:any,perms:any[]):void{
        state.perms=perms;
    },

    //更新主入口标签页
    updateMainTabs(state:any,tabs:any[]){
        state.mainTabs=tabs;
    },
    //更新当前标签页名
    updateMainTabsActiveName(state:any,name:string){
        state.mainTabsActiveName=name;
    },

    //设置当前嵌套页面路由路径
    setIFrameUrl(state:any,iframeUrl:any[]){
        state.iframeUrl=iframeUrl;
    },
    //添加路由路径
    addIFrameUrl(state:any,iframeUrl:any[]){
        state.iframeUrls.push(iframeUrl);
    }

};
export default mutations