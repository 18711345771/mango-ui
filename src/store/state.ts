const state:any={
    appName:"Mango Platform",//应用名称
    themeColor:'#14889A',//主题颜色
    oldThemeColor:'#14889A',//上一次主题颜色
    collapse:false,//导航栏收缩状态
    menuRouteLoaded:false,//菜单和路由是否已经加载

    navTree:[],//导航菜单树

    perms:[],//用户权限标志集合

    //主入口标签页
    mainTabs:[],
    //当前标签页名
    mainTabsActiveName:'',

    //当前嵌套页面路由路径
    iframeUrl:[],
    //所有嵌套页面路由路径访问URL
    iframeUrls:[],
};
export default state