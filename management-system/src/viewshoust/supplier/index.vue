<template>
    <div class="top">
        <queryTable v-model.sync="MenmberTypeQuery" :queryFrom="queryFrom" ref="queryFr">
            <template v-slot:slot_name="scope">
                <el-button type="primary" @click="onSubmitQuery">查询</el-button>
                <el-button type="primary" @click="FromAddList">新增</el-button>
                <el-button @click="resetForm">重置</el-button>
            </template>
        </queryTable>
        <!-- //模态框 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
            <span>
                <el-form :model="ruleFormList" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="供应商名称" prop="name">
                        <el-input v-model="ruleFormList.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="linkman">
                        <el-input v-model="ruleFormList.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="mobile">
                        <el-input v-model="ruleFormList.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="ruleFormList.remark"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Oksubmit" v-show="title=='供应商新增'">确 定</el-button>
                <el-button type="primary" @click="amend" v-show="title=='供应商编辑'">修改提交</el-button>
            </span>
        </el-dialog>
        <TableTion :MenmberToList="MenmberToList" :columns="columns" :page="page" :size="size" :total="total"
            @size="heldsize" @page="heldpage">
            <template v-slot:action="scope">
                <el-button type="primary" size="mini"  @click="edit(scope.item.id)">编辑</el-button>
                <el-button type="danger"  size="mini"   @click="del(scope.item.id)">删除</el-button>
            </template>
        </TableTion>
    </div>
</template>
<script>
import TableTion from '../../components/TableTion.vue'
import proTypes from '../../enum/filter'
import supplier from '../../api/supplier';
export default {
    components: {
        TableTion,
        queryTable: () => import('../../components/QueryPt.vue')
    },
    data() {
        return {
            queryFrom: [
                {
                    type: "input",
                    prop: "name",
                    placeholder: "供应商名称"
                },
                {
                    type: "input",
                    prop: "linkman",
                    placeholder: "联系人"
                },
                {
                    type: "input",
                    prop: "mobile",
                    placeholder: "联系电话"
                },
                {
                    type: "slot",
                    name: "slot_name"
                },
            ],
            columns: [
                {
                    type: 'index',
                    label: '序号',
                    width: '180'
                },
                {
                    label: '供应商名称',
                    prop: 'name'
                },
                {
                    label: '联系人',
                    prop: 'linkman'
                },
                {
                    label: '联系电话',
                    prop: 'mobile'
                },
                {
                    label: '备注',
                    prop: 'remark'
                },
                {
                    label: '操作',
                    type: "action",
                    actions: [
                        {
                            type: "danger",
                            text: "删除",
                        },
                        {
                            type: "primary",
                            text: "编辑",
                        },
                    ]
                },
            ],
            page: 1,
            size: 10,
            total: 0,
            //表单
            MenmberTypeQuery: {
                linkman: "",
                name: "",
                mobile: "",
            },
            ruleFormList: {
                name: "",
                linkman: "",
                mobile: "",
                remark: "",

            },
            title: "供应商新增",
            byId: 0,
            rules: {
                linkman: [
                    { required: true, message: "联系人不能为空", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "姓名不能为空", trigger: "blur" }
                ],
            },
            MenmberToList: [],//列表数据
            proTypeList: proTypes.proType,
            dialogVisible: false
        };

    },
    methods: {
        //供应商列表
        async menmberList() {
            const { page, size, MenmberTypeQuery } = this
            const QuMenmberList = await supplier.SuppList(page, size, MenmberTypeQuery)
            this.total = QuMenmberList.data.data.total
            this.MenmberToList = QuMenmberList.data.data.rows
            console.log(this.MenmberToList, ' this.MenmberToList');
        },
        //展示条
        heldsize(size) {
            this.size = size
            this.menmberList()
        },
        //当前页
        heldpage(page) {
            this.page = page
            this.menmberList()
        },
        //查询
        onSubmitQuery() {
            this.page = 1
            this.menmberList()
        },
        //重置
        resetForm() {
            this.$refs['queryFr'].handleFrom()
        },
        //删除
        del(id) {
            this.$confirm('确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const response = await supplier.SuppDel(id)
                console.log(response, 'response');
                this.$message.success('删除成功')
                this.menmberList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //添加（新增）
        async Oksubmit() {
            const FromAdd = await supplier.SuppAdd(this.ruleFormList)
            console.log(FromAdd, 'FromAdd');
            this.dialogVisible = false
            this.$message.success('新增成功')
            this.menmberList()
        },
        //编辑
        async edit(id) {
            this.title = '供应商编辑'
            const response = await supplier.SuppOne(id)
            console.log(response, 'response');
            this.ruleFormList = response.data.data
            this.dialogVisible = true
            this.byId = id
        },
        //列表添加弹出模态框
        FromAddList() {
            this.title = '供应商新增'
            this.dialogVisible = true
            this.ruleFormList = {
                name: "",
                linkman: "",
                mobile: "",
                remark: "",

            }
        },
        async amend() {
            const amendId = await supplier.SuppEdit(this.byId, this.ruleFormList)
            console.log(amendId);
            this.$message.success('更新成功')
            this.dialogVisible = false
        }
    },
    filters: {
        //支付 过滤
        payNum(val) {
            return proTypes.proType[val]
        }
    },
    created() {
        this.menmberList()
    },
}
</script>
<style scoped lang="scss">

</style>