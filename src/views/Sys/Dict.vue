<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-form-item>
                    <el-input v-model="filters.label" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dict:view" type="primary" @click="findPage(null)"/>
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
                </el-form-item>
            </el-form>
        </div>
        <!--表格内容栏-->
        <kt-table permsEdit="sys:dict:edit" permsDelete="sys:dict:delete"
                  :data="pageResult" :columns="columns"
                  @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
        </kt-table>
        <!--新增编辑界面-->
        <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-form-item label="ID" prop="id"  v-if="false">
                    <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="label">
                    <el-input v-model="dataForm.label" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="值" prop="value">
                    <el-input v-model="dataForm.value" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="dataForm.type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="dataForm.sort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述 " prop="description">
                    <el-input v-model="dataForm.description" auto-complete="off" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input v-model="dataForm.remarks" auto-complete="off" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import KtTable from "@/views/core/KtTable.vue"
    import KtButton from "@/views/core/KtButton.vue"
    import { format } from "@/utils/datetime"
    import {Component,Vue} from 'vue-property-decorator'
    @Component({
        components:{
            KtTable,
            KtButton
        }
    })
    export default class Dict extends Vue{
        size:string= 'small';
        filters:any={
            label: ''
        };
        columns:any= [
            {prop:"id", label:"ID", minWidth:50},
            {prop:"label", label:"名称", minWidth:100},
            {prop:"value", label:"值", minWidth:100},
            {prop:"type", label:"类型", minWidth:80},
            {prop:"sort", label:"排序", minWidth:80},
            {prop:"description", label:"描述", minWidth:120},
            {prop:"remarks", label:"备注", minWidth:120},
            {prop:"createBy", label:"创建人", minWidth:100},
            {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
            // {prop:"lastUpdateBy", label:"更新人", minWidth:100},
            // {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
            ];
        pageRequest:any={ pageNum: 1, pageSize: 10 };
        pageResult:any= {};

        operation:boolean= false; // true:新增, false:编辑
        editDialogVisible:boolean= false; // 新增编辑界面是否显示
        editLoading:boolean= false;
        dataFormRules: any={
            label: [
                { required: true, message: '请输入名称', trigger: 'blur' }
                ]
        };
        // 新增编辑界面数据
        dataForm:any={
            id: 0,
            label: '',
            value: '',
            type: '',
            sort: 0,
            description: '',
            remarks: ''
        };
        // 获取分页数据
        findPage(data:any) {
            if(data !== null) {
                this.pageRequest = data.pageRequest
            }
            this.pageRequest.params = [{name:'label', value:this.filters.label}];
            (this as any).$api.dict.findPage(this.pageRequest).then((res:any) => {
                this.pageResult = res.data
            }).then(data!=null?data.callback:'')
        };
        // 批量删除
        handleDelete(data:any) {
            (this as any).$api.dict.batchDelete(data.params).then(data!=null?data.callback:'')
        };
        // 显示新增界面
        handleAdd() {
            this.editDialogVisible = true;
            this.operation = true;
            this.dataForm = {
                id: 0,
                label: '',
                value: '',
                type: '',
                sort: 0,
                description: 'desc',
                remarks: 'remark'
            }
        };
        // 显示编辑界面
        handleEdit(params:any) {
            this.editDialogVisible = true;
            this.operation = false;
            this.dataForm = Object.assign({}, params.row)
        };
        // 编辑
        submitForm() {
            (this.$refs.dataForm as any).validate((valid:boolean) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let params:any;
                        params = Object.assign({}, this.dataForm)
                        (this as any).$api.dict.save(params).then((res:any) => {
                            if(res.code == 200) {
                                this.$message({ message: '操作成功', type: 'success' })
                            } else {
                                this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                            }
                            this.editLoading = false;
                            (this.$refs['dataForm'] as any).resetFields();
                            this.editDialogVisible = false;
                            this.findPage(null);
                        })
                    })
                }
            })
        };
        // 时间格式化
        dateFormat(row:any, column:any, cellValue:any, index:any){
            return format(row[column.property])
        }
    }
</script>

<style scoped>

</style>