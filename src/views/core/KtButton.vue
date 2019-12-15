<template>
    <el-button :size="size" :type="type" :icon="icon"
               :loading="loading" :disabled="!hasPerms(perms)" @click="handleClick">
        {{label}}
    </el-button>
</template>

<script lang="ts">
    import { hasPermission } from '@/permission/index.ts'
    import {Vue,Component,Prop} from 'vue-property-decorator'
    @Component({
        components:{}
    })
    export default class KtButton extends Vue{
        @Prop()label!: {  // 按钮显示文本
            type: String,
            default: 'Button'
        };
        @Prop()icon!: {  // 按钮显示图标
            type: String,
            default: ''
        };
        @Prop() size!: {  // 按钮尺寸
            type: String,
            default: 'mini'
        };
        @Prop() type!: {  // 按钮类型
            type: String,
            default: null
        };
        @Prop() loading!: {  // 按钮加载标识
            type: Boolean,
            default: false
        };
        @Prop() disabled!: {  // 按钮是否禁用
            type: Boolean,
            default: false
        };
        @Prop() perms!: {  // 按钮权限标识，外部使用者传入
            type: String,
            default: null
        };
        handleClick() {
            // 按钮操作处理函数
            this.$emit('click', {})
        };
        hasPerms(perms:any) {
            // 根据权限标识和外部指示状态进行权限判断
            return hasPermission(perms) && !this.disabled
        }
    }
</script>

<style scoped>

</style>