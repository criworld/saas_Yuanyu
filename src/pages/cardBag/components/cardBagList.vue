<template>
	<view>
		<view class="listData" :style="[JSON.parse(themeJson)]">
			<view class="two">
				<view class="item" v-for="(item,index) in list" :key="index" @click="toDetails(item)">
					<image
						:src="item.icon"
						mode="aspectFill"
					></image>
					<view class="bottom">
						<text>{{item.assetName}}</text>
						<text>#{{item.no}}/{{item.total}}</text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list:{}
		},
		methods: {
			toDetails(item){
				this.$emit('onChange',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
.listData {
	padding: 0 30rpx;
	.two {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		.item {
			width: 330rpx;
			height: 430rpx;
			margin-bottom: 30rpx;
			border-radius: 20rpx;
			box-shadow: 0px 0px 10rpx 0px rgba(71,72,93,.3);
			background-size: 330rpx 430rpx;
			text-align: center;

			image {
				width: 330rpx;
				height: 330rpx;
				border-radius: 20rpx;
			}
			.bottom {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-around;
				text:nth-of-type(1){
					font-size: 26rpx;
					color: var(--c-ffffff-fontcolor1);
					margin: 10rpx 10rpx;
				}
				text:nth-of-type(2){
					margin: 0 10rpx;
					font-size: 26rpx;
					color: var(--c-ffffff-fontcolor1);
				}
			}
		}
	}
}
</style>
