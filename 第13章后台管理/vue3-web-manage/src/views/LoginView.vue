<template>
    <div class="login-container">
        <div
            class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]">
            <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" x="100%"
                        patternTransform="translate(0 -1)">
                        <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
            </svg>
        </div>
        <el-alert v-show="false" title="后台管理" type="success" :closable="false" style="position: fixed"></el-alert>
        <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
                <div style="color: transparent">左侧区域占位符</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="login-form">
                    <div class="form-header">
                        <div class="title">您好 !</div>
                        <div class="title-tips">欢迎使用后台管理系统！</div>
                    </div>
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" :prefix-icon="User" autocomplete="off" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" type="password" show-password :prefix-icon="Lock"
                            autocomplete="off" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-btn" type="primary" size="large" :loading="loading"
                            @click="submitForm(ruleFormRef)">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import type { FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { HOME_URL } from '@/config/config'
import { timeFix } from '@/utils/index'
import { login } from '@/api'
const router = useRouter()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()
const userStore = useUserStore()
const ruleForm = reactive({
  username: 'admin',
  password: '111111',
})
const loading = ref(false)
const validateUsername = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  } else if (value.length < 4) {
    callback(new Error('用户名长度不能小于4位'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [{ required: true, validator: validateUsername }],
  password: [{ required: true, validator: validatePassword }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      const { data } = await login(ruleForm)
      userStore.setToken(data)
      console.log(data)
      router.replace((route.query.redirect as string) || HOME_URL)
      ElNotification({
        title: `hi,${timeFix()}!`,
        message: `欢迎回来`,
        type: 'success',
      })
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
    min-height: 100vh;
    background: url('@/assets/images/bg.jpg') no-repeat;
    background-size: cover;
    overflow: hidden;

    .form-header {
        margin-bottom: 40px;

        .title-tips {
            margin-top: 29px;
            font-size: 26px;
            font-weight: 400;
            color: var(--el-color-white);
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .title {
            font-size: 54px;
            font-weight: 500;
            color: var(--el-color-white);
        }
    }

    .login-form {
        position: relative;
        max-width: 100%;
        padding: 4.5vh;
        margin: calc(50vh - 277.5px) 5vw 5vw;
        overflow: hidden;
        //   background: url('@/assets/images/login_form.png');
        background-size: 100% 100%;

        .login-btn {
            display: inherit;
            width: 100%;
            height: 48px;
            margin-top: 5px;
            border: 0;

            &:hover {
                opacity: 0.9;
            }
        }
    }

    :deep(.el-form) {
        .el-form-item {
            padding-right: 0;
            margin: 20px 0;
            color: #454545;
            border: 1px solid transparent;
            border-radius: 2px;

            &__content {
                min-height: $base-input-height;
                line-height: $base-input-height;
            }

            &__error {
                position: absolute;
                top: 100%;
                left: 18px;
                font-size: $base-font-size-small;
                line-height: 18px;
                color: $base-color-red;
            }
        }

        .el-input {
            box-sizing: border-box;

            input {
                height: 48px;
                font-size: $base-font-size-default;
                line-height: 58px;
                color: $base-font-color;
                border: 0;
                caret-color: $base-font-color;
            }
        }
    }
}
</style>