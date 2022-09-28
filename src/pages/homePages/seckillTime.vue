<template>
	<view class="detailBuy" :style="[JSON.parse(themeJson)]">
		<image class="img1" :src="activityDetailObj.coverImgUrl" mode=""></image>
		<view :class="scrollTop >=250?'scrollBgc':'detailBuy_bar'">
			<text class="iconfont icon 31fanhui1" @tap="detailBack">&#xe600;</text>
			<text class="iconfont icon JC_054" @tap="detailShare">&#xe660;</text>
		</view>
		<view class="detailBuy_info">
			<image class="img2" src="../../static/common/bottomImg1.png" mode=""></image>
			<view class="detailBuy_info_name">
				<view class="detailBuy_info_name_0">{{ activityDetailObj.name }}</view>
				<view class="d-flex j-center mt-2">
					<view class="d-flex j-center">
						<text class="iconfont shandian1">&#xe663;</text>
						<view class="new_buy_way">
							<text>秒杀</text>
							{{ activityDetailObj.sumNum }}份
						</view>
					</view>
					<view class="detailBuy_info_name_1 px-2 ml-3">
						总发行{{ activityDetailObj.assetTotal }}份
					</view>
				</view>
			</view>
		</view>
		<view style="height:100rpx"></view>
		<view class="liness"></view>
		<view class="detailBuy_bgc" style="margin-top: 60rpx;">
			<view class="distance_time text-center">
				距离开始
			</view>
			<countdown-timer autoStart :time="activityDetailObj.lastSec*1000" @finish="seckillTime">
				<template v-slot="{day, hour, minute, second}">
					<view class="distance_time_p">
						<text>{{day == -1 ? 0:day}}</text><text>{{hour == -1 ? 0:hour}}</text><text>{{minute == -1 ? 0:minute}}</text><text>{{second == -1 ? 0:second}}</text>
					</view>
					<view class="distance_time_b">
						<text>DAYS</text>
						<text>HOURS</text>
						<text>MIN</text>
						<text>SEC</text>
					</view>
				</template>
			</countdown-timer>
		</view>
		<view class="detailBuy_bgc p-3">
			<view class="activityName d-flex a-center">
				<text>基本信息</text>
			</view>
			<view class="activityName_bgc"></view>
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					所属分类
				</view>
				<view class="detailBuy_right font-28r">
					{{ activityDetailObj.assetCateString }}
				</view>
			</view>
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					合约地址
				</view>
				<view class="detailBuy_right_cor font-28r">
					{{ activityDetailObj.chainAddr || '-----'  }}
				</view>
			</view>
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					技术支持
				</view>
				<view class="detailBuy_right_cor font-28r">
					{{ activityDetailObj.chainName || '-----'  }}
				</view>
			</view>
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					创建时间
				</view>
				<view class="detailBuy_right font-28r">
					{{ activityDetailObj.assetCreateAt }}
				</view>
			</view>
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					鉴赏期
				</view>
				<view class="detailBuy_right font-28r">
					{{ activityDetailObj.nfrDay || '-----'  }}
					<text v-if="activityDetailObj.nfrDay != 0">天</text>
				</view>
			</view>
		</view>
		<view class="detailBuy_bgc p-3 btmImg" v-if="activityDetailObj.assetDetailImg != ''">
			<view class="activityName d-flex a-center">
				<text>作品故事</text>
			</view>
			<view class="activityName_bgc"></view>
			<image style="width: 100%;text-align: center;margin-top: 20rpx;border-radius: 10rpx;"
				:src="activityDetailObj.assetDetailImg" mode="widthFix"></image>
		</view>
		<view style="height:160rpx"></view>


		<!-- 购买按钮 -->
		<view class="fixedBtn fixedBtnBgc px-7">
			<view class="resellPrice">¥ {{ activityDetailObj.priceYuan }}</view>
			<MButton class="resellBtn" @click.native="commonBtn" :text="txgBtn"></MButton>
		</view>
		<!-- 分享 -->
		<u-popup :show="shareShow" @close="shareShow = false">
			<view style="height: 440rpx;padding: 30rpx;" class="shareBgc">
				<view class="mr-4 text-right">
					<text class="iconfont chenggong1" @click="shareShow = false">&#xeaf2;</text>
				</view>
				<view class="d-flex j-center share_title">立即分享给好友</view>
				<view class="d-flex m-5">
					<view class="flex-1 pt-3" @click="chartWay(item.text,item.scene)" style="text-align: center;"
						v-for="(item,index) in chartImg" :key="index">
						<text v-if="index == 0" class="iconfont shareIcon1 fuzhi">&#xe8b0;</text>
						<text v-if="index == 1" class="iconfont shareIcon2 haibao">&#xe613;</text>
						<text v-if="index == 2" class="iconfont shareIcon3 pengyou">&#xe61a;</text>
						<text v-if="index == 3" class="iconfont shareIcon4 pengyouquan">&#xe633;</text>
						<view class="font-sm pt-3 share_title">{{ item.chartName }}</view>
					</view>
				</view>
				<MButton class="closeBtn" @click.native="close" text="取消"></MButton>
			</view>
		</u-popup>

		<!-- 分享海报 -->
		<u-overlay :show="show">
			<view style="display: flex;justify-content: center;align-items: center;height: 100%;">
				<share :activityDetailObj="activityDetailObj" :codeUrl="codeUrl" @closeCanvas="closeCanvas"></share>
			</view>
		</u-overlay>

		<!-- 秒杀 -->
		<seckillSub :buyShow="buyShow" @buyEnd="buyEnd" :alias="alias" @subscriptionClick="subscriptionClick"
			:activityDetailObj="activityDetailObj"></seckillSub>
	</view>
