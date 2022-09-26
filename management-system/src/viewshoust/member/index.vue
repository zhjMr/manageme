<template>
    <div class="top">
        <el-form :inline="true" :model="MenmberTypeQuery" ref="MeForm" class="demo-form-inline">
            <el-form-item prop="cardNum">
                <el-input v-model="MenmberTypeQuery.cardNum" placeholder="会员卡号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="MenmberTypeQuery.name" placeholder="会员名字"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="MenmberTypeQuery.payType" placeholder="支付类型">
                    <el-option v-for="(item,index) in proTypeList" :key="index" :label="item" :value="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item required prop="birthday">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
                    v-model="MenmberTypeQuery.birthday" style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitQuery">查询</el-button>
                <el-button type="primary" @click="FromAddList">新增</el-button>
                <el-button @click="resetForm('MeForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- //模态框 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
            <span>
                <el-form :model="ruleFormList" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="会员卡号" prop="cardNum">
                        <el-input v-model="ruleFormList.cardNum"></el-input>
                    </el-form-item>
                    <el-form-item label="会员姓名" prop="name">
                        <el-input v-model="ruleFormList.name"></el-input>
                    </el-form-item>
                    <el-form-item label="会员生日">
                        <el-form-item prop="birthday">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="会员生日"
                                v-model="ruleFormList.birthday" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleFormList.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="开卡金额" prop="money">
                        <el-input v-model="ruleFormList.money"></el-input>
                    </el-form-item>
                    <el-form-item label="可用积分" prop="integral">
                        <el-input v-model="ruleFormList.integral"></el-input>
                    </el-form-item>
                    <el-form-item label="支付类型" prop="payType">
                        <el-select v-model="ruleFormList.payType" placeholder="支付类型">
                            <el-option v-for="(item,index) in proTypeList" :key="index" :label="item" :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员地址" prop="desc">
                        <el-input type="textarea" v-model="ruleFormList.address"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Oksubmit" v-show="title=='会员新增'">确 定</el-button>
                <el-button type="primary" @click="amend" v-show="title=='会员编辑'">修改提交</el-button>
            </span>
        </el-dialog>
        <TableTion :columns="columns" :MenmberToList="MenmberToList" :size="size" :page="page" :total="total"
            @size="LaySize" @page="Laypage">
            <template v-slot:action="scope">
                <el-button type="primary" @click="edit(scope.item.id)">编辑</el-button>
                <el-button type="danger" @click="hoadleDel(scope.item.id)">删除</el-button>
            </template>
        </TableTion>
    </div>
</template>
<script>
import proTypes from '../../enum/filter'
import menmber from '../../api/menmber';
import TableTion from '../../components/TableTion.vue'
export default {
    components: {
        TableTion
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
                cardNum: '',
                name: '',
                payType: '',
                birthday: '',
                phone: '',
                integral: '',
                money: '',
                address: ''
            },
            title: "会员新增",
            byId: 0,
            rules: {
                cardNum: [
                    { required: true, message: "卡号不能为空", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "姓名不能为空", trigger: "blur" }
                ],
                payType: [
                    { required: true, message: "支付类型不能为空", trigger: "change" }
                ]
            },
            MenmberToList: [],//会员列表数据
            proTypeList: proTypes.proType,
            dialogVisible: false,
            columns: [
                {
                    type: "index",
                    label: "序号"
                },
                {
                    label: "会员卡号",
                    prop: "cardNum",
                    width: '200'
                },
                {
                    label: "会员姓名",
                    prop: "name",
                },
                {
                    label: "会员生日",
                    prop: "birthday",
                },
                {
                    label: "手机号码",
                    prop: "phone",
                    width: "150"
                },
                {
                    label: "可用积分",
                    prop: "integral",
                },
                {
                    label: "开卡金额",
                    prop: "money",
                },
                {
                    label: "支付类型",
                    prop: "payType",
                    formatter: (row, column, cellValue, index) => {
                        return proTypes.proType[row.payType]
                    }
                },
                {
                    label: "会员地址",
                    prop: "address",
                    width: "180",

                },
                {
                    label: "操作",
                    type: "action",
                    width: "200"
                },
            ]
        };

    },
    methods: {
        //会员列表
        async menmberList() {
            const { page, size, MenmberTypeQuery } = this
            const QuMenmberList = await menmber.MenmberList(page, size, MenmberTypeQuery)
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
            console.log(id, 'id');
            this.$confirm('确定删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const response = await menmber.MenmberDel(id)
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

            const FromAdd = await menmber.MenmberAdd(this.ruleFormList)
            console.log(FromAdd, 'FromAdd');
            this.dialogVisible = false
            this.$message.success('新增成功')
            this.menmberList()
        },
        //编辑
        async edit(id) {
            this.title = '会员编辑'
            const response = await menmber.GetmenById(id)
            console.log(response, 'response');
            this.ruleFormList = response.data.data
            this.dialogVisible = true
            this.byId = id
        },
        //列表添加弹出模态框
        FromAddList() {
            this.title = '会员新增'
            this.dialogVisible = true
            this.ruleFormList = {
                cardNum: '',
                name: '',
                payType: '',
                birthday: '',
                phone: '',
                integral: '',
                money: '',
                address: ''
            }
        },
        async amend() {
            const amendId = await menmber.MenmberEdit(this.byId, this.ruleFormList)
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