<template>
    <div class="page-container">
        <!--工具栏-->
        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dept:view" type="primary" @click="findTreeData(null)"/>
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dept:add" type="primary" @click="handleAdd"/>
                </el-form-item>
            </el-form>
        </div>
        <!--表格树内容栏-->
        <el-table :data="tableTreeDdata" stripe size="mini" style="width: 100%;"
                  v-loading="loading" rowKey="id" element-loading-text="$t('action.loading')">
            <el-table-column
                    prop="id" header-align="center" align="center" width="80" label="ID">
            </el-table-column>
            <table-tree-column
                    prop="name" header-align="center" treeKey="id" width="150" label="名称">
            </table-tree-column>
            <el-table-column
                    prop="parentName" header-align="center" align="center" width="120" label="上级机构">
            </el-table-column>
            <el-table-column
                    prop="orderNum" header-align="center" align="center" label="排序">
            </el-table-column>
            <el-table-column
                    prop="createBy" header-align="center" align="center" label="创建人">
            </el-table-column>
            <el-table-column
                    prop="createTime" header-align="center" align="center" label="创建时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column
                    fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
                <template slot-scope="scope">
                    <kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:dept:edit" @click="handleEdit(scope.row)" :size="size"/>
                    <kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:dept:delete" type="danger" @click="handleDelete(scope.row)":size="size"/>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增修改界面 -->
        <el-dialog :title="!dataForm.id ? '新增' : '修改'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()"
                     label-width="80px" :size="size" style="text-align:left;">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dataForm.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="上级机构" prop="parentName">
                    <popup-tree-input
                            :data="popupTreeData" :props="popupTreeProps" :prop="dataForm.parentName==null?'顶级菜单':dataForm.parentName"
                            :nodeKey="''+dataForm.parentId" :currentChangeHandle="handleTreeSelectChange">
                    </popup-tree-input>
                </el-form-item>
                <el-form-item v-if="dataForm.type !== 2" label="排序编号" prop="orderNum">
                    <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" label="排序编号"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button :size="size"  @click="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size"  type="primary" @click="submitForm()">{{$t('action.comfirm')}}</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator'
    import KtButton from "@/views/core/KtButton.vue"
    import TableTreeColumn from '@/views/core/TableTreeColumn.vue'
    import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
    import FaIconTooltip from "@/components/FaIconTooltip/index.vue"
    import { format } from "@/utils/datetime"
    @Component({
        components:{
            PopupTreeInput,
            KtButton,
            TableTreeColumn,
            FaIconTooltip
        }
    })
    export default class Dept extends Vue{
        size:string= 'small';
        loading:boolean= false;
        filters:any= {
            name: ''
        };
        tableTreeDdata:any= [];
        dialogVisible:boolean=  false;
        dataForm: any={
            id: 0,
            name: '',
            parentId: 0,
            parentName: '',
            orderNum: 0
        };
        dataRule: any={
            name: [
                { required: true, message: '机构名称不能为空', trigger: 'blur' }
                ],
            parentName: [
                { required: true, message: '上级机构不能为空', trigger: 'change' }
                ]
        };
        popupTreeData:any= [];
        popupTreeProps: any={
            label: 'name',
            children: 'children'
        }
        // 获取数据
        findTreeData() {
            this.loading = true;
            (this as any).$api.dept.findDeptTree().then((res:any) => {
                this.tableTreeDdata = res.data
                this.popupTreeData = this.getParentMenuTree(res.data)
                this.loading = false
            })
        };
        // 获取上级机构树
        getParentMenuTree(tableTreeDdata:any) {
            let parent = {
                parentId: 0,
                name: '顶级菜单',
                children: tableTreeDdata
            }
            return [parent]
        };
        // 显示新增界面
        handleAdd() {
            this.dialogVisible = true
            this.dataForm = {
                id: 0,
                name: '',
                parentId: 0,
                parentName: '',
                orderNum: 0
            }
        };
        // 显示编辑界面
        handleEdit(row:any) {
            this.dialogVisible = true
            Object.assign(this.dataForm, row);
        };
        // 删除
        handleDelete (row:any) {
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                let params :any;
                params= this.getDeleteIds([], row)
                (this as any).$api.dept.batchDelete(params).then( (res:any) => {
                    this.findTreeData();
                    this.$message({message: '删除成功', type: 'success'})
                })
            })
        };
        // 获取删除的包含子机构的id列表
        getDeleteIds (ids:any, row:any) {
            ids.push({id:row.id})
            if(row.children != null) {
                for(let i=0, len=row.children.length; i<len; i++) {
                    this.getDeleteIds(ids, row.children[i])
                }
            }
            return ids
        };
        // 机构树选中
        handleTreeSelectChange (data:any, node:any) {
            this.dataForm.parentId = data.id
            this.dataForm.parentName = data.name
        };
        // 表单提交
        submitForm () {
            (this.$refs['dataForm'] as any).validate((valid:boolean) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        (this as any).editLoading = true
                        let params :any;
                        params= Object.assign({}, this.dataForm)
                        (this as any).$api.dept.save(params).then((res:any) => {
                            (this as any).editLoading = false
                            if(res.code == 200) {
                                this.$message({ message: '操作成功', type: 'success' })
                                this.dialogVisible = false;
                                (this.$refs['dataForm'] as any).resetFields()
                            } else {
                                this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                            }
                            this.findTreeData()
                        })
                    })
                }
            })
        };
        // 时间格式化
        dateFormat(row:any, column:any, cellValue:any, index:any){
            return format(row[column.property])
        }
        mounted() {
            this.findTreeData()
        }
    }
</script>

<style scoped>

</style>