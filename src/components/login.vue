<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar-box">
                <img src="../assets/logo.png">
            </div>
            <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules">
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont iconbussiness-man" v-model="loginForm.username" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" prefix-icon="iconfont iconpassword" v-model="loginForm.password" ></el-input>
                </el-form-item>
                <el-form-item style="display: flex;
                                            display: -webkit-flex;
                                                flex-direction: row;
                                                    justify-content: flex-end;
                                            ">
                    <el-button type='primary' @click="login">登录</el-button>
                    <el-button type='info' @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: ''
            },
            loginFormRules: {
                username: [
                     { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                     { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            this.$refs.loginFormRef.validate(valid => {
                if (valid){
                    //调用登录接口登录
                    const login = new Promise((resolve, reject) => {
                        let res = this.$http.post('login', this.loginForm);
                            resolve(res);
                    });
                    login.then(res => {
                        let data = res.data;
                        if (data.meta.status === 200) {
                             this.$message({
                                message : '登录成功',
                                type: 'success'
                             });
                             //设置token作为登录标识
                            let token = data.data.token;
                            sessionStorage.setItem('token', token);
                            this.$router.push('/home')
                        }
                        else {
                            this.$message({
                                message: '用户名或密码错误！',
                                type: 'error'
                            })
                        }
                    });
                }
            });
        }
    }
}
</script>
<style scoped>
 .login-container {
     display: -webkit-flex;
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     height: 100%;
     background-color: #2b4b6b;
 }
 .login-box {
     display: flex;
     display: -webkit-flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: center;
     width: 450px;
     height: 300px;
     background-color: #fff;
     border-radius: 3px;
 }
 .avatar-box {
     width: 130px;
     height: 130px;
     border: 1px solid #eee;
     border-radius: 50%;
     padding: 10px;
     box-shadow: 0 0 10px;
     background-color: #fff;
     transform: translate(0, -50%);
 }
 .avatar-box img {
     width: 100%;
     height: 100%;
     border-radius: 50%;
     background-color: #eee;
 }
 .login-form {
     width: 100%;
     padding:20px;
     box-sizing: border-box;
     transform: translate(0, -30%);
 }
</style>
