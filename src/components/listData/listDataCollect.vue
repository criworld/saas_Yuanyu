<template>
	<view class="listData">
		<view v-for="(item,i) in listData" :key="i">
			<view class="item">
				<image src="../../static/text.png" mode=""></image>
				<view>qjo</view>
				<view>qjo</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			listData: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listData {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.item {
			image {
				width: 330rpx;
				height: 330rpx;
				border-radius: 30rpx;
			}
		}
	}
</style>
