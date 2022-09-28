<template>
	<view class="con px-3 tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar backIcon="back" titleLocation="center" :centerTitle="centerTitle"></homeTopBar>
		<view style="height:80rpx"></view>
		<view class="tips">{{JSON.parse(themeJson).supplierName}}团队将进行一下验证确保您的账号安全</view>
		<view style="height:60rpx"></view>
		<view class="title">-账号安全状态</view>
		<view style="height:20rpx"></view>
		<view class="text">您的账号没有被盗风险及违规行为</view>
		<view style="height:60rpx"></view>
		<view class="title">-注销后您的账号将</view>
		<view style="height:20rpx"></view>
		<view class="text">1.无法登录；</view>
		<view style="height:10rpx"></view>
		<view class="text">2.所有信息将被删除和清理（包括付款、中签、认购记录等）；</view>
		<view style="height:10rpx"></view>
		<view class="text">3.其他不限于以上所举例的你的账号权益。</view>
		
		<view style="height:460rpx"></view>
		<view class="agree d-flex flex-row j-center a-center">
			<text class="iconfont icon-xuanzhong" v-if="isCheck"  @click="SelectResult"></text>
			<text class="iconfont icon-weixuanzhong" v-else @click="SelectResult"></text>
			<text @click="SelectResult">我同意并接受各类资产、权益的处理结果</text>
		</view>
		<view style="height:80rpx"></view>
		<view class="btn d-flex flex-row  a-center j-sb mx-5">
			<text class="d-inline-block text-center" @click="cancellation">确认注销</text>
			<text class="d-inline-block text-center" @click="close">再想想</text>
		</view>
	</view>
</template>

<script>
export default {

	data() {
		return {
			centerTitle:'账号注销提示',
			isCheck:false,//是否勾选同意协议
			ipone:''
		};
	},
	onLoad(e) {
		this.ipone = e.ipone
	},
	methods: {
		close(){
			uni.navigateBack();
		},
		SelectResult(){
			this.isCheck = !this.isCheck
		},
		cancellation(){
			if(this.isCheck == false){
				uni.showToast({
					title: '请勾选我同意并接受各类资产、权益的处理结果',
					icon:'none'
				});
				return
			}
			uni.navigateTo({
				url: '/pages/mine/set/cancelAccount?ipone=' + this.ipone,
				animationDuration: 0
			});
			
		}
	}
};
</script>

<style lang="scss" scoped>
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
}
.tips{
	font-size: 30rpx;
	line-height: 42rpx;
	color: var(--c-609DF8-fontcolor12);
}
.title{
	font-size: 32rpx;
	line-height: 44rpx;
	color: var(--c-ffffff-fontcolor1);

}
.text{
	font-size: 28rpx;
	line-height: 40rpx;
	color: var(--c-979998-fontcolor7);
}
.agree{
	text:nth-of-type(1){
		color:var(--c-ffffff-fontcolor1)
	}
	text:nth-of-type(2){
		margin-left:20rpx;
		font-size: 24rpx;
		color:var(--c-ffffff-fontcolor1)
	}
}
.btn{
	text:nth-of-type(1){
		width: 252rpx;
		height: 66rpx;
		line-height: 66rpx;
		border: 1rpx solid var(--c-609DF8-fontcolor12);
		border-radius: 8rpx;
		font-size: 30rpx;
		color: var(--c-609DF8-fontcolor12);
	}
	text:nth-of-type(2){
		width: 252rpx;
		height: 66rpx;
		line-height: 66rpx;
		background:var(--c-7A9EFC-bgcportion7);
		border-radius: 8rpx;
		font-size: 30rpx;
		color: var(--c-eddbb3-fontcolor3);
	}
}

</style>
