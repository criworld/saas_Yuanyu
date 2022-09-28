<template>
	<view>
		<view class="mb-3 mx-2 btmImg" v-for="(item,index) in list" :key="index">
			<view class="" @click="payDeail(item.orderNo)">
				<view class="d-flex j-sb" style="margin-bottom: 10rpx;">
					<view class="text-light-content no">
						订单号：{{ item.orderNo }}
					</view>
					<view class="text-gold">
						<text v-if="item.status == 0" class="text1">待支付</text>
						<text v-if="item.status == 1" class="text2">已支付</text>
						<text v-if="item.status == 2" class="text3">已超时</text>
					</view>
				</view>
				
				<view class="d-flex j-sb" style="margin-top:30rpx">
					<view class="d-flex">
						<image style="width: 130rpx;height: 130rpx;margin-right: 30rpx;border-radius: 10rpx;"
							:src="item.icon" mode=""></image>
						<view class="font-md name">
							{{ item.name }}
						</view>
					</view>
					<view style="text-align: right;">
						<view class="text-light-content ">
							×{{ item.buyNum }}份
						</view>
						<view class="mt-2">
							价格：￥{{ item.unitPriceYuan }}
						</view>
						<view class="real mt-1">
							实际支付：￥{{ item.sumPriceYuan }}
						</view>
					</view>
				</view>
			</view>
			<view class="d-flex j-sb a-center my-3">
				<view class="d-flex a-center" v-if="item.status == 0">
					<view class=" font-24r mr-2">
						支付剩余:
					</view>
					<template>
						<countdown-timer autoStart :time="item.lastSec*1000" @finish="finish(index)">
							<template v-slot="{day, hour, minute, second}">
								<view class="time-num">
									<text>{{day}}</text><text>:</text><text>{{hour}}</text> <text>:</text> <text>{{minute}}</text><text>:</text><text>{{second}}</text>
								</view>
							</template>
						</countdown-timer>
					</template>
				</view>
				<view v-if="item.status == 0" class="d-flex flex-row a-center">
					<view class="immediatelyBuy text-center" @click="toPay(item.orderNo)">
						立即支付
					</view>
					<!-- <view style="margin-left:20rpx;" class="immediatelyBuyCancel text-center" @click="toPay(item.orderNo)">
						取消支付
					</view> -->
				</view>
			</view>
			<!-- <view class="d-flex a-center" v-if="item.status == 0">
				<view class="text-light-content font-32r mr-2">
					支付剩余：
				</view>
				<template>
					<countdown-timer autoStart :time="item.lastSec*1000" @finish="finish(index)">
						<template v-slot="{day, hour, minute, second}">
							<view class="">
								<text>{{day}}</text>:<text>{{hour}}</text>:<text>{{minute}}</text>:<text>{{second}}</text>
							</view>
						</template>
					</countdown-timer>
				</template>
			</view> -->
		</view>
	</view>
</template>

<script>
	import MButton from "@/components/widget/MButton";
	// import navto from "@/util/pathRouter/uniRouter.js"
	import countdownTimer from '@/components/countDown/countdown-timer.vue'
	import {
		orderCreate
	} from "@/common/api.js"
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
				getSystemTimestamp: null,
			}
		},
		methods: {
			mounted() {
				var timestamp = Date.parse(new Date());
				this.getSystemTimestamp = timestamp;
			},
			onChange(e) {
				this.timeData = e
			},
			finish(i) {
				this.$emit('isOvertime', true)
				this.list[i].status = 2;
			},
			payDeail(orderNo) {
				uni.navigateTo({
					url: '/pages/mine/goPurchase/payDeails?orderNo=' + orderNo,
					animationDuration: 0
				});
			},
			toPay(orderNo) {
				const token = uni.getStorageSync('token');
				this.$store.commit('setPayPath', 1)
				let params = {
					orderNo,
					successRedirectUrl: "successRedirectUrl",
					exitRedirectUrl: "exitRedirectUrl"
				};
				orderCreate(params).then(res => {
					uni.navigateTo({
						url: '/pages/pay?orderNo=' + res + '&token=' + token + '&pathEntrance=1',
						animationDuration: 0
					});
					// navto({
					// 	url: "/pages/pay",
					// 	tag: "open",
					// 	time: 0,
					// 	data: {
					// 		token,
					// 		orderNo: res,
					// 		pathEntrance: 1
					// 	}
					// })
				})
			}
		}
	}
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
			color: var(--c-609DF8-fontcolor12);
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