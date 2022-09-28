<template>
	<view>
		<view
			class=" mb-3 mx-2 btmImg"
			v-for="(item, index) in list"
			:key="index"
		>
			<view class="" @click="payDeail(item.orderNo)">
				<view class="d-flex j-sb" style="margin-bottom: 10rpx;">
					<view class="text-light-content">
						订单号：{{ item.orderNo }}
					</view>
					<view class="text-gold">
						<text v-if="item.status == 1" class="text1">
							待支付
						</text>
						<text v-if="item.status == 2" class="text2">
							已支付
						</text>
						<text v-if="item.status == 3" class="text3">
							已超时
						</text>
						<text v-if="item.status == 4" class="text4">
							已取消
						</text>
					</view>
				</view>
				<!-- <view class="d-flex j-center">
					<u-line color="red" margin="0 0 20rpx 0"></u-line>
				</view> -->
				<view class="d-flex j-sb" style="margin-top:30rpx">
					<view class="d-flex">
						<image
							style="width: 130rpx;height: 130rpx;margin-right: 30rpx;border-radius: 10rpx;"
							:src="item.icon"
							mode=""
						></image>
						<view class="font-md name">
							{{ item.name }}
						</view>
					</view>
					<view style="text-align: right;">
						<view class="text-light-content num">
							×{{ item.num }}
						</view>
						<view class="mt-1 price">
							价格：￥{{ item.priceYuan }}
						</view>
						<view class="real mt-1">
							实际支付：￥{{ item.realFeeYuan }}
						</view>
					</view>
				</view>
			</view>

			<view class="d-flex j-sb a-center my-3">
				<!-- <view v-if="item.status == 1">
					<view
						class="immediatelyBuy text-center"
						@click="toPay(item.orderNo)"
					>立即支付</view>
				</view> -->
			</view>
			<view class="d-flex j-sb a-center" v-if="item.status == 1">
				<view class="text-light-content font-28r">支付剩余:</view>
				<template>
					<countdown-timer
						autoStart
						:time="item.lastSec * 1000"
						@finish="finish(index)"
					>
						<template v-slot="{ day, hour, minute, second }">
							<view class="time-num">
								<text>{{ day }}</text>
								<text>:</text>
								<text>{{ hour }}</text>
								<text>:</text>
								<text>{{ minute }}</text>
								<text>:</text>
								<text>{{ second }}</text>
							</view>
						</template>
					</countdown-timer>
				</template>
				
				<view v-if="item.status == 1" class="d-flex flex-row a-center">
					<view
						class="immediatelyBuy text-center"
						@click.stop="toPay(item.orderNo)"
					>立即支付</view>
					<view
						class="immediatelyBuyCancel text-center"
						style="margin-left:30rpx;"
						@click.stop="orderCancel(item.orderNo)"
					>
						取消支付
					</view>
					
				</view>
			</view>

			<view class="time" v-if="item.status == 2">
				支付时间：
				<text>{{ item.payAt }}</text>
			</view>
			<view class="time" v-if="item.status == 3">
				超时时间：
				<text>{{ item.updatedAt }}</text>
			</view>
			<view class="time" v-if="item.status == 4">
				取消时间：
				<text>{{ item.updatedAt }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import MButton from '@/components/widget/MButton';
// import navto from "@/util/pathRouter/uniRouter.js"
import countdownTimer from '@/components/countDown/countdown-timer.vue';
import { orderCreate, activityActivityOrderCancel } from '@/common/api.js';
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	components: {
		MButton,
		countdownTimer
	},
	data() {
		return {
			timeData: {},
			getSystemTimestamp: null
		};
	},
	methods: {
		mounted() {
			var timestamp = Date.parse(new Date());
			this.getSystemTimestamp = timestamp;
		},
		onChange(e) {
			this.timeData = e;
		},
		finish(i) {
			this.$emit('isOvertimeSeckill', true);
			this.list[i].status = 2;
		},
		payDeail(orderNo) {
			uni.navigateTo({
				url: '/pages/mine/goPurchase/details?orderNo=' + orderNo,
				animationDuration: 0
			});
		},
		toPay(orderNo) {
			const token = uni.getStorageSync('token');
			
			uni.navigateTo({
				url: '/pages/pay?orderNo=' + orderNo + '&token=' + token + '&pathEntrance=1',
				animationDuration: 0
			});
			// navto({
			// 	url: '/pages/pay',
			// 	tag: 'open',
			// 	time: 0,
			// 	data: {
			// 		token,
			// 		orderNo,
			// 		pathEntrance: 1
			// 	}
			// });
		},
		orderCancel(orderNo) {
			this.$emit('orderCancel', orderNo);
		}
	}
};
</script>
<style scoped lang="scss">
	.cancel{
		line-height: 60rpx;
		font-size: 30rpx;
		width: 160rpx;
		height: 60rpx;
		border: 1rpx solid var(--c-2f3334-linecolor1);
		border-radius: 8rpx;
		color:var(--c-eddbb3-fontcolor3);
	}
	.immediatelyBuy {
		line-height: 60rpx;
		font-size: 30rpx;
		width: 160rpx;
		height: 60rpx;
		background-color: var(--c-7A9EFC-bgcportion7);
		border-radius: 12rpx;
		color:var(--c-eddbb3-fontcolor3)
	}
	.immediatelyBuyCancel{
		line-height: 60rpx;
		font-size: 30rpx;
		width: 160rpx;
		height: 60rpx;
		border: 1rpx solid var(--c-609DF8-fontcolor12);
		border-radius: 12rpx;
		color:var(--c-609DF8-fontcolor12)
	}
	.time-num{
		text{
			font-size: 24rpx;
			color: var(--c-eddbb3-fontcolor3);
			margin:0 2rpx;
		}
	}

	.timer text {
		margin: 0 10rpx;
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #4a4034;
		border-radius: 4px;
	}

	.btmImg {
		padding:  20rpx;
		border-bottom:1rpx solid var(--c-EBEBEB-linecolor3)
		// background-color: var(--c-3a3a3b-bgcportion3);
	}
	.time{
		font-size: 24rpx;
		line-height: 34rpx;
		color: var(--c-979998-fontcolor2);
		text{
			color:var(--c-609DF8-fontcolor12)
		}
	}
	.no{
		font-size: 22rpx;
		line-height: 30rpx;
		color: var(--c-979998-fontcolor2);
	}
	.text1{
		font-size: 24rpx;
		line-height: 34rpx;
		color: var(--c-bgcportiongradual-h1-1);

	}
	.text2{
		font-size: 24rpx;
		line-height: 34rpx;
		color: var(--c-609DF8-fontcolor12);
	}
	.text3{
		font-size: 24rpx;
		line-height: 34rpx;
		color: var(--c-f0474d-fontcolor9);
	}
	.text4{
		font-size: 24rpx;
		line-height: 34rpx;
		color: var(--c-979998-fontcolor2);
	}
	.name{
		font-size: 32rpx;
		color: var(--c-ffffff-fontcolor1);
		font-weight: 600;
	}
	.num{
		font-size: 24rpx;
		line-height: 34rpx;
		color: var(--c-979998-fontcolor2);
	}
	.price{
		font-size: 24rpx;
		line-height: 34rpx;
		color: var(--c-979998-fontcolor2);
	}
	.real{
		font-size: 30rpx;
		line-height: 42rpx;
		color: var(--c-979998-fontcolor2);

	}
</style>
