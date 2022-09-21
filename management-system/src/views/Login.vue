<template>
    <div class="headeLogin">
        <div class="headelBox">
            <h3 class="headleText">小居居会员管理系统</h3>
            <el-form ref="form" :model="FromLogin" label-width="60px">
                <el-form-item label="账号">
                    <el-input v-model="FromLogin.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="FromLogin.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import TestApi from "../api/mag"
export default {
    data() {
        return {
            FromLogin: {
                username: '',
                password: ''
            }

        };
    },
    methods: {
        onSubmit(SubVal) {
            console.log(SubVal);
        },
        login() {
            TestApi.login(this.FromLogin).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        },
    },
    created() {
        this.login()
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
        // height: 200px;
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