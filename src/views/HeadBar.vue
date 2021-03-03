<template>
    <div class="headbar" :style="{'background-color':themeColor}"
         :class="collapse?'position-collapse-left':'position-left'">
        <!-- 导航收缩 -->
        <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff"
               :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1" @click="onCollapse">
          <hamburger :isActive="collapse"></hamburger>
        </el-menu-item>
      </el-menu>
    </span>
        <!-- 导航菜单 -->
        <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo"
               :background-color="themeColor" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">{{$t("common.home")}}</el-menu-item>
        <el-menu-item index="2" @click="openWindow('https://gitee.com/liuge1988/kitty/wikis/Home')">{{$t("common.doc")}}</el-menu-item>
        <el-menu-item index="3" @click="openWindow('https://www.cnblogs.com/xifengxiaoma/')">{{$t("common.blog")}}</el-menu-item>
      </el-menu>
    </span>
        <!-- 工具栏 -->
        <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#14889A"
               :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1">
          <!-- 主题切换 -->
          <theme-picker class="theme-picker" :default="themeColor"
                        @onThemeChange="onThemeChange">
          </theme-picker>
        </el-menu-item>
        <el-menu-item index="2" v-popover:popover-lang>
          <!-- 语言切换 -->
          <li style="color:#fff;" class="fa fa-language fa-lg"></li>
          <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">
            <div class="lang-item" @click="changeLanguage('zh_cn')">简体中文</div>
            <div class="lang-item" @click="changeLanguage('en_us')">English</div>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="3" v-popover:popover-message>
          <!-- 我的私信 -->
          <el-badge :value="5" :max="99" class="badge" type="danger">
            <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-message" placement="bottom-end" trigger="click">
            <message-panel :data="data"></message-panel>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="4" v-popover:popover-notice>
          <!-- 系统通知 -->
          <el-badge :value="4" :max="99" class="badge" type="danger">
            <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>
          </el-badge>
          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
            <notice-panel></notice-panel>
          </el-popover>
        </el-menu-item>
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img :src="user.avatar" />{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
    </div>
</template>

<script lang="ts">
    import {Provide,Vue,Component} from 'vue-property-decorator'
    import {Getter} from 'vuex-class'
    import Hamburger from "@/components/Hamburger/index.vue"
    import ThemePicker from "@/components/ThemePicker/index.vue"
    import NoticePanel from "@/views/core/NoticePanel.vue"
    import MessagePanel from "@/views/core/MessagePanel.vue"
    import PersonalPanel from "@/views/core/PersonalPanel.vue"
    @Component({
        components:{
            Hamburger,
            ThemePicker,
            NoticePanel,
            MessagePanel,
            PersonalPanel
        }
    })
    export default class HeadBar extends Vue{
        @Provide()user: any={
            name: "Louis",
            avatar: "",
            role: "超级管理员",
            registeInfo: "注册时间：2018-12-20 "
        };
        @Provide()data:any=[
            {
                key: "1",
                avatar:'@/assets/img/user.png',
                content:'你修改了用户密码',
                sender:'诸葛亮',
                time:'5分钟前'
            },
            {
                key: "2",
                avatar:'@/assets/img/user.png',
                content:'你修改了用户头像',
                sender:'武则天',
                time:'2小时前'
            },
            {
                key: "3",
                avatar:'@/assets/img/user.png',
                content:'今日25名新成员加入',
                sender:'王语嫣',
                time:'昨天'
            },
            {
                key: "4",
                avatar:'@/assets/img/user.png',
                content:'您发表了一篇新随笔',
                sender:'苍井空',
                time:'昨天'
            },
            {
                key: "5",
                avatar:'@/assets/img/user.png',
                content:'您发表了一篇新随笔',
                sender:'上官婉儿',
                time:'前天'
            }
        ];
        @Provide() activeIndex:any= '1';
        @Provide() langVisible:boolean=false;
        @Getter("collapse") collapse:any;
        @Getter("themeColor") themeColor:any;
        openWindow(url:string) {
            window.open(url)
        };
        selectNavBar(key:any, keyPath:any) {
            console.log(key, keyPath)
        };
        // 折叠导航栏
        onCollapse() {
            this.$store.commit('onCollapse')
        };
        // 切换主题
        onThemeChange(themeColor:string) {
            this.$store.commit('setThemeColor', themeColor)
        };
        // 语言切换
        changeLanguage(lang:string) {
            lang === '' ? 'zh_cn' : lang;
            this.$i18n.locale = lang;
            this.langVisible = false
        }
        mounted() {
            let user = sessionStorage.getItem("user");
            if (user) {
                this.user.name = user;
                this.user.avatar = require("@/assets/img/user.png");
            }
        };

    }
</script>

<style scoped lang="scss">
    .headbar {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1030;
        height: 60px;
        line-height: 60px;
        border-color: rgba(180, 190, 190, 0.8);
        border-left-width: 1px;
        border-left-style: solid;
    }
    .hamburg {
        float: left;
    }
    .navbar {
        float: left;
    }
    .toolbar {
        float: right;
    }
    .lang-item {
        font-size: 16px;
        padding-left: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        cursor: pointer;
    }
    .lang-item:hover {
        font-size: 18px;
        background: #b0d6ce4d;
    }
    .user-info {
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin: 10px 0px 10px 10px;
            float: right;
        }
    }
    .badge {
        line-height: 18px;
    }
    .position-left {
        left: 200px;
    }
    .position-collapse-left {
        left: 65px;
    }
</style>