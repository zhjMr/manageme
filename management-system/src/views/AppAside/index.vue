<template>
    <div>
        <el-col>
            <el-menu :default-active="activePath" class="el-menu-vertical-demo" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b" router>
                <el-menu-item index="index">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="member">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">会员管理</span>
                </el-menu-item>
                <el-menu-item index="supplier">
                    <i class="el-icon-suitcase"></i>
                    <span slot="title">供应商管理</span>
                </el-menu-item>
                <el-menu-item index="goods">
                    <i class="el-icon-s-goods"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="staff">
                    <i class="el-icon-user"></i>
                    <span slot="title">员工管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    },

    created() {
        console.log(this.$route);
    },
    computed: {
        activePath() {
            return this.$route.name
        }
    }
}
</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
    height: 100vh;
}
.el-menu{
    border: none;
}
</style>