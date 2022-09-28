<template>
	<view class="detailBuy" :style="[JSON.parse(themeJson)]">
		<image class="img1" :src="detailsInfo.assetPic" mode=""></image>
		<view :class="scrollTop >=250?'scrollBgc':'detailBuy_bar'">
			<text class="iconfont icon 31fanhui1" @tap="detailBack">&#xe600;</text>
			<text class="iconfont icon JC_054" @tap="detailShare">&#xe660;</text>
		</view>
		<view class="detailBuy_info">
			<image class="img2" src="../../static/common/bottomImg1.png" mode=""></image>
			<view class="detailBuy_info_name">
				<view class="detailBuy_info_name_0">{{ detailsInfo.assetName }}</view>
				<view class="ms">
					<view class="miaoshu">资产描述:</view>
					<view class="miaoshu_text">{{detailsInfo.assetIntro}}</view>
				</view>
			</view>
		</view>
		<view style="height:120rpx"></view>
		<view class="detailBuy_bgc p-3">
			<view class="activityName d-flex a-center">
				<text>基本信息</text>
			</view>
			<view class="activityName_bgc"></view>
			<!-- <view class="activityName d-flex a-center j-center">
				<image src="../../static/common/name_left.png" mode=""></image>
				<text>基本信息</text>
				<image src="../../static/common/name_right.png" mode=""></image>
			</view> -->
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					所属分类
				</view>
				<view class="detailBuy_right font-28r">
					{{ detailsInfo.assetCateString }}
				</view>
			</view>
			<!-- <view class="detailBuy_line"></view> -->
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					编号
				</view>
				<view class="detailBuy_right_cor font-28r">
					#{{detailsInfo.assetNo}}/{{detailsInfo.assetSum}}
				</view>
			</view>
			<!-- <view class="detailBuy_line"></view> -->
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					TokenID
				</view>
				<view class="detailBuy_right_cor font-28r">
					{{detailsInfo.tokenId}}
				</view>
			</view>
			<!-- <view class="detailBuy_line"></view> -->
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					合约地址
				</view>
				<view class="detailBuy_right_cor font-28r">
					------
				</view>
			</view>
			<!-- <view class="detailBuy_line"></view> -->
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					技术支持
				</view>
				<view class="detailBuy_right_cor font-28r">
					------
				</view>
			</view>
			<!-- <view class="detailBuy_line"></view> -->
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					鉴赏期
				</view>
				<view class="detailBuy_right_cor font-28r">
					------
				</view>
			</view>


		</view>
		<view style="height:160rpx"></view>
		<!-- 分享 -->
		<u-popup :show="shareShow" @close="shareShow = false">
			<view style="height: 490rpx;padding-top: 30rpx;" class="shareBgc">
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
				<view class="line"></view>
				<!-- <view class="d-flex j-center a-center mt-2" @click="close">
					取消
				</view> -->
				<MButton class="closeBtn" @click.native="close" text="取消"></MButton>
			</view>
		</u-popup>

		<!-- 分享海报 -->
		<u-overlay :show="show" opacity="0.6">
			<view style="display: flex;justify-content: center;align-items: center;height: 100%;">
				<share @closeCanvas="closeCanvas" :codeUrl="codeUrl" :activityDetailObj="activityDetailObj"></share>
			</view>
		</u-overlay>

		<!-- 是否中签弹窗 -->
		<!-- <u-overlay :show="isSignShow">
			<view class="isSign">
				<view class="isSign_content">
					<view class="isSign_top d-flex a-center j-center py-3">
						<image src="../../static/common/name_left.png" mode=""></image>
						<text v-if="awardResultData.award == 2" class="px-1 noSign">很遗憾，未中签</text>
						<text v-if="awardResultData.award == 1" class="px-1 isSign">恭喜您，中签啦</text>
						<image src="../../static/common/name_right.png" mode=""></image>
					</view>
					<image v-if="awardResultData.award == 2" class="noSigns" src="../../static/common/noSign.png">
					</image>
					<image v-if="awardResultData.award == 1" class="isSigns" src="../../static/text2.png"> </image>
					<view class="py-4" v-if="awardResultData.award == 2">
						别气馁，下次再试试～
					</view>
					<view class="isSignText d-flex j-center py-1" v-if="awardResultData.award == 1">
						{{ awardResultData.name }}
					</view>
					<view class="isSignTextNum d-flex j-center pb-1" v-if="awardResultData.award == 1">
						×{{ awardResultData.awardNum }}
					</view>
					<MButton :class="awardResultData.award == 1 ? 'isSign_btn':'isSign_btns'" text="知道了"
						@click.native="isSignClose"></MButton>
				</view>
			</view>
		</u-overlay> -->

	</view>
</template>

