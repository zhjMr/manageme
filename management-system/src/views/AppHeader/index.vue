<template>
    <div>
        <router-link to="/home" class="router_link">
            <img class="ImgPng" src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="" width="25px">
            <span class="menAg">小居居会员管理系统</span>
        </router-link>
        <div class="lift">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{name}} <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="changePass" icon="el-icon-edit">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout" icon="el-icon-s-unfold">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case "changePass":
                    this.handleChangePass()
                    break
                case "logout":
                    this.handleLogout()
                    break
            }
        },
        handleChangePass() {
            alert('修改密码')
        },
        handleLogout() {
            alert('退出登录')
        }
    },
    computed: {
        name() {
            return this.$store.getters.userInfo.name
        }
    }
}
</script>
<style scoped lang="scss">
.router_link {
    text-decoration: none;
}

.ImgPng {
    vertical-align: middle;
    margin: 4px 8px 0 40px;
}

.menAg {
    vertical-align: middle;
    color: #fff;
}

.lift {
    float: right;
    margin-right: 30px;

    .el-dropdown-link {
        color: #fff;
    }
}
</style>