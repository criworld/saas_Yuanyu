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
						<text class="iconfont shandian1">&#xe8c5;</text>
						<view class="new_buy_way">
							<text v-if="activityDetailObj.activityType == 1">优先购</text>
							<text v-if="activityDetailObj.activityType == 2">普通购</text>
							{{ activityDetailObj.sumNum }}份
						</view>
					</view>
					<view class="detailBuy_info_name_1 px-2 ml-3">
						限量发行<text class="font-weight ml-1">{{ activityDetailObj.assetTotal }}</text>份
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 150rpx;">
			<steps :stepsState="stepsState"></steps>
		</view>
		<view style="height:180rpx"></view>
		<view class="detailBuy_line"></view>
		<view class="detailBuy_bgc p-3">
			<view class="activityName d-flex a-center">
				<text>中签说明</text>
			</view>
			<view class="activityName_bgc"></view>
			<view class="my-3 d-flex j-sb">
				<view class="detailBuy_left">
					当前中签率
				</view>
				<view class="detailBuy_right font-28r">
					{{ setPercent }}%
				</view>
			</view>
			<view class="my-3 d-flex j-sb">
				<view class="detailBuy_left">
					已认购次数
				</view>
				<view class="detailBuy_right font-28r">
					{{ activityDetailObj.subSum }}次
				</view>
			</view>
			<view class="my-3 d-flex j-sb">
				<view class="detailBuy_left">
					已参与
				</view>
				<view class="detailBuy_right font-28r">
					{{ activityDetailObj.subSumPeople }}人
				</view>
			</view>
		</view>
		<view class="detailBuy_line"></view>
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
				<view class="detailBuy_right font-28r">
					{{ activityDetailObj.chainAddr || '-----' }}
				</view>
			</view>
			<view class="my-2 d-flex j-sb">
				<view class="detailBuy_left font-32r">
					技术支持
				</view>
				<view class="detailBuy_right font-28r">
					{{ activityDetailObj.chainName  || '-----' }}
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
					{{ activityDetailObj.nfrDay  || '-----'}}
					<text v-if="activityDetailObj.nfrDay != 0">天</text>
				</view>
			</view>
		</view>
		<view class="detailBuy_bgc p-3 btmImg" v-if="publicity.list != null">
			<view class="activityName d-flex a-center">
				<text>中签公示</text>
			</view>
			<view class="activityName_bgc"></view>
			<view class="detailBuy_left d-flex j-center pt-1 ">抽签结束时间</view>
			<view class="detailBuy_right d-flex j-center pt-1 ">{{ publicity.awardCompleteTime }}</view>
			<view class="d-flex flex-column my-3 detailBuy_zq p-1" style="overflow-y: auto;height: 540rpx;">
				<view class="d-flex j-sb mt-2 " v-for="(item,index) in publicity.list" :key="index">
					<view>
						{{ item.phone }}
					</view>
					<view class="detailBuy_right_cor">
						{{ item.awardNum }}份
					</view>
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

		<!-- 实名认证 -->
		<u-modal width="550rpx" :cancelColor="JSON.parse(themeJson).color"
			:confirmColor="JSON.parse(themeJson).bgcColor" :showCancelButton="showCancelButton" confirmText="实名认证"
			:show="authShow" @confirm="authConfirm" @cancel="authShow = false" content="未实名认证不可购买">
		</u-modal>

		<!-- 购买按钮 -->
		<view class="fixedBtn fixedBtnBgc px-5">
			<view class="resellPrice">¥ {{ activityDetailObj.priceYuan }}</view>
			<MButton class="resellBtn" :disable="disable" @click.native="commonBtn" :text="txgBtn"></MButton>
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
		<u-overlay :show="show" opacity="0.6">
			<view style="display: flex;justify-content: center;align-items: center;height: 100%;">
				<share @closeCanvas="closeCanvas" :codeUrl="codeUrl" :activityDetailObj="activityDetailObj"></share>
			</view>
		</u-overlay>

		<!-- 是否中签弹窗 -->
		<u-overlay :show="isSignShow">
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
		</u-overlay>

		<!-- 普通购/优先购弹窗 -->
		<commonSub :buyShow="buyShow" @buyEnd="buyEnd" :alias="alias" :checkedMaxNum="checkedMaxNum"
			:activityDetailObj="activityDetailObj" @subscriptionClick="subscriptionClick"></commonSub>
	</view>
</template>

