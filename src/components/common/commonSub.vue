<template>
	<view>
		<u-popup :show="subscriptionShow" @close="closeSubscription">
			<view class="popupBgc">
				<view class="mt-3 mr-4 text-right">
					<text class="iconfont chenggong1" @click="closeSubscription">&#xeaf2;</text>
				</view>
				<view class="popupBgc_info p-3 d-flex">
					<image :src="activityDetailObj.coverImgUrl" mode=""></image>
					<view class="ml-3 py-3">
						<view class="rg_text">{{ activityDetailObj.name }}</view>
						<view class="mt-5 font-weight font-32r">¥{{ activityDetailObj.priceYuan }}</view>
					</view>
				</view>
				<view class="p-4 d-flex j-sb">
					<view>
						<text class="rg_text">认购数量</text>
						<text>（每人限购{{ checkedMaxNum }}份）</text>
					</view>
					<view>
						<text class="iconfont jian" :class="{'active_num':car_num <= 1}"
							@tap="num_reduce()">&#xe6d4;</text>
						<text class="px-3 num">{{ car_num }}</text>
						<text class="iconfont jia" :class="{'active_num':car_num >= checkedMaxNum}"
							@tap="num_add()">&#xe6d5;</text>
					</view>
				</view>
				<view class="d-flex a-center j-center m-4">
					<MButton class="resellBtn" @click.native="commonBtn" :text="txgBtn"></MButton>
				</view>
			</view>
		</u-popup>

		<u-overlay :show="isPayCuccess" @click="isPayCuccess = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="text font-32r my-3">
						{{ hintText }}
					</view>
					<image :src="activityDetailObj.coverImgUrl" mode="" class="mt-3"></image>
					<view>
						<view class="text-light-title">
							<view class="mt-4">
								<text class="text font-lg my-2 mr-1">{{ activityDetailObj.name }}</text>
								<text class="text">× {{ car_num }}</text>
							</view>
						</view>
					</view>
					<MButton class="immediatelyBuy" text="知道啦" @click.native="buyCondition">
					</MButton>
				</view>
			</view>
		</u-overlay>

	</view>
</template>

<script>
	import {
		activitySub,
		subResult
	} from '@/common/api.js'
	export default {
		props: {
			buyShow: {
				type: Boolean,
				default: false
			},
			checkedMaxNum: {
				type: Number,
				default: 0
			},
			activityDetailObj: {
				type: Object,
				default: () => {}
			},
			alias: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				subscriptionShow: false,
				isPayCuccess: false,
				car_num: 1,
				txgBtn: '提交认购',
				timer: null,
				status: '',
				hintText: '恭喜您中签了',
			}
		},
		watch: {
			buyShow(newVal) {
				this.subscriptionShow = newVal;
			},
			activityDetailObj(newVal) {
				this.txgBtn = `提交认购(￥${(newVal.priceYuan)})`;
			},
		},
		methods: {
			num_add() {
				if (this.car_num >= this.checkedMaxNum) {
					this.$u.toast('不可再增加了哦~')
					return
				}
				this.car_num = this.car_num + 1;
				this.txgBtn = `提交认购(￥${(this.car_num*this.activityDetailObj.priceYuan).toFixed(2)})`
			},
			num_reduce() {
				if (this.car_num <= 1) {
					this.$u.toast('不可再减少了哦~')
					return
				}
				this.car_num = this.car_num - 1;
				this.txgBtn = `提交认购(￥${(this.car_num*this.activityDetailObj.priceYuan).toFixed(2)})`
			},
			commonBtn() {
				this.subscriptionShow = false;
				let params = {
					type: 'crystal',
					alias: this.alias,
					subNum: this.car_num
				};
				activitySub(params).then(res => {
					this.getPayResult(res);
				})
				this.$emit('buyEnd');
			},
			getPayResult(val) {
				uni.showLoading({
					title: '抢购中...'
				});
				this.timer = setInterval(() => {
					subResult(val).then(res => {
						console.log(res);
						this.status = res.step;
						if (this.status == 'fail') {
							//隐藏加载框
							uni.hideLoading();
							this.$u.toast(res.reason);
							clearInterval(this.timer);
						} else if (this.status == 'success') {
							uni.hideLoading();
							this.isPayCuccess = true;
							this.hintText = '恭喜您，成功完成藏品认购报名';
							clearInterval(this.timer);
						}

					})
				}, 3000)
			},
			closeSubscription() {
				this.$emit('subscriptionClick')
			},
			buyCondition() {
				this.isPayCuccess = false;
				this.$emit('buyEnd');
			}
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		}
	}
</script>

<style lang="scss" scoped>
	.popupBgc {
		background-color: var(--c-232728-bgc);
	
		.popupBgc_info {
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 30rpx;
			}
		}

		.rg_text {
			color: var(--c-ffffff-fontcolor1);
			font-size: 34rpx;
		}

		.resellBtn {
			width: 100%;
			background: linear-gradient(90deg, var(--c-7A9EFC-bgcportiongradual1) 0%, var(--c-5A9AF8-bgcportiongradual2) 100%);
			color: var(--c-ffffff-fontcolor11);
		}
	}

	.iconfont {
		font-size: 45rpx;
		color: var(--c-000000-font);
	}

	.num {
		color: var(--c-ffffff-fontcolor1);
		font-size: 38rpx;
	}

	.active_num {
		color: var(--c-979998-fontcolor2);
	}

	.chenggong1 {
		padding: 15rpx;
		border-radius: 50%;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 280px;
		height: 320px;
		background-color: var(--c-232728-bgc);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 30rpx;
		}
		.text{
			color: var(--c-ffffff-fontcolor1);
		}
	}

	.immediatelyBuy {
		width: 70%;
		font-size: 28rpx;
		margin-top: 20rpx;
		height: 70rpx;
		line-height: 70rpx;
		background: linear-gradient(90deg, var(--c-7A9EFC-bgcportiongradual1) 0%, var(--c-5A9AF8-bgcportiongradual2) 100%);
		color: var(--c-ffffff-fontcolor11);
	}
</style>
