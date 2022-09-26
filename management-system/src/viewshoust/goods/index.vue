<template>
    <div class="top">
        <el-form :inline="true" :model="MenmberTypeQuery" ref="MeForm" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="MenmberTypeQuery.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="MenmberTypeQuery.code" placeholder="商品编码"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <el-input v-model="MenmberTypeQuery.supplierName" placeholder="选择供应商" @focus="modal"></el-input>
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
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleFormList.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品编码" prop="code">
                        <el-input v-model="ruleFormList.code"></el-input>
                    </el-form-item>
                    <el-form-item label="商品规格" prop="spec">
                        <el-input v-model="ruleFormList.spec"></el-input>
                    </el-form-item>
                    <el-form-item label="零售价" prop="retailPrice">
                        <el-input v-model="ruleFormList.retailPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="进货价" prop="purchasePrice">
                        <el-input v-model="ruleFormList.purchasePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="库存数量" prop="storageNum">
                        <el-input v-model="ruleFormList.storageNum"></el-input>
                    </el-form-item>
                    <el-form-item prop="supplierName" label="供应商">
                        <el-input v-model="MenmberTypeQuery.supplierName" placeholder="选择供应商" @focus="modal"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Oksubmit" v-show="title=='商品新增'">确 定</el-button>
                <el-button type="primary" @click="amend" v-show="title=='商品编辑'">修改提交</el-button>
            </span>
        </el-dialog>


        <div class="tow">
            <el-dialog title="选择供应商" :visible.sync="dialogVisible2" width="55%" slot="footer">
                <span>
                    <el-form :inline="true" :model="MenmberTypeQuery" ref="MeForm" class="demo-form-inline">
                        <el-form-item prop="name">
                            <el-input v-model="MenmberTypeQuery.name" placeholder="商品名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitQuery">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="MenmberToList1" height="450" border style="width: 100%" @cell-click="a">
                        <el-table-column type="index" label="序号">
                        </el-table-column>
                        <el-table-column prop="name" label="供应商名称">
                        </el-table-column>
                        <el-table-column prop="linkman" label="联系人">
                        </el-table-column>
                    </el-table>
                </span>
            </el-dialog>
        </div>
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
import TableTion from '../../components/TableTion.vue'
import proTypes from '../../enum/filter'
import goodsApi from '../../api/goods';
import supplier from '../../api/supplier';
export default {
    components: {
        TableTion,
    },
    data() {
        return {
            page: 1,
            size: 10,
            total: 0,
            //表单
            MenmberTypeQuery: {
                name: "",
                code: "",
                supplierName: ""
            },
            ruleFormList: {
                name: '',
                code: '',
                spec: '',
                retailPrice: '',
                purchasePrice: '',
                storageNum: '',
                supplierName: '',
                supplierId: "",
            },
            title: "商品新增",
            byId: 0,
            rules: {
                code: [
                    { required: true, message: "编码不能为空", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "商品名称不能为空", trigger: "blur" }
                ],
                retailPrice: [
                    { required: true, message: "零售价不能为空", trigger: "change" }
                ]
            },
            columns: [
                {
                    type: "index",
                    label: "序号",
                },
                {
                    label: "商品名称",
                    prop: "name",
                },
                {
                    label: "商品编码",
                    prop: "code",
                },
                {
                    label: "商品规格",
                    prop: "spec",
                },
                {
                    label: "零售价",
                    prop: "purchasePrice",
                },
                {
                    label: "进货价",
                    prop: "retailPrice",
                },
                {
                    label: "库存数量",
                    prop: "storageNum",
                },
                {
                    label: "供应商",
                    prop: "supplierName",
                },
                {
                    label: "操作",
                    type: "action",
                    actions: [
                        {
                            type: 'primary',
                            text: "编辑"
                        },
                        {
                            type: 'danger',
                            text: "删除"
                        },
                    ]
                },

            ],
            MenmberToList1: [],//供应商列表数据
            MenmberToList: [],//会员列表数据
            proTypeList: proTypes.proType,
            dialogVisible: false,
            dialogVisible2: false
        };

    },
    methods: {
        a(val) {
            console.log(val, 123);
            this.dialogVisible2 = false
            this.MenmberTypeQuery.supplierName = val.name
            console.log(val.name);
        },
        //供应商列表
        async menmberList1() {
            const { page, size, MenmberTypeQuery } = this
            const QuMenmberList = await supplier.SuppList(page, size, MenmberTypeQuery)
            console.log(QuMenmberList, '供应商管理');
            this.total = QuMenmberList.data.data.total
            this.MenmberToList1 = QuMenmberList.data.data.rows
        },
        //供应商模态框
        modal() {
            this.dialogVisible2 = true
        },
        //会员列表
        async menmberList() {
            const { page, size, MenmberTypeQuery } = this
            const QuMenmberList = await goodsApi.goodsList(page, size, MenmberTypeQuery)
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
                const response = await goodsApi.goodsDel(id)
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

            const FromAdd = await goodsApi.goodsAdd(this.ruleFormList)
            console.log(FromAdd, 'FromAdd');
            this.dialogVisible = false
            this.$message.success('新增成功')
            this.menmberList()
        },
        //编辑
        async edit(id) {
            this.title = '商品编辑'
            const response = await goodsApi.goodsOne(id)
            console.log(response, 'response');
            this.ruleFormList = response.data.data
            this.dialogVisible = true
            this.byId = id
        },
        //列表添加弹出模态框
        FromAddList() {
            this.title = '商品新增'
            this.dialogVisible = true
            this.ruleFormList = {
                name: '',
                code: '',
                spec: '',
                retailPrice: '',
                purchasePrice: '',
                storageNum: '',
                supplierName: '',
                supplierId: "",
            }
        },
        async amend() {
            const amendId = await goodsApi.goodsEdit(this.byId, this.ruleFormList)
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
        this.menmberList1()
    },
}
</script>
<style scoped lang="scss">

</style>