<script>
	import countdownTimer from '@/components/countDown/countdown-timer.vue';
	import config from "@/common/config.js"
	import {
		getActivityDetail,
		awardResult,
		awardRecord,
		getUserInfo,
		payInfo
	} from '@/common/api'
	export default {
		components: {
			countdownTimer
		},
		data() {
			return {
				stepsState: [],
				publicityList: [],
				txgBtn: "立即抢购",
				alias: "",
				codeUrl: "",
				checkedMaxNum: 0, //最大购买数量
				scrollTop: 0,
				setPercent: 0, //中奖率
				shareShow: false,
				show: false,
				isSignShow: false, //是否中签
				disable: true,
				authShow: false,
				buyShow: false, //购买弹窗
				showCancelButton: true,
				activityDetailObj: {},
				awardResultData: {},
				publicity: {},
				newData: {}, //所有参数
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
						chartName: "分享给朋友",
						scene: "WXSceneSession"
					}, {
						text: "chartPyq",
						chartName: "分享至朋友圈",
						scene: "WXSceneTimeline"
					}
					// #endif  
				],
			}
		},
		onLoad(options) {
			this.alias = options.alias;
			this.newData = options;
			// this.getNewData();
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
				this.getActivityDetailInfo(this.newData.alias);
				if (this.$store.state.userToken != "") {
					this.getaAwardResult(this.newData.id);
				}
			},
			//检查是否中签结果
			getaAwardResult(id) {
				awardResult(id).then((res) => {
					if (JSON.stringify(res) == '{}') {
						this.isSignShow = true;
						this.awardResultData = res;
					} else {
						this.isSignShow = false;
					}
				})
			},
			//获取活动信息
			getActivityDetailInfo(val) {
				let isLogin = this.$store.state.userToken == "" ? "open" : "api";
				getActivityDetail(val, isLogin).then(res => {
					awardRecord(res.alias, isLogin).then(res => {
						this.publicity = res;
					})
					this.stepsState = res.steps;
					this.activityDetailObj = res;
					this.verifySubscription(true);
					if (res.subSumPeople >= res.subSum) {
						this.setPercent = 100;
					} else {
						this.setPercent = res.subSum <= 0 ? 0 : (Math.round(res.subSumPeople / res.subSum *
								10000) /
							100.00);
					}
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
					uni.redirectTo({
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
			//关闭是否中签
			isSignClose() {
				this.isSignShow = false;
			},
			//选择分享方式
			chartWay(val, scene) {
				if (val == 'copyLink') {
					let that = this;
					let copyLink = `${config.copyLink}/pages/homePages/detailBuy?alias=` + that.newData.alias +
						'&id=' + that.newData.id
					uni.setClipboardData({
						data: copyLink, // e是需要设置的内容
						success: function() {
							that.shareShow = false;
						}
					})
					return
				}
				if (val == 'poster') {
					this.codeUrl = `${config.copyLink}/pages/homePages/detailBuy?alias=` + this.newData.alias +
						'&id=' + this.newData.id
					this.shareShow = false;
					this.show = true;
					return
				}
				console.log(scene);
			},
			//秒杀倒计时结束
			seckillTime() {
				console.log('倒计时结束');
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
				if (!this.activityDetailObj.subed) {
					if (this.activityDetailObj.status == 1) {
						if (val) this.txgBtn = '未开始';
						this.$u.toast("活动暂未开始，等一会儿再来吧～");
						return
					}
					if (this.activityDetailObj.status == 2) {
						if (val) {
							this.txgBtn = '立即抢购';
							this.disable = false;
						} else {
							//是否认证过
							getUserInfo().then(res => {
								if (res.realAuth) {
									payInfo(this.alias).then(res => {
										res.map((value) => {
											if (value.type == "crystal") {
												if (value.maxBuyNum == 0) {
													this.$u.toast("当前账户不满足认购条件");
													this.buyShow = false
												} else {
													this.buyShow = true
													this.checkedMaxNum = value.maxBuyNum;
												}
											}
										})
									})
								} else {
									this.authShow = true;
								}
							})
						}
						return
					}
					if (this.activityDetailObj.status == 3) {
						if (val) this.txgBtn = '待公布';
						return
					}
					if (this.activityDetailObj.status == 4) {
						if (val) this.txgBtn = '待付款';
						return
					}
					if (this.activityDetailObj.status == 5) {
						if (val) {
							this.txgBtn = '已结束';
							this.disable = false;
						} else {
							this.$u.toast("活动已结束");
							// this.subscription = true
						}
						return
					}
					if (this.activityDetailObj.status == 6) {
						if (val) this.txgBtn = '已认购';
						return
					}
				} else if (this.activityDetailObj.subed) {
					if (val) {
						this.disable = false;
						this.txgBtn = '已认购';
					} else {
						this.$u.toast("已认购过");
						// this.subscription = true
					}
				} else {
					if (val) {
						this.disable = false;
						this.txgBtn = '已认购(优先购)'
					} else {
						// this.subscription = true
					}
				}
			},
			//去实名
			authConfirm() {
				this.authShow = false;
				uni.navigateTo({
					url: '/pages/mine/set/authentication'
				});
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
				color: var(--c-7A9EFC-bgcportion7);
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
		border-radius: 10rpx;
		// background-color: var(--c-232728-bgc);
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
			color: var(--c-ffffff-fontcolor1);
		}

		.detailBuy_right {
			color: var(--c-979998-fontcolor2);
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
		height: 20rpx;
		background-color: var(--c-F0F0F0-bgcportion8);
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
					border-radius: 30rpx;
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

	::v-deep .u-popup__content {
		// background-color: var(--c-232728-bgcportion1);
		background: linear-gradient(
			-35deg,
			var(--c-DAE9FF-bgcportiongradual3) 0%,
			var(--c-E8E4FF-bgcportiongradual4) 100%
		);
	}

	::v-deep .u-modal__button-group__wrapper--confirm .u-modal__button-group__wrapper__text span {
		color: var(--c-609DF8-fontcolor12);
	}

	::v-deep .u-modal__button-group__wrapper--cancel .u-modal__button-group__wrapper__text span {
		color: var(--c-ffffff-fontcolor1);
	}

	::v-deep .u-modal__content__text span {
		color: var(--c-ffffff-fontcolor1);
	}
</style>
