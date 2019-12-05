<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h3 class="title" style="text-align:center;">鸟类系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm2.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="ruleForm2.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
            <el-checkbox 
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            logining: false,
            ruleForm2: {
                username: '',
                password: '',
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.ruleForm2.validate((valid) => {
                if(valid){
                    this.logining = true; 
                    var URL = '/api/birdLabel/v1/user/exist?UNAME='+this.ruleForm2.username+'&UPSW='+this.ruleForm2.password;
                    axios.post(URL)
                            //then获取成功；response成功后的返回值（对象）
                    .then(response=>{                                             
                        console.log(response.data);  
                        this.data =  response.data;
                        if(this.data == 1){
                           this.logining = false;
                           sessionStorage.setItem('user', this.ruleForm2.username);
                           this.$router.push({path: '/page'});
                        }else{
                            this.logining = false;
                            this.$alert('username or password wrong!', 'info', {
                                confirmButtonText: 'ok'
                            })
                        }                     
                    })
                            //获取失败
                    .catch(error=>{
                        console.log(error);
                        alert('网络错误，不能访问');
                    })                   
                }else{
                    console.log('error submit!');
                    return false;
                }
            })
        }
    }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>