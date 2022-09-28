<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			centerTitle: '联系我们',
		};
	},
	
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
}
</style>
