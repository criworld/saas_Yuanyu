<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson),bgImg]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view class="u-content">
			<view class="title">
				《{{JSON.parse(themeJson).supplierName}}{{centerTitle}}》
			</view>
			<u-parse class="u-parses" :content="text" :tagStyle="style"></u-parse>
		</view>
	</view>
</template>

<script>
import { pageGettexts } from '@/common/api';	
export default {
	data() {
		return {
			centerTitle:"",
			text:'',
			style: {
				// 字符串的形式
				p: 'color: var(--c-979998-fontcolor7);font-size:28rpx',
				img:'width:700rpx;margin-top:20rpx',
			},
			bgImg:{
				backgroundImage: `url(${JSON.parse(this.themeJson).allImg1})`
			},
		};
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title: e.name
		})
		this.centerTitle = e.name
		pageGettexts(e.type).then(res => {
			this.text = res.text
		});
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
.con {
	min-height: 100vh;
	background-color: var(--c-232728-bgc);
	width: 750rpx;
	background-size: 750rpx;
}
.u-content{
	background-color: var(--c-eddbb3-font);
	border-radius: 20rpx;
	font-weight: 400;
	font-size: 24rpx;
	text-align: justify;
	padding: 30rpx 20rpx;
	margin: 0 30rpx;
	margin-top: 50rpx;
	color: var(--c-838484-fontcolor6);
}
.u-parses{
	font-size: 24rpx;
	font-weight: 400;
	color: var(--c-838484-fontcolor6);
	line-height: 42rpx;
}
.title{
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 26rpx;
	font-weight: bold;
	color: var(--c-ffffff-fontcolor1);
}
</style>
