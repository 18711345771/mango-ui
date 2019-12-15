<template>
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0" class="demo-ruleForm login-container">
        <h2 class="title" style="padding-left:22px;" >系统登录</h2>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item >
            <el-col :span="12">
                <el-form-item prop="captcha">
                    <el-input type="text" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
                              style="width: 100%;">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="11">
                <el-form-item>
                    <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:48%;" @click="reset">重 置</el-button>
            <el-button type="primary" style="width:48%;" @click="login" :loading="loading">登 录</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
    import Cookies from "js-cookie"
    import {Provide ,Vue ,Component} from 'vue-property-decorator'
    @Component({
        components:{}
    })
    export default class Login extends Vue{
        @Provide() loading:boolean= false;
        @Provide() loginForm:{
            account: string;
            password: string;
            captcha:string;
            src: string;
        }={
            account: 'admin',
            password: 'admin',
            captcha:'',
            src: ''
        };
        @Provide() fieldRules={
            account: [
                { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            password: [
                 { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        };
        // @Provide()checked:boolean=true;
        login() {
            this.loading = true;
            (this.$refs['loginForm'] as any).validate((valid:boolean)=>{
                if(valid){
                    let userInfo = { account:this.loginForm.account, password:this.loginForm.password,
                        captcha:this.loginForm.captcha };
                    (this as any).$api.login.login(userInfo).then((res:any) => {  // 调用登录接口
                        if(res.msg != null) {
                            this.$message({ message: res.msg, type: 'error' })
                        } else {
                            Cookies.set('token', res.data.token) // 放置token到Cookie
                            sessionStorage.setItem('user',userInfo.account) // 保存用户到本地会话
                            this.$store.commit('menuRouteLoaded',false);//要求重新加载导航菜单
                            alert('登陆成功！');
                            this.$router.push('/')  // 登录成功，跳转到主页
                        }
                        this.loading = false
                    }).catch((err:any) => {
                        this.$message({ message: err.message, type: 'error' })
                    })
                }
            })
        };
        refreshCaptcha(){
            this.loginForm.src = (this as any).global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
        };
        reset() {
            (this.$refs['loginForm'] as any).resetFields();
        }
        mounted(){
            // this.refreshCaptcha()
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 100px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 30px auto;
            text-align: center;
            color: #505458;
        }
    }
</style>