<script>
	// import countdownTimer from '@/components/countDown/countdown-timer.vue';
	import config from "@/common/config.js"
	import {
		sellDetail
	} from '@/common/api'
	export default {
		// components: {
		// 	countdownTimer
		// },
		data() {
			return {
				stepsState: [],
				scrollTop: 0,
				setPercent: 0, //中奖率
				shareShow: false,
				show: false,
				disable: true,
				activityDetailObj: {},
				awardResultData: {},
				publicity: {},
				newData: {}, //所有参数
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


				// appId: '',
				// tokenId: '',
				detailsInfo: {}, //详情信息
				activityDetailObj: {}, //分享内容
				newData: {},
				codeUrl: ''
			}
		},
		onLoad(options) {
			this.newData = options;
			// this.appId = options.appId
			// this.tokenId = options.tokenId
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
				this.getSellDetail(this.newData.appId, this.newData.tokenId);
			},
			getSellDetail(appId, tokenId) {
				sellDetail(appId, tokenId).then((res) => {
					this.detailsInfo = res;
					this.activityDetailObj = {
						name: res.assetName,
						coverImgUrl: res.assetPic,
						assetNo: res.assetNo,
						assetSum: res.assetSum,
						type: 'card'
					};
				})
			},

			//自定义返回
			detailBack() {
				uni.switchTab({
					url: '/pages/cardBag/index'
				});
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
				let that = this;
				if (val == 'copyLink') {
					let copyLink = `${config.copyLink}/pages/cardBag/details?appId=` + that.newData.appId +
						'&tokenId=' + that.newData.tokenId
					uni.setClipboardData({
						data: copyLink, // e是需要设置的内容
						success: function() {
							that.shareShow = false;
						}
					})
					return
				}
				if (val == 'poster') {
					that.codeUrl = `${config.copyLink}/pages/cardBag/details?appId=` + that.newData.appId +
						'&tokenId=' + that.newData.tokenId
					that.shareShow = false;
					that.show = true;
					return
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

	.ms {
		// margin: 0 20rpx;

		.miaoshu {
			margin-top: 20rpx;
			font-size: 22rpx;
			line-height: 32rpx;
			color: var(--c-232728-fontcolor4);
		}

		.miaoshu_text {
			margin-top: 10rpx;
			font-size: 22rpx;
			line-height: 32rpx;
			color: var(--c-232728-fontcolor4);
			text-align: left;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			//显示4行
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}

	.detailBuy_info {
		.img2 {
			position: absolute;
			left: 0;
			top: 580rpx;
			width: 750rpx;
			height: 180rpx;
			border-radius: 44rpx;
			background-color: var(--c-232728-bgc);
		}

		.detailBuy_info_name {
			position: absolute;
			left: 40rpx;
			top: 600rpx;
			width: 680rpx;
			// text-align: center;

			.detailBuy_info_name_0 {
				color: var(--c-ffffff-fontcolor1);
				font-size: 36rpx;
			}

			.shandian1 {
				margin-right: 0rpx;
				background-color: var(--c-3a3a3b-fontcolor8);
				padding-top: 6rpx;
				border-radius: 5rpx 0 0 5rpx;
				color: var(--c-eddbb3-font);
			}

			.new_buy_way {
				width: max-content;
				font-size: 24rpx;
				padding: 5rpx 15rpx;
				border-radius: 0 5rpx 5rpx 0;
				background-color: var(--c-eddbb3-btc);
				color: var(--c-232728-fontcolor4);
			}

			.detailBuy_info_name_1 {
				border: 1px var(--c-eddbb3-bordercolor) solid;
				color: var(--c-eddbb3-fontcolor3);
				border-radius: 10rpx;
			}
		}
	}

	.distance_time {
		color: var(--c-eddbb3-fontcolor3);
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
			color: var(--c-eddbb3-fontcolor3);
			font-size: 55rpx;
			font-weight: bold;
		}
	}

	.distance_time_b {
		text-align: center;

		text {
			color: var(--c-eddbb3-fontcolor3);
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
		position: relative;
		border-radius: 10rpx;

		// border-radius: 10rpx;
		// background-color: var(--c-171717-bgcportion4);
		.activityName_bgc {
			position: absolute;
			top: 61rpx;
			width: 130rpx;
			height: 16rpx;
			opacity: 0.4;
			border-radius: 30rpx;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-l1-2) 0%, var(--c-eddbb3-fontcolor3) 100%);
		}

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

		.detailBuy_left {
			font-size: 28rpx;
			color: var(--c-ffffff-fontcolor1);
		}

		.detailBuy_right {
			color: var(--c-979998-fontcolor2);
		}

		.detailBuy_right_cor {
			color: var(--c-979998-fontcolor2);
		}

		.border_line {
			border: 1px var(--c-eddbb3-bordercolor) solid;
			border-radius: 10rpx;
		}

		// .detailBuy_line {
		// 	width: 100%;
		// 	height: 2rpx;
		// 	background-color: var(--c-EBEBEB-linecolor3);
		// }

		.detailBuy_zq {
			border: 15px var(--c-3a3a3b-bgcportion3) solid;
			border-radius: 20rpx;
			background-color: var(--c-3a3a3b-bgcportion3);
		}
	}

	.fixedBtnBgc {
		background-color: var(--c-171717-bgcportion4);
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
		// background: url(@/static/common/bottomImg1.png) no-repeat;
		// background-size: 100% auto;
		// background-position: 0 100%;
		// background-color: var(--c-171717-bgcportion4);
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

	.closeBtn {
		margin: 0 auto;
		margin-top: 30rpx;
		width: 80%;
		background: linear-gradient(90deg, var(--c-7A9EFC-bgcportiongradual1) 0%, var(--c-5A9AF8-bgcportiongradual2) 100%);
		color: var(--c-ffffff-fontcolor11);
	}
</style>
