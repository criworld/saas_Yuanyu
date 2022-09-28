<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view style="height:30rpx"></view>
		<view class="payDeails px-3 py-4 d-flex flex-row j-sb a-center">
			<view class="left">
				<text
					class="iconfont icon-gantanhao"
					v-if="orderDetailData.status == 2"
				></text>
				<text
					class="iconfont icon-chenggong1"
					v-if="orderDetailData.status == 1"
				></text>
				<text
					class="iconfont icon-time-circle-fill"
					v-if="orderDetailData.status == 0"
				></text>
			</view>

			<view
				class="right flex-1 d-flex flex-column"
				v-if="orderDetailData.status == 2"
			>
				<text>支付已超时</text>
				<text>订单已超时,多次超时未支付将禁止交易</text>
			</view>
			<view
				class="right flex-1 d-flex flex-column"
				v-if="orderDetailData.status == 1"
			>
				<text>已支付</text>
				<text>恭喜您已成功支付</text>
			</view>

			<view
				class="right flex-1 d-flex flex-column"
				v-if="orderDetailData.status == 0"
			>
				<text>待支付</text>
				<view class="text d-flex flex-row a-center">
					支付倒计时
					<u-count-down
						@finish="finish()"
						:time="orderDetailData.lastSec * 1000"
						format="HH:mm:ss"
						style="margin-left:10rpx"
						class="timers"
					></u-count-down>
				</view>
			</view>
		</view>
		<view style="height:30rpx"></view>
		<view class="back  px-4 py-4">
			<view class="details d-flex flex-row j-sb a-center">
				<view class="left ">
					<image
						style="width: 130rpx;height: 130rpx;border-radius: 10rpx;margin-right: 30rpx;"
						:src="orderDetailData.icon"
						mode="scaleToFill"
					></image>
				</view>
				<view class="right flex-1">
					<view class="name">{{ orderDetailData.name }}</view>
					<view
						class="d-flex flex-row j-sb a-center"
						style="margin-top:40rpx"
					>
						<text class="price">
							¥{{ orderDetailData.sumPriceYuan }}
						</text>
						<text class="num">X{{ orderDetailData.buyNum }}</text>
					</view>
				</view>
			</view>
			<view class="list" style="margin-top:30rpx;">
				<view class="item py-3">
					<text>订单编号</text>
					<text>{{ orderDetailData.orderNo }}</text>
				</view>
				<!-- <view class="item py-3">
					<text>认购编号</text>
					<text>没有</text>
				</view> -->
				<view class="item py-3">
					<text>截止时间</text>
					<text>{{ orderDetailData.payEndTime }}</text>
				</view>
				<view class="item py-3" v-if="orderDetailData.status == 1">
					<text>支付时间</text>
					<text>{{ orderDetailData.paidAt }}</text>
				</view>
				<view class="item py-3" v-if="orderDetailData.status == 1">
					<text>支付方式</text>
					<text v-if="orderDetailData.payMethod == 'hee_bank_pay'">
						汇付宝云闪付支付
					</text>
					<text v-if="orderDetailData.payMethod == 'wallet_pay'">
						余额支付
					</text>
					<text v-if="orderDetailData.payMethod == 'hxt_pay'">
						hxt支付
					</text>
					<text v-if="orderDetailData.payMethod == 'wx_h5_pay'">
						微信h5支付
					</text>
					<text v-if="orderDetailData.payMethod == 'hee_pay'">
						汇付宝支付
					</text>
					<text v-if="orderDetailData.payMethod == 'wx_js_pay'">
						微信小程序支付
					</text>
					<text v-if="orderDetailData.payMethod == 'ali_h5_pay'">
						支付宝h5支付
					</text>
					<text v-if="orderDetailData.payMethod == 'sande_pc_pay'">
						杉德支付
					</text>
				</view>
			</view>
			
			<view class="">
				<view class="item-num py-2 d-flex flex-row j-sb a-center">
					<text>金额总计</text>
					<text>¥{{ orderDetailData.sumPriceYuan }}</text>
				</view>
				<view class="item-num py-2 d-flex flex-row j-sb a-center">
					<text>实付金额</text>
					<text>¥{{ orderDetailData.sumPriceYuan }}</text>
				</view>
			</view>
			<view class="d-flex a-center j-center" v-if="orderDetailData.status == 0">
				<MButton
					class="immediatelyBuy"
					text="立即支付"
					@click.native="toPay(orderDetailData.orderNo)"
				></MButton>
			</view>
			<view style="height:70rpx"></view>
		</view>
	</view>
</template>

