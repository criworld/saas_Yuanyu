<template>
	<view class="pay">
		<!-- web-view 内嵌支付页面 -->
		<web-view :src="webUrl" @message="getH5Message"></web-view>
		<u-modal :show="payShow" :title="title" confirmText="已支付" cancelText="未支付" :content='content_tips' :showConfirmButton="true"
			:showCancelButton="true" @confirm="confirm" @cancel="cancel"></u-modal>
	</view>
</template>

<script>
	import {
		isSignLink
	} from '@/common/config.js'
	export default {
		data() {
			return {
				webUrl: '',
				pathEntrance: '',
				getOrderNo: '',
				newData: {},
				payShow: false,
				title: '提示',
				content_tips: '您是否已经完成支付？'
			}
		},
		onLoad(options) {
			const backUrl = uni.getSystemInfoSync().uniPlatform;
			this.pathEntrance = options.pathEntrance; //从那个页面来的
			this.getOrderNo = options.getOrderNo;
			let data = {
				app_order_no: options.orderNo, //应用订单号
				token: `Bearer ${options.token}`,
				backUrl
			}
			this.newData = options;
			this.webUrl = `${isSignLink}/#/pages/recharge/payment?orderInfo=` + JSON.stringify(data)
			// this.webUrl = 'http://172.16.10.5:8083/#/pages/recharge/payment?orderInfo=' + JSON.stringify(data)
		},
		mounted() {
			window.addEventListener("message", this.getH5Message);
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				this.payShow = true
				return true;
			}
		},
		methods: {
			confirm() {
				this.back()
			},
			cancel() {
				this.payShow = false
			},
			back() {
				if (this.pathEntrance == 1) {
					uni.redirectTo({
						url: '/pages/mine/goPurchase/index'
					});
				} else if (this.pathEntrance == 2) {
					uni.redirectTo({
						url: "/pages/mine/goPurchase/payDeails?pay_status=" + 0 + '&orderNo=' + this.getOrderNo
					});
				} else if (this.pathEntrance == 3) {
					uni.redirectTo({
						url: "/pages/homePages/seckillTime?alias=" + this.newData.alias
					});
				}
			},
			getH5Message(e) {
				// console.log(e);
			},
		}
	}
</script>

<style>
	page {
		background-color: #ffffff !important;
	}

	/deep/.u-modal {
		text-align: center;
		background-color: #fff;
		border: 0rpx;
	}

	/deep/.u-modal__content__text {
		color: black;
	}

	/deep/.u-modal__button-group__wrapper--hover {
		background-color: aliceblue;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
