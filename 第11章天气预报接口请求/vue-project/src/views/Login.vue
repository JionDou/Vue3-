<template>
    <main>
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
        <div class="login">
            <h2>登录</h2>
            <div class="innner">
                <div class="inputBox">
                    <input type="text" placeholder="账号" v-model="loginForm.username">
                </div>
                <div class="inputBox">
                    <input type="password" placeholder="密码" v-model="loginForm.password">
                </div>
                <div class="inputBox">
                    <input type="submit" value="登录" id="btn">
                </div>
                <div class="group">
                    <a href="#">忘记密码</a>
                    <a href="#">注册</a>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { ref, reactive } from 'vue'
export default {
 setup() {
    const loginForm = reactive({
        username: "",
        password: "",
    });
    const descriptor = reactive({
        username: {
            required: true,
            message: "姓名不能为空",
        },
        password: [
            {
            required: true,
            message: "密码不能为空",
            },
        ],
    });
 }
}
</script>
<style lang="less" scoped>
.login {
    position: relative;
    padding: 60px;
    background-color: rgba(255, 255, 255, .25);
    backdrop-filter: blur(15px);
    width: 500px;
    border-radius: 20px;
    border: 1px solid #fff;
    border-right-color: rgba(255, 255, 255, .5);
    border-bottom-color: rgba(255, 255, 255, .5);
    display: flex;
    flex-direction: column;
    gap: 30px;

    h2 {
        position: relative;
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        color: #333;
        margin-bottom: 10px;
    }
    .inputBox 
        input {
        position: relative;
        width: 100%;
        padding: 15px 20px;
        outline: none;
        font-size: 16px;
        color: #333;
        border-radius: 5px;
        background-color: #f9fafb;
        border: none;
        margin-bottom: 30px;
    }
    ::placeholder {
        color: #000;
    }
    #btn {
        position: relative;
        border: none;
        outline: none;
        background-color: #333;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        font-weight: 400;
        transition: 0.5s;
    }
    #btn:hover {
        background-color: #666;
    }
}
.group {
    display: flex;
    justify-content: space-between;
    a {
        font-size: 12px;
        color: #333;
        font-weight: 400;
        text-decoration: none;
    }
    :nth-child(2) {
        text-decoration: underline;
    }
}
</style>