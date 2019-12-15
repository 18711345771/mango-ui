<template>
    <el-table-column :prop="prop" v-bind="$attrs">
        <template slot-scope="scope">
      <span @click.prevent="toggleHandle(scope.$index, scope.row)" :style="childStyles(scope.row)">
        <i :class="iconClasses(scope.row)" :style="iconStyles(scope.row)"></i>
        {{ scope.row[prop] }}
      </span>
        </template>
    </el-table-column>
</template>

<script lang="ts">
    import {Component,Vue,Prop} from 'vue-property-decorator'
    import isArray from 'lodash/isArray'
    @Component({
        components:{}
    })
    export default class TableTreeColumn extends Vue {
        @Prop()prop:any={
            type: String
        };
        @Prop()treeKey:any= {
            type: String,
            default: 'id'
        };
        @Prop()parentKey: any={
            type: String,
            default: 'parentId'
        };
        @Prop()levelKey:any= {
            type: String,
            default: 'level'
        };
        @Prop()childKey: any={
            type: String,
            default: 'children'
        };
        childStyles (row:any) {
            return { 'padding-left': (row[this.levelKey] * 25) + 'px' }
        };
        iconClasses (row:any) {
            return [ !row._expanded ? 'el-icon-caret-right' : 'el-icon-caret-bottom' ]
        };
        iconStyles (row:any) {
            return { 'visibility': this.hasChild(row) ? 'visible' : 'hidden' }
        };
        hasChild (row:any) {
            return (isArray(row[this.childKey]) && row[this.childKey].length >= 1) || false
        };
        // 切换处理
        toggleHandle (index:any, row:any) {
            if (this.hasChild(row)) {
                var data = (this.$parent as any).store.states.data.slice(0)
                data[index]._expanded = !data[index]._expanded
                if (data[index]._expanded) {
                    data = data.splice(0, index + 1).concat(row[this.childKey]).concat(data)
                } else {
                    data = this.removeChildNode(data, row[this.treeKey])
                }
                (this.$parent as any).store.commit('setData', data);
                this.$nextTick(() => {
                    (this.$parent as any).doLayout()
                })
            }
        };
        // 移除子节点
        removeChildNode (data:any, parentId:any):any {
            var parentIds = isArray(parentId) ? parentId : [parentId]
            if (parentId.length <= 0) {
                return data
            }
            var ids:any = [];
            for (var i = 0; i < data.length; i++) {
                if (parentIds.indexOf(data[i][this.parentKey]) !== -1 && parentIds.indexOf(data[i][this.treeKey]) === -1) {
                    ids.push(data.splice(i, 1)[0][this.treeKey])
                    i--
                }
            }
            return this.removeChildNode(data, ids)
        }
    }
</script>
