<template>
    <div class="top">
        <el-form :inline="true" :model="MenmberTypeQuery" ref="MeForm" class="demo-form-inline">
            <el-form-item prop="username">
                <el-input v-model="MenmberTypeQuery.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="MenmberTypeQuery.name" placeholder="姓名"></el-input>
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
            <el-table-column prop="username" label="账号" width="160px">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="mobile" label="电话" width="120px">
            </el-table-column>
            <el-table-column prop="salary" label="薪酬">
            </el-table-column>
            <el-table-column prop="entryDate" label="入职时间">
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
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="ruleFormList.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleFormList.name"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="ruleFormList.age"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="ruleFormList.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="薪酬" prop="salary">
                        <el-input v-model="ruleFormList.salary"></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间">
                        <el-form-item prop="entryDate">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择入职时间"
                                v-model="ruleFormList.entryDate" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Oksubmit" v-show="title=='员工新增'">确 定</el-button>
                <el-button type="primary" @click="amend" v-show="title=='员工编辑'">修改提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Paginat from '../../components/Pagination'
import proTypes from '../../enum/filter'
import staffApi from '../../api/staff'
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
                cardNum: "",
                name: "",
                payType: "",
                birthday: ""
            },
            ruleFormList: {
                username: "",
                name: "",
                age: "",
                entryDate: "",
                salary: "",
                mobile: ""
            },
            title: "员工新增",
            byId: 0,
            rules: {
                username: [
                    { required: true, message: "账号不能为空", trigger: "blur" }
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
        //会员列表
        async menmberList() {
            const { page, size, MenmberTypeQuery } = this
            const QuMenmberList = await staffApi.staffList(page, size, MenmberTypeQuery)
            console.log(QuMenmberList, 'MenmberList');
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
                const response = await staffApi.staffDel(id)
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

            const FromAdd = await staffApi.staffAdd(this.ruleFormList)
            console.log(FromAdd, 'FromAdd');
            this.dialogVisible = false
            this.$message.success('新增成功')
            this.menmberList()
        },
        //编辑
        async edit(id) {
            this.title = '员工编辑'
            const response = await staffApi.staffOne(id)
            console.log(response, 'response');
            this.ruleFormList = response.data.data
            this.dialogVisible = true
            this.byId = id
        },
        //列表添加弹出模态框
        FromAddList() {
            this.title = '员工新增'
            this.dialogVisible = true
            this.ruleFormList = {
                username: "",
                name: "",
                age: "",
                entryDate: "",
                salary: "",
                mobile: ""
            }
        },
        async amend() {
            const amendId = await staffApi.staffEdit(this.byId, this.ruleFormList)
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