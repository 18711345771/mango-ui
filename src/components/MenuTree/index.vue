<template>
    <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id">
        <template slot="title">
            <i :class="menu.icon" ></i>
            <span slot="title">{{menu.name}}</span>
        </template>
        <MenuTree v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
    </el-submenu>
    <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
    </el-menu-item>
</template>

<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator'
    import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
    @Component({
        components:{
            // MenuTree
        }
    })
    export default class MenuTree extends Vue{
        // @Prop() menu!:any;
        @Prop({
            type:Object,
            required:true
        }) menu!:any;
        handleRoute (menu:any) {
            //如果是嵌套页面，转换成iframe的path
            let path:string=getIFramePath(menu.url);
            console.log(path+'OK');
            if(!path){
                path=menu.url;
            }
            // 通过菜单URL跳转至指定路由
            this.$router.push("/"+path);
            this.$emit('updateTabs');
        }
        mounted(){
            console.log(this.menu.name);
        }
    }
</script>

<style scoped>

</style>