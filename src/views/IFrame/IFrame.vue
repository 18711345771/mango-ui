<template>
    <div class="iframe-container">
        <iframe :src="src" scrolling="auto" frameborder="0" class="frame" :onload="onloaded()">
        </iframe>
    </div>
</template>

<script lang="ts">
    import {Component,Vue,Watch} from 'vue-property-decorator'
    @Component({
        components:{}
    })
    export default class IFrame extends Vue{
        src: string="";
        loading:any= null;
        // 获取路径
        resetSrc(url:string) {
            this.src = url
            this.load()
        };
        load() {
            this.loading = this.$loading({
                lock: true,
                text: "loading...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.5)",
                // fullscreen: false,
                target: document.querySelector("#main-container ")
            } as any);
        };
        onloaded(){
            if(this.loading!=null) {
                this.loading.close()
            }
        };
        mounted() {
            this.resetSrc(this.$store.state.iframeUrl);
        };
        @Watch("$route") handler(val:any, oldVal:any) {
            // 如果是跳转到嵌套页面，切换iframe的url
            this.resetSrc(this.$store.state.iframeUrl);
        }

    }
</script>

<style lang="scss">
    .iframe-container {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;;
        bottom: 0px;
        .frame {
            width: 100%;
            height: 100%;
        }
    }
</style>