<script>
import countdownTimer from '@/components/countDown/countdown-timer.vue';
import { orderDetail, orderCreate } from '@/common/api.js';
export default {
	components: {
		countdownTimer
	},
	data() {
		return {
			orderDetailData: {},
			getOrderNo: '',
			getPay_status: '',
			getLengthen: 1,
			centerTitle: '订单详情'
		};
	},
	onLoad(option) {
		this.getOrderNo = option.orderNo;
		this.getLengthen = option.lengthen;
		this.getPay_status = 1;
	},
	onShow() {
		if (this.getLengthen == 1) {
			setTimeout(() => {
				orderDetail(this.getOrderNo).then(res => {
					this.orderDetailData = res;
				});
			}, 1000);
		} else {
			orderDetail(this.getOrderNo).then(res => {
				this.orderDetailData = res;
			});
		}
		if (this.getPay_status == 0) {
			this.$u.toast('支付失败，请重新支付~');
		}
	},
	methods: {
		toPay(orderNo) {
			const token = uni.getStorageSync('token');
			this.$store.commit('setPayPath', 2);
			let params = {
				orderNo,
				successRedirectUrl: 'successRedirectUrl',
				exitRedirectUrl: 'exitRedirectUrl'
			};
			orderCreate(params).then(res => {
				uni.navigateTo({
					url: '/pages/pay?orderNo=' + res + '&token=' + token + '&pathEntrance=2' + '&getOrderNo=' + this.getOrderNo,
					animationDuration: 0
				});
				// navto({
				// 	url: '/pages/pay',
				// 	tag: 'open',
				// 	time: 0,
				// 	data: {
				// 		token,
				// 		orderNo: res,
				// 		getOrderNo: this.getOrderNo,
				// 		pathEntrance: 2
				// 	}
				// });
			});
		},
		finish() {
			this.orderDetailData.status = 2;
		}
	}
};
</script>

<style scoped lang="scss">
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
}
.timers{
	color:var(--c-ffffff-fontcolor1)
}
.payDeails {
	background: linear-gradient(90deg, var(--c-DAE9FF-bgcportiongradual3) 0%, var(--c-E8E4FF-bgcportiongradual4) 100%);
	.left {
		text {
			font-size: 55px;
			color: var(--c-eddbb3-fontcolor3);
		}
	}
	.right {
		margin-left: 35rpx;
		text:nth-of-type(1) {
			font-weight: 500;
			font-size: 40rpx;
			line-height: 56rpx;
			color: var(--c-ffffff-fontcolor1);
		}
		text:nth-of-type(2) {
			margin-top: 10rpx;
			font-weight: 400;
			font-size: 26rpx;
			line-height: 36rpx;
			color: var(--c-ffffff-fontcolor1);
		}
		.text {
			font-weight: 400;
			font-size: 26rpx;
			line-height: 36rpx;
			color: var(--c-ffffff-fontcolor1);
		}
		::v-deep .u-count-down__text span {
			font-weight: 400;
			font-size: 26rpx;
			line-height: 36rpx;
			color: var(--c-ffffff-fontcolor1);
		}
	}
}
.payType{
	color: var(--c-609DF8-fontcolor12);
}
.back {
	.name {
		font-weight: 500;
		font-size: 32rpx;
		line-height: 44rpx;
		color: var(--c-ffffff-fontcolor1);
	}
	.price {
		font-size: 30rpx;
		line-height: 36rpx;
		color: var(--c-ffffff-fontcolor1);
	}
	.num {
		font-weight: 400;
		font-size: 26rpx;
		color: var(--c-979998-fontcolor2);
	}
}
.list {
	.item {
		border-bottom: 1rpx solid var(--c-EBEBEB-linecolor3);
		text:nth-of-type(1) {
			font-weight: 400;
			font-size: 32rpx;
			line-height: 44rpx;
			color: var(--c-ffffff-fontcolor1);
		}
		text:nth-of-type(2) {
			margin-left: 20rpx;
			font-weight: 400;
			font-size: 30rpx;
			line-height: 44rpx;
			color: var(--c-979998-fontcolor2);
		}
	}
}
.item-num {
	border-bottom: 1rpx solid var(--c-EBEBEB-linecolor3);
	text:nth-of-type(1) {
		font-weight: 400;
		font-size: 32rpx;
		line-height: 44rpx;
		color: var(--c-ffffff-fontcolor1);
	}
	text:nth-of-type(2) {
		font-size: 30rpx;
		line-height: 44rpx;
		color: var(--c-979998-fontcolor2);
	}
}
.immediatelyBuy {
	margin-top: 100rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		width: 160rpx;
		height: 60rpx;
		background-color: var(--c-7A9EFC-bgcportion7);
		border-radius: 12rpx;
		color:var(--c-eddbb3-fontcolor3)
	}

.immediatelyBuyCancel{
	margin-top: 100rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		width: 160rpx;
		height: 60rpx;
		border: 1rpx solid var(--c-609DF8-fontcolor12);
		border-radius: 12rpx;
		color:var(--c-609DF8-fontcolor12)
	}

.cancelBtn {
	// border:1rpx solid var(--c-2f3334-linecolor1);
	// background: var(--c-0d0d0d-bgcportion2);
}
</style>
