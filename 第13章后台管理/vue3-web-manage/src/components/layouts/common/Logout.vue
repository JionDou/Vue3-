<template>
    <div class="headerContainer noCopy">
        <div class="header-left">
            <div class="switch-btn">
                <el-icon name="expand" />
                <el-icon name="fold" />
            </div>
            <div class="logo"><img class="logo-img" alt="logo" src="/logo.png" /></div>
        </div>
        <div class="header-right">
            <el-dropdown @visible-change="onChange" @command="handleCommand">
                <div class="avatar-dropdown">
                    <img class="user-avatar" :src="avatar" alt="" />
                    <div class="user-name">{{ name }}</div>
                    <el-icon class="up-down">
                        <component :is="visible ? 'ArrowUp' : 'ArrowDown'" />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">
                            <svg-icon name="logout" size="16px" />
                            <span>退出登陆</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { LOGIN_URL } from '@/config/config'
export default defineComponent({
    components: {
        ArrowUp,
        ArrowDown,
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const userStore = useUserStore()

        const { name, avatar } = userStore.userInfo || {}
        const visible = ref(false)
        
        function onChange(show: boolean) {
            visible.value = show
        }

        function handleCommand(command: string) {
            if (command === 'logout') {
                logout()
            }
        }

        // 退出登陆
        function logout() {
            ElMessageBox.confirm('您确定要退出吗？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                await userStore.Logout()
                router.push({ path: LOGIN_URL, query: { redirect: route.fullPath } })
                ElMessage.success('退出成功！')
            })
        }
        return {
            name,
            avatar,
            visible,
            onChange,
            handleCommand,
        }
    },
})
</script>
  
<style scoped lang="scss">
.avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 50px;
    padding: 0;

    .user-avatar {
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
    }

    .user-name {
        position: relative;
        margin: 0 6px;
        cursor: pointer;
    }
}
</style>
  