<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:log:view" type="primary" @click="findPage(null)"/>
                </el-form-item>
            </el-form>
        </div>
        <!--表格内容栏-->
        <kt-table
                :data="pageResult" :columns="columns" :showOperation="showOperation" @findPage="findPage">
        </kt-table>
    </div>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator'
    import KtTable from "@/views/core/KtTable.vue"
    import KtButton from "@/views/core/KtButton.vue"
    import { format } from "@/utils/datetime"
    @Component({
        components:{
            KtTable,
            KtButton
        }
    })
    export default class Log extends Vue{
        size:string= 'small';
        filters:any= {
            name: ''
        };
        columns:any= [
            {prop:"id", label:"ID", minWidth:60},
            {prop:"userName", label:"用户名", minWidth:100},
            // {prop:"operation", label:"操作", minWidth:120},
            {prop:"method", label:"方法", minWidth:180},
            {prop:"params", label:"参数", minWidth:220},
            {prop:"ip", label:"IP", minWidth:120},
            {prop:"time", label:"耗时", minWidth:80},
            {prop:"createBy", label:"创建人", minWidth:100},
            {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
            // {prop:"lastUpdateBy", label:"更新人", minWidth:100},
            // {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
            ];
        pageRequest:any= { pageNum: 1, pageSize: 10 ,params:[{}] };
        pageResult:any= {};
        showOperation:boolean=false;
        // 获取分页数据
        findPage(data:any) {
            if(data !== null) {
                this.pageRequest = data.pageRequest
            }
            this.pageRequest.params = [{name:'userName', value:this.filters.name}]
            (this as any).$api.log.findPage(this.pageRequest).then((res:any) => {
                this.pageResult = res.data
            }).then(data!=null?data.callback:'')
        };
        // 时间格式化
        dateFormat(row:any, column:any, cellValue:any, index:any){
            return format(row[column.property])
        }
        mounted() {
        }
    }
</script>

<style scoped>

</style>