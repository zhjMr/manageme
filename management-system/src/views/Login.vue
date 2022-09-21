<template>
    <div class="headeLogin">
        <div class="headelBox">
            <h3 class="headleText">小居居会员管理系统</h3>
            <el-form :rules="rules" ref="form" :model="FromLogin" label-width="60px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model.trim="FromLogin.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model.trim="FromLogin.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            FromLogin: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
            }

        };
    },
    methods: {
        handleLoginSubmit() {
            this.$refs['form'].validate(valid => {
                if (!valid) return
                this.headelLogin()
            })
        },
        async headelLogin() {
            const token = await this.$store.dispatch('login', this.FromLogin)
            console.log(token);
            if (!token) return
            const userInfo = await this.$store.dispatch('userInfos')
            console.log(userInfo);
            if(!userInfo) return
            this.$message.success('登录成功')
            this.$router.push("/index")
        }
    },
    created() {

    },
}
</script>
<style scoped lang="scss">
.headeLogin {
    width: 100%;
    height: 100%;
    background: url('http://vue.mengxuegu.com/img/login.b665435f.jpg') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;

    .headelBox {
        border-radius: 20px;
        width: 370px;
        background-color: aqua;
        margin: 160px auto;
        background: rgb(rgb(225, 225, 225), 0.8);
        padding: 28px;

        .headleText {
            text-align: center;
            font-size: 24px;
            margin: 20px;
            font-weight: 700;
        }
    }
}
</style>