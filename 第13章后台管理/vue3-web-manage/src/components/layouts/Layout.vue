<template>
	<div class="homeContainer">
		<LayHeader></LayHeader>
		<SilderBar></SilderBar>
		<LayoutTabsBar/>
		<div class="viewBox noCopy" :class="{ 'collapse': collapse }">
			<!-- <Tags></Tags> -->
			<div class="viewBoxIn">
				<router-view v-slot="{ Component }">
					<transition name="move" mode="out-in">
						<keep-alive :include="tagsList">
							<component :is="Component" />
						</keep-alive>
					</transition>
				</router-view>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref } from "vue";
	import LayHeader from "./common/LayHeader.vue";
	// import Logout from "./common/Logout.vue";
	import SilderBar from "./common/SilderBar.vue"
	import LayoutTabsBar from "./common/TabsBar.vue"
	export default defineComponent({
		components: {
			// Logout,
			LayHeader,
			SilderBar,
			LayoutTabsBar
		},
		setup() {
            const collapse = ref('')
            const tagsList = ref([])
			return {
				collapse,
				tagsList
			}
		}
	})
</script>
<style lang="scss" scoped>
	.homeContainer {
		.viewBox {
			position: absolute;
			min-width: 1000px;
			left: 264px;
			right: 0;
			top: 70px;
			bottom: 0;
			box-sizing: border-box;
			-webkit-transition: left .2s ease-in-out;
			transition: left .2s ease-in-out;
			background: #f8f8f8;
			overflow-y: hidden;
			&.collapse {
				left: 64px;
			}
			.viewBoxIn {
				height: calc(100% - 40px);
				overflow-y: auto;
				padding: 16px;
				box-sizing: border-box;
			}
		}
	}
</style>