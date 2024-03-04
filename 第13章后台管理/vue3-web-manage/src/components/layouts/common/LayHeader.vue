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
			<el-dropdown class="user-name" trigger="hover">
				<div class="info">
					<el-image :src="avatar" fit="cover">
					</el-image>
					<div class="user-name">{{ name }}</div>
					<el-icon>
						<caret-bottom />
					</el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script setup>
import { LOGIN_URL } from '@/config/config'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { avatar, name } = userStore.userInfo || {}
console.log("............",userStore.userInfo)
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
</script>
<style lang="scss" scoped>
.headerContainer {
	width: 100%;
	height: 70px;
	min-width: 1000px;
	font-size: 22px;
	color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	box-sizing: border-box;
	// background-color: #242f42;
	background-image: linear-gradient(to right, #075985, #0284c7);
	display: flex;
	justify-content: space-between;
	padding: 0 25px;

	.header-left {
		display: flex;
		align-items: center;

		.switch-btn {
			cursor: pointer;
			display: flex;
			align-items: center;
			margin: 0 12px 0 0;
		}
	}

	.header-right {
		.user-name {
			color: #fff;
			cursor: pointer;
			height: 70px;
			display: flex;
			align-items: center;

			.info {
				display: flex;
				align-items: center;
			}

			.el-image {
				display: block;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				margin: 0 10px 0 0;
			}
		}
	}

	.logo-img {
		display: inline-block;
		width: 50px;
		height: 50px;
		vertical-align: middle;
	}
}</style>
