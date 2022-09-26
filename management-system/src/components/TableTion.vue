<template>
    <div>
        <el-table :data="MenmberToList" height="350" border style="width: 100%">
            <template v-for="(item,index) in columns">
                <el-table-column v-bind="item" v-if="item.type && item.type!=='action'" :type="item.type"
                    :label="item.label">
                </el-table-column>
                <el-table-column v-else-if="!item.type" v-bind="item" :prop="item.prop" :label="item.label">
                </el-table-column>
                <el-table-column v-else-if="item.type=='action'" v-bind="item" :label="item.label">
                    <template v-slot="scope">
                        <slot :name="item.type" :item="scope.row"></slot>
                    </template>
                </el-table-column>
                <!-- <el-table-column :label="item.label" v-else-if="item.type === 'action'">
                    <template slot-scope="scope">
                        <el-button v-for="(ele,index) in item.actions" :key='index' :type="ele.type"
                            @click="a(ele.text)">{{ele.text}}
                        </el-button>
                    </template>
                </el-table-column> -->
            </template>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                :page-sizes="pageSize" :page-size="size" :layout="layout" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        MenmberToList: {
            type: Array,
            default: () => []
        },
        page: {
            type: [Number, String],
            default: 1
        },
        size: {
            type: [Number, String],
            default: 10,
        },
        total: {
            type: [Number, String],
            default: 0
        },
        pageSize: {
            type: Array,
            default: () => [10, 20, 30, 50]
        },
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        pager: Boolean
    },
    data() {
        return {

        };
    },
    methods: {
        handleSizeChange(size) {
            this.$emit('size', size)
        },
        handleCurrentChange(page) {
            this.$emit('page', page)
        },
        // a(val) {
        //     console.log(val);
        //     if (val === '编辑') {
        //         this.$emit('edit')
        //     } else {
        //         this.$emit('del')
        //     }
        // }
    }
}
</script>
<style scoped lang="scss">

</style>