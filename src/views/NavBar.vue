<template>
    <div class="menu-bar-container">
        <!-- logo -->
        <div class="logo" :style="{'background':themeColor}" @click="$router.push('/')"
             :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
            <img v-if="collapse"  src="@/assets/logo.png"/> <div>{{collapse?'':appName}}</div>
        </div>
        <!-- 导航菜单 -->
        <el-menu ref="navmenu" default-active="2" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
                 :collapse="collapse" :collapse-transition="false" :unique-opened="true  "
                 @open="handleopen" @close="handleclose" @select="handleselect">
            <!-- 导航菜单树组件，动态加载菜单 -->
            <!--@updateTabs="handleRouteChange($route)"-->
            <menu-tree v-for="item in navTree" :key="item.id" :menu="item" @updateTabs="handleRouteChange($route)"></menu-tree>
        </el-menu>
    </div>
</template>

<script lang="ts">
    import {Vue,Component,Provide,Watch} from 'vue-property-decorator'
    import MenuTree from '@/components/MenuTree/index.vue'
    import {State,Getter,Action} from 'vuex-class'
    @Component({
        components:{
            MenuTree
        }
    })
    export default class NavBar extends Vue{
        @State("appName") appName:any;
        @State("themeColor")themeColor:any;
        @State("collapse")collapse:any;
        @State("navTree") navTree:any;


        // activeIndex:any=1;

        get mainTabs():any[]{
            return this.$store.state.mainTabs;
        };
        set mainTabs(val:any[]){
            this.$store.commit('updateMainTabs', val);
        };
        get mainTabsActiveName():string|undefined{
            return this.$store.state.mainTabsActiveName;
        }

        set mainTabsActiveName(val:string|undefined){
            this.$store.commit('mainTabsActiveName',val);
        }
        @Watch("$route") handleRouteChange(route:any){
            // tab标签页选中, 如果不存在则先添加
            var tab = this.mainTabs.filter((item:any) => item.name === route.name)[0];
            if (!tab) {
                tab = {
                    name: route.name,
                    title: route.name,
                    icon: route.meta.icon
                }
                this.mainTabs = this.mainTabs.concat(tab)
            }
            this.mainTabsActiveName = tab.name;
            console.log(this.mainTabsActiveName);
            // 切换标签页时同步更新高亮菜单
            if(this.$refs.navmenu != null) {
                (this.$refs.navmenu as any).activeIndex = '' + route.meta.index
                (this.$refs.navmenu as any).initOpenedMenu()
            }
        }
        created(){
            this.handleRouteChange(this.$route);
        }

        handleopen() {
            console.log('handleopen')
        };
        handleclose() {
            console.log('handleclose')
        };
        handleselect(a:any, b:any) {
            console.log('handleselect')
        }
    }
</script>

<style scoped lang="scss">
    .menu-bar-container {
        position: fixed;
        top: 0px;
        left: 0;
        bottom: 0;
        z-index: 1020;
        .el-menu {
            position:absolute;
            top: 60px;
            bottom: 0px;
            text-align: left;
            // background-color: #2968a30c;
        }
        .logo {
            position:absolute;
            top: 0px;
            height: 60px;
            line-height: 60px;
            background: #545c64;
            cursor:pointer;
            img {
                width: 40px;
                height: 40px;
                border-radius: 0px;
                margin: 10px 10px 10px 10px;
                float: left;
            }
            div {
                font-size: 25px;
                color: white;
                text-align: left;
                padding-left: 20px;
            }
        }
        .menu-bar-width {
            width: 200px;
        }
        .menu-bar-collapse-width {
            width: 65px;
        }
    }

</style>