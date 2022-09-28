<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar backIcon="back" titleLocation="center" :centerTitle="centerTitle"></homeTopBar>
		<view class="back d-flex flex-column j-center a-center">
			<image class="" :src="JSON.parse(themeJson).logo" mode="widthfix" lazy-load="false" binderror=""
				bindload=""></image>
			<text style="margin-top:34rpx;">{{JSON.parse(themeJson).supplierName}}</text>
			<!-- #ifdef APP -->
			<text>V{{downloadData.appVersion}}</text>
			<!--#endif-->
			<view class="list mx-3" style="margin-top:46rpx">
				<!-- #ifdef APP -->
				<view class="item d-flex flex-row j-sb a-center py-3 mx-3" @click="getApp()">
					<view class="left"><text>版本更新</text></view>
					<view class="right flex-1 d-flex flex-row a-center j-end">
						<text>V{{downloadData.appVersion}}</text>
						<text class="iconfont icon-youjiantou1"></text>
					</view>
				</view>
				<!--#endif-->
				<view class="item d-flex flex-row j-sb a-center py-3 mx-3"
					@click="toPage('/pages/mine/agreement?name=' + '用户协议' + '&type=1')">
					<view class="left"><text>用户协议</text></view>
					<view class="right flex-1 d-flex flex-row a-center j-end">
						<!-- <u-icon
							name="arrow-right"
							color="#959696"
							size="20"
						></u-icon> -->
						<text class="iconfont icon-youjiantou1"></text>
					</view>
				</view>
				<view class="item d-flex flex-row j-sb a-center py-3 mx-3"
					@click="toPage('/pages/mine/agreement?name=' + '隐私协议' + '&type=2')">
					<view class="left"><text>隐私协议</text></view>
					<view class="right flex-1 d-flex flex-row a-center j-end">
						<!-- <u-icon
							name="arrow-right"
							color="#959696"
							size="20"
						></u-icon> -->
						<text class="iconfont icon-youjiantou1"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 版本更新弹窗 -->
		<versionUpdate :show="updateShow" :appVersion="downloadData.appVersion" @upgrade="clickDownload">
		</versionUpdate>
		<!-- @close="close" -->
	</view>
</template>

<script>
	import {
		appUrl
	} from '@/common/config.js'

	import {
		publisherId
	} from "@/json/publisherId.json"

	export default {
		data() {
			return {
				centerTitle: '关于我们',
				updateShow: false,
				appVersion: '',
				downloadData: {},
			};
		},
		onLoad() {
			this.getApp()
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url: url,
					animationDuration: 0
				});
			},
			//获取版本信息
			getApp() {
				// #ifdef APP
				let that = this;
				var timestamp = Date.parse(new Date());
				uni.request({
					url: appUrl, //仅为示例，并非真实接口地址。
					success: (res) => {
						plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
							if (widgetInfo.version !== res.data.appVersion) {
								that.updateShow = true;
								that.downloadData = res.data;
							} else {
								that.downloadData = res.data;
								that.$u.toast('已是最新版本');
							}
						});
					}
				});
				// #endif
			},
			close() {
				this.updateShow = false;
			},
			// 升级app
			clickDownload() {
				let that = this;
				let appVersionPath = that.downloadData.downBaseUrl + that.downloadData.appVersion + '.apk'
				plus.downloader
					.createDownload(appVersionPath, {}, function(d, status) {
						console.log(status)
						if (status === 200) {
							that.updateShow = false;
							// 安装apk资源包
							let path = d.filename;
							that.installApk(path);
						}
					})
					.start();
			},
			//安装后重启
			installApk(path) {
				plus.runtime.install(
					path, {
						force: true
					},
					function() {
						plus.nativeUI.alert('更新完成', function() {
							plus.runtime.restart();
							//  更新完成后重启应用
						});
					},
					function(e) {
						uni.showToast({
							title: '安装失败',
							icon: 'none'
						});
					}
				);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.con {
		height: calc(100vh);
		background-color: var(--c-232728-bgc);
	}

	.back {
		padding-top: 200rpx;

		image {
			width: 284rpx;
			height: 70rpx;
		}

		text {
			font-size: 30rpx;
			line-height: 42rpx;
			color: var(--c-ffffff-fontcolor1);
		}

		.list {
			width: 690rpx;

			// background: var(--c-0d0d0d-bgcportion2);
			// border-radius: 20rpx;
			.item:last-child {
				border-bottom: 0;
			}

			.item {
				border-bottom: 1rpx solid var(--c-EBEBEB-linecolor3);

				.left {
					width: 150rpx;

					text {
						font-size: 30rpx;
						color: var(--c-ffffff-fontcolor1);
					}
				}

				.right {
					margin-left: 30rpx;

					text {
						font-size: 26rpx;
						color: var(--c-979998-fontcolor2);
					}

					.iconfont {
						font-size: 36rpx;
						color: var(--c-ffffff-fontcolor1);
					}

					.text {
						margin-right: 30rpx;
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						background: linear-gradient(84.69deg,
								#f0e1c0 0%,
								#d9b080 98.96%);
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 12rpx;
					}
				}
			}
		}
	}
</style>
