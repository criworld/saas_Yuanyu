<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view class="type d-flex flex-column j-center a-center">
			<text v-if="subDetailData.award == 2" class="iconfont icon-shibai"></text>
			<text v-if="subDetailData.award == 1" class="iconfont icon-chenggong1"></text>
			<text v-if="subDetailData.award == 0" class="iconfont icon-time-circle-fill"></text>
			<text class="luckyNumberDetail_text wei" v-if="subDetailData.award == 2">
				未中签
			</text>
			<text class="luckyNumberDetail_text yi" v-if="subDetailData.award == 1">
				已中签
			</text>
			<text class="luckyNumberDetail_text dai" v-if="subDetailData.award == 0">
				待公布
			</text>
		</view>
		<view class="list mx-3">
			<view class="item d-flex flex-row j-sb a-center py-3">
				<text>活动类型</text>
				<text v-if="subDetailData.activityType == 1">优先购</text>
				<text  v-if="subDetailData.activityType == 2">普通购</text>
			</view>
			<view class="item d-flex flex-row j-sb a-center py-3">
				<text>资产名称</text>
				<text>{{ subDetailData.name }}</text>
			</view>
			<view class="item d-flex flex-row j-sb a-center py-3">
				<text>认购数量</text>
				<text>{{ subDetailData.buyNum }}个</text>
			</view>
			<view class="item d-flex flex-row j-sb a-center py-3" v-if="subDetailData.award == 1">
				<text>中签数量</text>
				<text>{{ subDetailData.awardNum }}个</text>
			</view>
			<view class="item d-flex flex-row j-sb a-center py-3">
				<text>认购时间</text>
				<text>{{ subDetailData.createdAt }}</text>
			</view>
			<view class="item d-flex flex-row j-sb a-center py-3" v-if="subDetailData.award != 0">
				<text>公布时间</text>
				<text>{{ subDetailData.awardAt }}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
import { subDetail } from '@/common/api';
export default {
	data() {
		return {
			centerTitle: '中签记录',
			subDetailData: {}
		};
	},
	onLoad(e) {
		this.getSubDetail(e.no)
	},
	methods: {
		getSubDetail(orderNo) {
			subDetail(orderNo).then(res => {
				this.subDetailData = res;
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
}
.type{
	margin-top:100rpx;
	.icon-chenggong1{
		font-size:70px;
		color: var(--c-bgcportiongradual-h1-2);
	}
	.icon-shibai{
		font-size:70px;
		color: var(--c-979998-fontcolor2);
	}
	.wei{
		margin-top:30rpx;
		font-size: 36rpx;
		color: var(--c-979998-fontcolor2);
	}
	.yi{
		margin-top:30rpx;
		font-size: 36rpx;
		color: var(--c-bgcportiongradual-h1-2);
	}
	.dai{
		margin-top:30rpx;
		font-size: 36rpx;
		color: var(--c-609DF8-fontcolor12);
	}
	.icon-time-circle-fill{
		font-size:70px;
		color: var(--c-609DF8-fontcolor12);
	}
}
.list{
	margin-top:100rpx;
	.item{
		text:nth-of-type(1){
			font-size: 28rpx;
			color: var(--c-ffffff-fontcolor1);

		}
		text:nth-of-type(2){
			font-size: 28rpx;
			color: var(--c-838484-fontcolor6);
		}
	}
}
</style>
