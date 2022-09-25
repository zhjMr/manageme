<template>
    <div class="top">
        <el-form :inline="true" :model="MenmberTypeQuery" ref="MeForm" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="MenmberTypeQuery.name" placeholder="供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="linkman">
                <el-input v-model="MenmberTypeQuery.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="MenmberTypeQuery.mobile" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitQuery">查询</el-button>
                <el-button type="primary" @click="FromAddList">新增</el-button>
                <el-button @click="resetForm('MeForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="MenmberToList" height="450" border style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="供应商名称">
            </el-table-column>
            <el-table-column prop="linkman" label="联系人">
            </el-table-column>
            <el-table-column prop="mobile" label="联系电话">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="280px">
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template v-slot="scope">
                    <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="hoadleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Paginat :total="total" :page="page" :size="size" @PageNum="Laypage" @PageSize="LaySize"></Paginat>
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
    </div>
</template>
<script>
import Paginat from '../../components/Pagination'
import proTypes from '../../enum/filter'
import supplier from '../../api/supplier';
export default {
    components: {
        Paginat,
    },
    data() {
        return {
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
            MenmberToList: [],//会员列表数据
            proTypeList: proTypes.proType,
            dialogVisible: false
        };

    },
    methods: {
        //供应商列表
        async menmberList() {
            const { page, size, MenmberTypeQuery } = this
            const QuMenmberList = await supplier.SuppList(page, size, MenmberTypeQuery)
            console.log(QuMenmberList, '供应商管理');
            this.total = QuMenmberList.data.data.total
            this.MenmberToList = QuMenmberList.data.data.rows
        },
        //展示条
        LaySize(size) {
            // console.log(size);
            this.page = size
            this.menmberList()
        },
        //当前页
        Laypage(page) {
            this.page = page
            this.menmberList()
        },
        //查询
        onSubmitQuery() {
            this.page = 1
            this.menmberList()
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //删除
        hoadleDel(id) {
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