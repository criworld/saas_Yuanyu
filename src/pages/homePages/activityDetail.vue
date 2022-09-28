<template>
	<view class="activityDetail tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar titleLocation="center" backPath="/pages/homePages/index" centerTitle="活动详情页"></homeTopBar>
		<view class=" activityDetail_body m-3 btmImg">
			<view class="activityDetail_head">
				<image :src="getcollectionDetailInfo.cover" mode=""></image>
				<view class="d-flex a-center activityDetail_head_dit p-1">
					<view v-if="getcollectionDetailInfo.status == 1">
						<text class="iconfont daojishi">&#xe663;</text>
						<text
							class="activityDetail_head_status">{{ getcollectionDetailInfo.statusTxt }}{{ getcollectionDetailInfo.startTime }}</text>
					</view>
					<view class="activityDetail_head_status" v-if="getcollectionDetailInfo.status == 0">
						{{ getcollectionDetailInfo.statusTxt }}
					</view>
					<view class="activityDetail_head_status" v-if="getcollectionDetailInfo.status == 2">
						{{ getcollectionDetailInfo.statusTxt }}
					</view>
				</view>
				<view>
					<view class="activityDetail_bottom_title font-35 my-1">{{ getcollectionDetailInfo.name }}</view>
					<view class="px-2 text-left">{{ getcollectionDetailInfo.intro }}</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="activityName d-flex a-center j-center">
			<image src="../../static/common/name_left.png" mode=""></image>
			<text>商品</text>
			<image src="../../static/common/name_right.png" mode=""></image>
		</view>
		<view class="activityDetail_list d-flex j-sb flex-wrap m-4">
			<view class="activityDetail_list_item btmImg1" @click="toBuyInfo(val.alias,val.activityId,val.activityType)"
				v-for="(val,index) in getcollectionDetailInfo.list" :key="index">
				<image :src="val.cover" mode=""></image>
				<view class="d-flex j-center"
					:class="{'new_state':val.activityType == '1','new_state1':val.activityType == '2','new_state2':val.activityType == '3'}">
					<text v-if="val.activityType == '3'" class="iconfont icon daojishi">&#xe663;</text>
					<text v-if="val.activityType == '2'" class="iconfont icon gouwuchefill">&#xe73c;</text>
					<text v-if="val.activityType == '1'" class="iconfont icon shandian1">&#xe8c5;</text>
					<view class="new_buy_way d-inline-block">{{ val.activityTypeString }}</view>
				</view>
				<view class="activityDetail_list_item_name">{{ val.name }}</view>
				<view class="activityDetail_list_item_price font-weight">¥{{ val.price }}</view>
			</view>
		</view>
		<view class="bottomHeight"></view>
	</view>
</template>

<script>
	import {
		collectionDetail
	} from '@/common/api'
	export default {
		data() {
			return {
				list: [{}, {}, {}],
				getcollectionDetailInfo: {},
				opId: ''
			}
		},
		onLoad(op) {
			this.opId = op.id;
			this.getcollectionDetail(op.id);
		},
		methods: {
			getcollectionDetail(id) {
				collectionDetail(id).then(res => {
					this.getcollectionDetailInfo = res;
				})
			},
			toBuyInfo(alias, activityId, activityType) {
				if (activityType == 3) {
					uni.navigateTo({
						url: '/pages/homePages/seckillTime?alias=' + alias + '&type=' + '秒杀' + '&backPath=' + 'y' +
							'&opId=' + this.opId
					});
				} else {
					uni.navigateTo({
						url: "/pages/homePages/detailBuy?alias=" + alias + '&id=' + activityId + '&backPath=' +
							'y' + '&opId=' + this.opId
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin bgc {
		position: absolute;
		left: 0rpx;
		top: 0rpx;
		width: max-content;
		color: var(--c-eddbb3-fontcolor3);
		border-radius: 25rpx 0 25rpx 0;
		padding: 7rpx 20rpx;
	}

	.activityDetail {
		min-height: 100vh;
		background-color: var(--c-232728-bgc);

		.activityDetail_body {
			// height: 900rpx;
			position: relative;

			.activityDetail_head {
				text-align: center;

				image {
					width: 690rpx;
					height: 690rpx;
					border-radius: 15rpx;
				}

				.activityDetail_head_dit {
					position: absolute;
					top: 30rpx;
					left: 35rpx;
					background: linear-gradient(90deg, var(--c-bgcportiongradual-l-1) 0%, var(--c-bgcportiongradual-l-2) 100%);
					border-radius: 15rpx;

					.daojishi {
						color: var(--c-eddbb3-font);
						margin-right: 10rpx;
					}

					.activityDetail_head_status {
						color: var(--c-eddbb3-fontcolor3);
					}
				}

				.activityDetail_bottom_title {
					color: var(--c-ffffff-fontcolor1);
				}
			}
		}

		.btmImg {
			background: url(@/static/common/bottomImg1.png) no-repeat;
			background-size: 100% auto;
			background-position: 0 100%;
		}

		.activityName {
			image {
				width: 180rpx;
				height: 20rpx;
			}

			text {
				font-size: 35rpx;
				color: var(--c-ffffff-fontcolor1);
				padding: 0 20rpx;
			}
		}

		.activityDetail_list_item {
			position: relative;
			width: 320rpx;
			height: 430rpx;

			.new_state {
				@include bgc;
				background: linear-gradient(90deg, var(--c-bgcportiongradual-l-1) 0%, var(--c-bgcportiongradual-l-2) 100%);

			}

			.new_state1 {
				@include bgc;
				background: linear-gradient(90deg, var(--c-bgcportiongradual-z1-1) 0%, var(--c-bgcportiongradual-z1-2) 100%);

			}

			.new_state2 {
				@include bgc;
				background: linear-gradient(90deg, var(--c-bgcportiongradual-h1-1) 0%, var(--c-bgcportiongradual-h1-2) 100%);
			}

			.activityDetail_list_item_name {
				color: var(--c-ffffff-fontcolor1);
				margin-left: 10rpx;
				font-size: 30rpx;
			}

			.activityDetail_list_item_price {
				color: var(--c-eddbb3-fontcolor3);
				margin-left: 10rpx;
				margin-top: 10rpx;
			}

			image {
				width: 320rpx;
				height: 320rpx;
				border-radius: 25rpx;
			}

			.iconfont {
				color: var(--c-eddbb3-font);
				margin-right: 10rpx;
			}

			.icon {
				margin-right: 0rpx;
				padding-top: 6rpx;
				padding-right: 8rpx;
				border-radius: 5rpx 0 0 5rpx;
			}

			.shandian1 {
				margin-right: 0rpx;
				// background-color: var(--c-3a3a3b-fontcolor8);
				padding-top: 6rpx;
				border-radius: 5rpx 0 0 5rpx;
			}

			.new_buy_way {
				width: 75rpx;
				text-align: center;
				font-size: 26rpx;
				padding: 5rpx 10rpx 5rpx 5rpx;
				// border-radius: 0 5rpx 5rpx 0;
				// background-color: var(--c-eddbb3-btc);
				// color: var(--c-232728-fontcolor4);
			}
		}
	}

	.line {
		width: 690rpx;
		height: 1px;
		background: var(--c-EBEBEB-linecolor3);
		margin: 50rpx auto;
	}

	.btmImg1 {
		background: url(@/static/common/bottomImg1.png) no-repeat;
		background-size: 100% 150rpx;
		background-position: 0 100%;
	}
</style>
