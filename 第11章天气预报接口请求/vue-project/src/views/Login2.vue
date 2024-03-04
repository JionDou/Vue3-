<template>
    <div class="login-container">
      <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="title-container">
          <h3 class="title">Login</h3>
        </div>
        <el-form-item prop="username">
          <el-icon class="svg-container"><user-filled style="height: 3em;width: 1.3em;"/></el-icon>
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-icon class="svg-container"><lock style="height: 3em;width: 1.3em;"/></el-icon>
          <el-input
            v-model="loginForm.password"
            :type="passwordType?'text':'password'"
          ></el-input>
          <i @click="passwordEvent" :class="passwordType?'iconfont icon-yanjing iconBiyan':'iconfont icon-biyanjing iconBiyan'"></i>
        </el-form-item>
        <el-button type="primary" class="btn-login" @click="loginEvent">Login</el-button>
      </el-form>
    </div>
   </template>
   <script>
   import { ref,reactive,unref } from "vue"
   import { useRouter } from "vue-router"
   
   import {UserFilled,Lock} from "@element-plus/icons-vue"
   export default {
    name:"Login",
    components:{
      UserFilled,
      Lock
    },
    setup() {
      const loginForm = ref({
        username: 'admin',
        password: '123456',
      });
      const router = useRouter();
      const formRef = ref();
      const passwordType = ref(false);
      const validateName = (rule, value, callback) => {
        if(!value) {
          callback(new Error("Required"));
        }else {
          callback();
        }
      }
      const validatePas = (rule, value, callback) => {
        if(!value) {
          callback(new Error("Required"));
        }else {
          callback()
        }
      }
      const loginRules = reactive({
        username: [{ validator: validateName, trigger: 'blur' }],
        password:[{ validator:validatePas,trigger: 'blur' }]
      })
      const loginEvent = async () => {
        const form = unref(formRef)
        // form.resetFields() //重置表单
        if (!form) { return }
        try {
          await form.validate(); //校验表单
          router.push({ path: "/pending"}); //路由跳转
        } catch (err) {
          console.log(err);
        }
      }
      return { loginForm,passwordType,loginRules,loginEvent,formRef }
    },
    methods: {
      passwordEvent() {
        this.passwordType = !this.passwordType;
      }
    }
   }
   </script>
   <style lang="scss">
   $bg:#283443;
   $cursor: #fff;
   $dark_gray:#889aa4;
   $light_gray:#eee;
   $col: #889aa4;
   
   :deep.el-input{
        background-color: #889aa4;
    }
   .login-container{
    /* background-color: $bg; */
    width: 100%;
    height: 100%;
    overflow: hidden;
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 5px;
          color: #000;
          height: 47px;
          caret-color: $cursor;
          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }
      .title-container {
        position: relative;
        .title {
          font-size: 26px;
          color: #000;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
      }
      .iconHuyan {
        font-size: 24px;  
      }
      .iconBiyan {
        font-size: 18px;
        margin-left: 8px;
        color: $col;
        cursor: pointer;
      }
      .btn-login {
        width:100%;
        margin-bottom:30px;
      }
      .svg-container {
        color: $col;
        vertical-align: middle;
        width: 35px;
        display: inline-block;
        height: 3em;
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
   }
   </style>
   