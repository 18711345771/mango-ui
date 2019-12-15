<template>
    <div>
        <el-popover ref="popover" :placement="placement" trigger="click">
            <el-tree
                    :data="data"
                    :props="props"
                    node-key="nodeKey"
                    ref="popupTree"
                    @current-change="currentChangeHandle"
                    :default-expand-all="defaultExpandAll"
                    :highlight-current="true"
                    :expand-on-click-node="true">
            </el-tree>
        </el-popover>
        <el-input v-model="prop" v-popover:popover :readonly="true" :placeholder="placeholder" style="cursor:pointer;"></el-input>
    </div>
</template>

<script lang="ts">
    import {Vue,Component,Prop} from 'vue-property-decorator'
    @Component({
        components:{}
    })
    export default class PopupTreeInput extends Vue{
        @Prop()data:any={
            type: Array,
            default:[]
        };
        @Prop() props:any={
            type: Object,
            default: {}
        };
        @Prop() prop:any={
            type: String,
            default: ''
        };
        @Prop()nodeKey:any={
            type: String,
            default: ''
        };
        @Prop()placeholder:any= {
            type: String,
            default: '点击选择内容'
        };
        @Prop()placement:any=  {
            type: String,
            default: 'right-start'
        };
        @Prop()defaultExpandAll:any= {
            type: Boolean,
            default: false
        };
        @Prop()currentChangeHandle:any= {
            type: Function,
            default: null
        };
    }
</script>

<style scoped>

</style>