</template>

<script>
	import countdownTimer from '@/components/countDown/countdown-timer.vue';
	import config from "@/common/config.js"
	import {
		seckillDetail
	} from '@/common/api'
	export default {
		components: {
			countdownTimer
		},
		data() {
			return {
				txgBtn: "立即秒杀",
				scrollTop: 0,
				shareShow: false,
				show: false,
				activityDetailObj: {},
				alias: "",
				codeUrl: "",
				buyShow: false, //购买弹窗
				chartImg: [{
						text: "copyLink",
						chartName: "复制链接",
						scene: null
					}, {
						text: "poster",
						chartName: "分享海报",
						scene: null
					},
					// #ifdef APP
					{
						text: "WeChat",
						chartName: "发送给朋友",
						scene: "WXSceneSession"
					}, {
						text: "chartPyq",
						chartName: "分享至朋友圈",
						scene: "WXSceneTimeline"
					},
					// #endif  
				],
				newData: {}
			}
		},
		onLoad(options) {
			this.alias = options.alias;
			this.newData = options;
		},
		onShow() {
			this.getNewData();
		},
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = e.scrollTop;
		},
		methods: {
			getNewData() {
				this.getSeckillDetail(this.newData.alias);
			},
			//获取活动信息
			getSeckillDetail(val) {
				let isLogin = this.$store.state.userToken == "" ? "open" : "api";
				seckillDetail(val, isLogin).then(res => {
					this.activityDetailObj = res;
					this.verifySubscription(true);
				})
			},
			//自定义返回
			detailBack() {
				if (this.newData.backPath == 'y') {
					uni.navigateTo({
						url: "/pages/homePages/activityDetail?id=" + this.newData.opId
					})
				} else {
					uni.switchTab({
						url: '/pages/homePages/index'
					});
				}
			},
			//分享
			detailShare() {
				if (this.$store.state.userToken == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return
				}
				this.shareShow = true;
			},
			//取消分享
			close() {
				this.shareShow = false;
			},
			//选择分享方式
			chartWay(val, scene) {
				if (val == 'copyLink') {
					let that = this;
					let copyLink = `${config.copyLink}/pages/homePages/seckillTime?alias=` + that.newData.alias
					uni.setClipboardData({
						data: copyLink,
						success: function() {
							that.shareShow = false;
						}
					})
					return
				}
				if (val == 'poster') {
					this.codeUrl = `${config.copyLink}/pages/homePages/seckillTime?alias=` + this.newData.alias
					console.log(this.codeUrl);
					this.shareShow = false;
					this.show = true;
					return
				}
				console.log(scene);
			},
			//秒杀倒计时结束
			seckillTime() {
				this.getNewData();
			},
			//购买弹窗
			commonBtn() {
				if (this.txgBtn == '去登录') {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				} else {
					this.verifySubscription(false);
				}
			},
			verifySubscription(val) {
				//0.未认购；1.已认购普通购；2.已认购优先购
				if (this.$store.state.userToken == '') {
					this.txgBtn = '去登录';
					this.disable = false;
					return
				}
				if (this.activityDetailObj.status == 0) {
					if (val) this.txgBtn = '未开始';
					this.$u.toast("活动暂未开始，等一会儿再来吧～");
					return
				}
				if (this.activityDetailObj.limitBuy > 0 && this.activityDetailObj.status == 1) {
					if (val) {
						this.txgBtn = '立即秒杀';
						this.disable = false;
					} else {
						//是否认证过
						// getUserInfo().then(res => {
						// 	if (res.realAuth) return this.subscription = true
						this.buyShow = true;
						// })
					}
					return
				}
				if (this.activityDetailObj.status == 2) {
					if (val) {
						this.txgBtn = '已结束';
						this.disable = false;
					} else {
						this.$u.toast("活动已结束");
					}
					return
				}
				if (this.activityDetailObj.limitBuy == 0) {
					if (val) {
						this.disable = true;
						this.txgBtn = '已认购';
					} else {
						this.$u.toast("已认购过");
						// this.subscription = true
					}
				}
			},
			buyEnd() {
				this.getNewData();
				this.buyShow = false;
			},
			subscriptionClick() {
				this.buyShow = false;
			},
			//关闭海报
			closeCanvas() {
				this.show = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin icon {
		font-size: 50rpx;
		padding: 25rpx;
		border-radius: 50%;
	}

	.detailBuy {
		min-height: 100vh;
		background-color: var(--c-232728-bgc);

		.img1 {
			width: 100%;
			height: 650rpx;
			position: relative;
		}
	}

	.detailBuy_bar {
		position: absolute;
		position: fixed;
		top: var(--window-top);
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		width: 750rpx;
		padding-top: var(--status-bar-height);
		z-index: 999;
	}

	.scrollBgc {
		position: absolute;
		position: fixed;
		top: var(--window-top);
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		width: 750rpx;
		padding-top: var(--status-bar-height);
		z-index: 999;
		background-color: var(--c-202122-navigationBar);
	}

	.detailBuy_info {
		.img2 {
			position: absolute;
			left: 35rpx;
			top: 580rpx;
			width: 680rpx;
			height: 180rpx;
			border-radius: 20rpx;
			background-color: var(--c-232728-bgc);
		}

		.detailBuy_info_name {
			position: absolute;
			left: 40rpx;
			top: 600rpx;
			width: 680rpx;
			text-align: center;

			.detailBuy_info_name_0 {
				color: var(--c-ffffff-fontcolor1);
				font-size: 36rpx;
			}

			.shandian1 {
				margin-right: 0rpx;
				padding-top: 6rpx;
				border-radius: 5rpx 0 0 5rpx;
				color: var(--c-bgcportiongradual-h1-1);
			}

			.new_buy_way {
				width: max-content;
				font-size: 24rpx;
				padding: 5rpx 15rpx;
				border-radius: 0 5rpx 5rpx 0;
				color: var(--c-ffffff-fontcolor1);
			}

			.detailBuy_info_name_1 {
				background-color: var(--c-F0F0F0-bgcportion8);
				color: var(--c-ffffff-fontcolor1);
				border-radius: 10rpx;
			}
		}
	}

	.distance_time {
		color: var(--c-ffffff-fontcolor1);
		font-size: 30rpx;
		font-weight: 100;
	}

	.distance_time_p {
		padding: 20rpx 0;
		text-align: center;

		text {
			width: 140rpx;
			text-align: center;
			display: inline-block;
			color: var(--c-ffffff-fontcolor1);
			font-size: 55rpx;
			font-weight: bold;
		}
	}

	.distance_time_b {
		text-align: center;

		text {
			color: var(--c-ffffff-fontcolor1);
			width: 140rpx;
			text-align: center;
			font-weight: 100;
			display: inline-block;
		}
	}

	.icon {
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 50%;
		background-color: var(--c-202122-navigationBar);
		color: var(--c-ffffff-fontcolor1);
		font-size: 40rpx;
	}

	.detailBuy_bgc {
		margin: 30rpx;
		border-radius: 10rpx;
		background-color: var(--c-232728-bgc);
		position: relative;

		.activityName {
			image {
				width: 180rpx;
				height: 20rpx;
			}

			text {
				font-size: 35rpx;
				color: var(--c-ffffff-fontcolor1);
			}
		}

		.activityName_bgc {
			position: absolute;
			top: 61rpx;
			width: 130rpx;
			height: 16rpx;
			opacity: 0.4;
			border-radius: 30rpx;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-l1-2) 0%, var(--c-eddbb3-fontcolor3) 100%);
		}

		.detailBuy_left {
			font-size: 28rpx;
			color: var(--c-979998-fontcolor2);
		}

		.detailBuy_right {
			color: var(--c-ffffff-fontcolor1);
		}

		.detailBuy_right_cor {
			color: var(--c-b1c7cb-fontcolor5);
		}

		.border_line {
			border: 1px var(--c-eddbb3-bordercolor) solid;
			border-radius: 10rpx;
		}

		.detailBuy_zq {
			box-shadow: 0px 0px 20rpx 0px rgba(57, 58, 76, 0.3);
			padding: 40rpx;
			border-radius: 20rpx;
		}
	}

	.detailBuy_line {
		width: 100%;
		height: 2rpx;
		background-color: var(--c-2f3334-linecolor1);
	}

	.fixedBtnBgc {
		background-color: var(--c-232728-bgc);
		box-sizing: border-box;

		.resellPrice {
			color: var(--c-ffffff-fontcolor1);
			font-size: 45rpx;
			font-weight: bold;
		}
	}

	.resellBtn {
		width: 50%;
		font-size: 32rpx;
		background: linear-gradient(90deg, var(--c-7A9EFC-bgcportiongradual1) 0%, var(--c-5A9AF8-bgcportiongradual2) 100%);
		color: var(--c-ffffff-fontcolor11);
	}

	.share_title {
		color: var(--c-ffffff-fontcolor1);
	}

	.shareBgc {
		background-color: var(--c-232728-bgc);

		.line {
			width: 750rpx;
			height: 2rpx;
			background-color: var(--c-E0E0E0-linecolor2);
		}
	}

	.closeBtn {
		width: 100%;
		background: linear-gradient(90deg, var(--c-7A9EFC-bgcportiongradual1) 0%, var(--c-5A9AF8-bgcportiongradual2) 100%);
		color: var(--c-ffffff-fontcolor11);
	}

	.shareIcon1 {
		@include icon;
		color: var(--c-shareupColor1);
		background-color: var(--c-shareupBgColor1);
	}

	.shareIcon2 {
		@include icon;
		color: var(--c-shareupColor2);
		background-color: var(--c-shareupBgColor2);
	}

	.shareIcon3 {
		@include icon;
		color: var(--c-shareupColor3);
		background-color: var(--c-shareupBgColor3);
	}

	.shareIcon4 {
		@include icon;
		color: var(--c-shareupColor4);
		background-color: var(--c-shareupBgColor4);
	}

	.btmImg {
		background: url(@/static/common/bottomImg1.png) no-repeat;
		background-size: 100% auto;
		background-position: 0 100%;
	}

	.isSign {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;

		.isSign_content {
			background: url(@/static/common/bottomImg3.png) no-repeat;
			background-size: 100% 100%;
			background-color: var(--c-232728-bgc);
			width: 500rpx;
			height: 620rpx;
			border-radius: 20rpx;
			text-align: center;

			.isSign_top {
				image {
					width: 120rpx;
					height: 20rpx;
				}

				.noSign {
					font-size: 32upx;
					color: var(--c-979998-fontcolor2);
				}

				.isSign {
					font-size: 32upx;
					color: var(--c-eddbb3-fontcolor3);
				}
			}

			.isSignText {
				color: var(--c-ffffff-fontcolor1);
			}

			.isSignTextNum {
				color: var(--c-eddbb3-fontcolor3);
			}

			.noSigns {
				width: 240rpx;
				height: 240rpx;
			}

			.isSigns {
				width: 300rpx;
				height: 300rpx;
				border-radius: 15rpx;
			}

			.isSign_btn {
				width: 80%;
				margin: auto;
			}

			.isSign_btns {
				width: 80%;
				margin: auto;
				background-color: var(--c-979998-bgcportion5);
				color: var(--c-ffffff-fontcolor1);
				font-weight: 100;
			}
		}
	}

	.chenggong1 {
		color: var(--c-000000-font);
		padding: 15rpx;
		border-radius: 50%;
		font-size: 42rpx;
	}
	.liness {
		width: 700rpx;
		height: 2rpx;
		background-color: var(--c-EBEBEB-linecolor3);
		margin: auto;
	}
</style>
