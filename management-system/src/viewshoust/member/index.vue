<template>
    <div class="top">
        <!-- 查询封装 -->
        <QueryFrom v-model.sync="MenmberTypeQuery" :queryFrom="queryFrom" :proTypeList="proTypeList" ref="querFr">
            <template v-slot:Member="scope">
                <el-button type="primary" @click="onSubmitQuery">查询</el-button>
                <el-button type="primary" @click="FromAdd">新增</el-button>
                <el-button @click="handelClear">重置</el-button>
            </template>
        </QueryFrom>
        <!-- //模态框 -->
        <DialogAdd :dialogVisible.sync="dialogVisible" :rules="rules" v-model='ruleFormList' :proTypeList="proTypeList"
            :DialogFrom="DialogFrom" @Oksubmit="handelsubmit" :dialogConfig="dialogConfig" ref="dan">
        </DialogAdd>
        <!-- 表格封装 -->
        <TableTion :columns="columns" :MenmberToList="MenmberToList" :size="size" :page="page" :total="total"
            @size="LaySize" @page="Laypage">
            <template v-slot:action="scope">
                <el-button type="primary" size="mini" @click="FromAdd(scope.item.id)">编辑</el-button>
                <el-button type="danger" size="mini" @click="hoadleDel(scope.item.id)">删除</el-button>
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
        TableTion,
        QueryFrom: () => import('../../components/QueryPt.vue'),
        DialogAdd: () => import('../../components/Dialog.vue')
    },
    data() {
        return {
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
            dialogConfig: {
                title: "供应商新增",
                labeWidth: "80px",
                width: "500px"
            },
            DialogFrom: [
                {
                    prop: "cardNum",
                    type: "input",
                    label: "会员卡号"
                },
                {
                    prop: "name",
                    type: "input",
                    label: "会员姓名"
                },
                {
                    prop: "birthday",
                    type: "date",
                    label: "会员生日",
                    placeholder: "会员生日"
                },
                {
                    prop: "phone",
                    type: "input",
                    label: "手机号码"
                },
                {
                    prop: "money",
                    type: "input",
                    label: "开卡金额"
                },
                {
                    prop: "integral",
                    type: "input",
                    label: "可用积分"
                },
                {
                    prop: "payType",
                    type: "select",
                    label: "支付类型",
                    placeholder: "支付类型"
                },
                {
                    prop: "address",
                    type: "textarea",
                    label: "会员地址"
                },
            ],
            queryFrom: [
                {
                    type: "input",
                    prop: "cardNum",
                    placeholder: "会员卡号"
                },
                {
                    type: "input",
                    prop: "name",
                    placeholder: "张三"
                },
                {
                    type: "select",
                    prop: "payType",
                    placeholder: "支付类型"
                },
                {
                    type: "date",
                    prop: "birthday",
                    placeholder: "出生日期",
                },
                {
                    type: "siot",
                    name: "Member"
                },
            ],
            page: 1,
            size: 10,
            total: 0,
            //表单,
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
            byId: 0,
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
                    width: "200",
                    actions: [
                        {
                            text: '编辑',
                            way: this.edit
                        },
                        {
                            text: '删除',
                            way: this.hoadleDel,
                        },
                    ]
                },
            ]
        };

    },
    methods: {
        FromAdd(id) {
            this.dialogVisible = true
            if (typeof id === 'number') {
                this.edit(id)
                this.dialogConfig.title = '供应商编辑'
                return
            }
            this.dialogConfig.title = '供应商新增'
            this.$refs['dan'].menit()
        },
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
        handelClear() {
            console.log(this.$refs['querFr']);
            this.$refs['querFr'].handleFrom();
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
        handelsubmit() {
            if (this.byId) {
                this.amend()
            } else {
                this.Oksubmit()
            }
        },
        //编辑
        async edit(id) {
            const response = await menmber.GetmenById(id)
            console.log(response, 'response');
            this.ruleFormList = response.data.data
            this.dialogVisible = true
            this.byId = id
        },
        //列表添加弹出模态框
        // FromAddList() {
        //     this.title = '会员新增'
        //     this.dialogVisible = true
        //     this.ruleFormList = {
        //         cardNum: '',
        //         name: '',
        //         payType: '',
        //         birthday: '',
        //         phone: '',
        //         integral: '',
        //         money: '',
        //         address: ''
        //     }
        // },
        async amend() {
            const amendId = await menmber.MenmberEdit(this.byId, this.ruleFormList)
            console.log(amendId);
            this.$message.success('更新成功')
            this.dialogVisible = false
            this.$refs['dan'].menit()
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