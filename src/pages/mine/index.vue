<template>
	<view class="con" :style="[JSON.parse(themeJson),bgImg]">
		<!-- <view class="header">
			<view :style="{ height: statusBarHeight + 'px' }"></view>
			<view :style="{ height: 44 + 'px' }" class="nav d-flex flex-row j-center a-center">
				<text>个人中心</text>
			</view>
		</view> -->
		<!-- #ifdef H5 -->
		<view id="wx" v-show="show_wx">
			<!-- <view @click="closewx" class="close"
				style="color:#fff;width: 30rpx;height: 30rpx;border-radius: 50%;border: 1rpx solid #fff;text-align: center;line-height: 30rpx;">
				X</view> -->
			<image @click="closewx" src="/static/mine/touming.png" mode=""></image>
		</view>
		<!-- #endif -->
		<homeTopBar backIcon="back" titleLocation="center" :centerTitle="centerTitle" :isShow="false" class="nav">
		</homeTopBar>
		<view class="info" v-if="isToken == false" @click="toPage_url('/pages/login/login')"
			:style="{ paddingTop: height + 'px' }">
			<view class="left">
				<image class="" src="/static/mine/nologin.png" mode="widthfix" lazy-load="false" binderror=""
					bindload=""></image>
			</view>
			<view class="right">
				<view class="name"><text>注册/登录</text></view>
			</view>
		</view>

		<view class="info" :style="{ paddingTop: height + 'px' }" v-else @click="topage('/pages/mine/set/personal')">
			<view class="left">
				<image v-if="Info.avatar == ''" class="" src="/static/mine/nologin.png" mode="widthfix"
					lazy-load="false" binderror="" bindload=""></image>
				<image v-else class="" :src="Info.avatar" mode="widthfix" lazy-load="false" binderror="" bindload="">
				</image>
			</view>
			<view class="right">
				<view class="name">
					<text>{{ Info.nickname }}</text>
					<text v-if="Info.realAuth == false" @click.stop="
							toPage_url('/pages/mine/set/authentication')
						">
						未实名认证
					</text>
				</view>
				<view class="des">{{ Info.phone }}</view>
			</view>
		</view>
		<view :style="{ height: listHeight + 'px' }" class="list-white">
			<view class="list" style="border-top-left-radius:32rpx;border-top-right-radius:32rpx;">
				<view class="box"></view>
				<view class="item d-flex flex-row j-sb a-center py-4 mx-5" v-for="(item, index) in list1" :key="index"
					@click="topage(item.url)">
					<view class="left  d-flex a-center">
						<image class="" :src="item.icon" mode="widthfix" lazy-load="false" binderror="" bindload="">
						</image>
					</view>
					<view class="right flex-1 d-flex flex-row a-center j-sb">
						<text>{{ item.name }}</text>
						<u-icon name="arrow-right" color="#000" size="16"></u-icon>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item d-flex flex-row j-sb a-center py-4 mx-5" v-for="(item, index) in list2" :key="index"
					@tap="toPage(item)" v-if="isToken ? true : item.isLogin">
					<view class="left  d-flex a-center">
						<image class="" :src="item.icon" mode="widthfix" lazy-load="false" binderror="" bindload="">
						</image>
					</view>
					<view class="right flex-1 d-flex flex-row a-center j-sb">
						<text>{{ item.name }}</text>
						<u-icon name="arrow-right" color="#000" size="16"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 退出登录 -->
		<u-modal width="550rpx" :show="isLogOut" :title="title" :content="content" :showConfirmButton="true"
			:showCancelButton="true" @confirm="quitLoginConfirm" @cancel="quitLoginCancel"></u-modal>
		<!-- app下载 -->
		<u-modal width="550rpx" :show="isUpload" :title="'复制下方链接并粘贴到浏览器，即可下载' + JSON.parse(themeJson).supplierName + 'APP'"
			:content="appVersionPathShow" :showConfirmButton="true"
			:showCancelButton="true" :cancelText="'关闭'" :confirmText="'复制'" @cancel="isUploadCancel" @confirm="downLoadConfirm"></u-modal>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		getUserInfo,
		getVersionUpgrade
	} from '@/common/api';
	import {
		publisherId
	} from "@/json/publisherId.json"
	import {
		appUrl
	} from '@/common/config.js'
	export default {
		data() {
			return {
				windowHeight: 0,
				statusBarHeight: 0,
				height: 0,
				bgImg: {
					backgroundImage: `url(${JSON.parse(this.themeJson).allImg1})`
				},
				list1: [{
						name: '我的认购',
						url: '/pages/mine/goPurchase/index',
						icon: JSON.parse(this.themeJson).minerengou
					},
					{
						name: '我的中签',
						url: '/pages/mine/winningList',
						icon: JSON.parse(this.themeJson).minezhongqian
					}
				],
				list2: [{
						name: '设置',
						url: '/pages/mine/set/set',
						isLogin: false,
						icon: JSON.parse(this.themeJson).mineshezhi
					},
					{
						name: '关于我们',
						url: '/pages/mine/aboutUs',
						isLogin: true,
						icon: JSON.parse(this.themeJson).mineguanyvwomen
					},
					// #ifdef H5
					{
						name: 'APP下载',
						isLogin: true,
						icon: JSON.parse(this.themeJson).minexiazai
					},
					// #endif
					// #ifdef APP
					// {
					// 	name: '版本更新',
					// 	isLogin: false
					// },
					// #endif
					{
						name: '退出登录',
						isLogin: false,
						icon: JSON.parse(this.themeJson).minetuichudenglu
					},
					{
						name: '联系我们',
						isLogin: true,
						url: '/pages/mine/agreement?type=3' + '&name=联系我们',
						icon: JSON.parse(this.themeJson).minelianxiwomen
					}
				],
				isLogOut: false, //退出登录弹窗显示隐藏
				title: '',
				content: '确认是否退出登录',
				isUpload: false, //展示是否下载app
				isToken: false, //false就是没有token，未登录，true为有token，代表登录
				Info: {},
				centerTitle: '个人中心',
				listHeight: 0,
				show_wx: false,
				downloadData: {},
				appVersionPath: '',
				appVersionPathShow:''
			};
		},
		mounted() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			// #ifdef APP
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.nav')
				.boundingClientRect(data => {
					this.height = data.height;
				})
				.exec();
			// #endif
			// #ifdef H5
			const query = uni.createSelectorQuery();
			query
				.select('.nav')
				.boundingClientRect(data => {
					this.height = data.height;
				})
				.exec();
			// #endif
			this.listHeight = uni.getSystemInfoSync().windowHeight - 130;
		},
		computed: {
			...mapState(['userToken'])
		},
		onShow() {
			if (this.userToken != '') {
				this.isToken = true;
				this.getUserInfoAll();
			} else {
				this.isToken = false;
			}
		},
		methods: {
			closewx() {
				this.show_wx = false
			},
			// app下载更新
			downLoadConfirm() {
				let _this = this;
				_this.isBrowser();
				setTimeout(function() {
					_this.isUpload = false;
				}, 60);
			},
			// 检测是否是微信浏览器
			isBrowser() {
				// #ifdef H5
				let ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					this.show_wx = true;
				} else {

					this.getApp()
					// getVersionUpgrade().then(res => {
					// 	window.open(res.downloadUrl, '_blank');
					// });
					// this.isUpload = false;
				}
				// #endif
			},
			//获取版本信息
			getApp() {
				let that = this;
				var timestamp = Date.parse(new Date());
				uni.request({
					url: appUrl, //仅为示例，并非真实接口地址。
					success: (res) => {
						that.downloadData = res.data;
						that.appVersionPath = that.downloadData.downBaseUrl + publisherId + '/' + that
							.downloadData.appVersion + '.apk'
						// window.open(that.appVersionPath, '_blank');
						uni.setClipboardData({
							data: that.appVersionPath,
							success: function () {
								console.log('success');
							}
						});
						that.show_wx = false
					}
				});
			},
			getApp_1() {
				let that = this;
				var timestamp = Date.parse(new Date());
				uni.request({
					url: appUrl, //仅为示例，并非真实接口地址。
					success: (res) => {
						that.downloadData = res.data;
						that.appVersionPathShow = that.downloadData.downBaseUrl + publisherId + '/' + that
							.downloadData.appVersion + '.apk'
						
						that.appVersionPathShow = this.geTel(that.appVersionPathShow.toString());
						console.log(that.appVersionPathShow)
						
					}
				});
			},
			geTel(tel) {
				return tel.substring(0, 10) + '****' + tel.substr(tel.length - 4);
			},


			getUserInfoAll() {
				getUserInfo().then(res => {
					this.Info = res;
				});
			},
			topage(e) {
				if (this.isToken == false) {
					uni.navigateTo({
						url: '/pages/login/login',
						animationDuration: 0
					});
					return;
				}
				uni.navigateTo({
					url: e,
					animationDuration: 0
				});
			},
			isUploadCancel() {
				this.isUpload = false;
			},
			quitLoginCancel() {
				this.isLogOut = false;
			},
			//确认退出
			quitLoginConfirm() {
				let _this = this;
				this.$store.commit('logout');
				this.$u.toast('账号已退出');
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/homePages/index'
					});
					_this.isLogOut = false;
					_this.isToken = false;
				}, 600);
			},
			toPage(item, index) {
				if (item.name == '退出登录') {
					this.isLogOut = true;
					return;
				}
				if (item.name == 'APP下载') {
					// #ifdef H5
					this.getApp_1()
					this.isUpload = true;
					// #endif
					// #ifdef APP
					// 版本更新
					// this.getApp()
					// #endif
					return;
				}
				uni.navigateTo({
					url: item.url,
					animationDuration: 0
				});
			},
			toPage_url(url) {
				uni.navigateTo({
					url: url,
					animationDuration: 0
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	#wx {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100%;
		background: #808080;
		opacity: .9;
		z-index: 9990000;

		image {
			width: 750rpx;
			height: 100%;
			z-index: 9990000;
		}
	}

	.con {
		min-height: 100vh;
		background-color: var(--c-232728-bgc);
		width: 750rpx;
		height: 100vh;
		background-size: 750rpx 100vh;
	}

	::v-deep .u-popup__content {
		// background-color: var(--c-232728-bgcportion1);
		background: linear-gradient(-35deg,
				var(--c-DAE9FF-bgcportiongradual3) 0%,
				var(--c-E8E4FF-bgcportiongradual4) 100%);
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
	
	::v-deep .u-modal__title[data-v-3626fcec] {
	    font-size: 16px;
	    // font-weight: bold;
	    color: #606266;
	    text-align: center;
	    padding-top: 25px;
	}

	.header {
		width: 750rpx;

		.nav {
			text {
				font-size: 36rpx;
				font-weight: bold;
				color: #000000;
			}
		}
	}

	.info {
		height: 130px;
		margin: 0 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;

		.left {
			display: flex;
			align-items: center;
			width: 120rpx;

			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}

		.right {
			flex: 1;
			margin-left: 32rpx;

			.name {
				display: flex;
				flex-direction: row;
				align-items: center;

				text:nth-of-type(1) {
					font-size: 36rpx;
					line-height: 50rpx;
					color: var(--c-ffffff-fontcolor1);
				}

				text:nth-of-type(2) {
					margin-left: 30rpx;
					display: inline-block;
					padding: 3rpx 20rpx;
					font-size: 24rpx;
					text-align: center;
					color: var(--c-eddbb3-fontcolor3);
					background: linear-gradient(-35deg,
							var(--c-7A9EFC-bgcportiongradual1) 0%,
							var(--c-5A9AF8-bgcportiongradual2) 100%);
					box-shadow: 0px 3rpx 7rpx 0px rgba(255, 255, 255, 0.25);
					border-radius: 10rpx;
				}
			}

			.des {
				margin-top: 5rpx;
				font-size: 26rpx;
				letter-spacing: 0.01em;
				color: var(--c-979998-fontcolor2);
			}
		}
	}

	.list-white {
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		background: var(--c-232728-bgc);
	}

	.list {
		.box {
			width: 0px;
			height: 0px;
			/*  background-color: pink;*/
			// margin-top: 50px;
			margin-left: 365rpx;
			/*增大盒子 内减 width---》保证盒子正常放置 */
			/*  padding-left: 30px;*/
			/*边框border：  宽度 px  边形  solid 实现  dotted 圆点  dashed虚线    none 没有边框     颜色  */
			/* border: 100px solid  red;*/
			/*倒三角形*/
			border-top: 20rpx solid rgba(0, 0, 0, 0.3);
			border-left: 20rpx solid transparent;
			border-right: 20rpx solid transparent;
			border-bottom: 20rpx solid transparent;
			opacity: 0.1;
		}

		.item {
			.left {
				width: 80rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.right {
				text {
					font-size: 30rpx;
					color: var(--c-ffffff-fontcolor1);
				}
			}
		}
	}
</style>
