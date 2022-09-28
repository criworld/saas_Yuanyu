<template>
	<view class="homePage tab-bar-height" :style="[JSON.parse(themeJson),bgImg]">
		<homeTopBar titleLocation="right" backIcon="img" :titleImg="JSON.parse(themeJson).logo" searchType="icon"
			@searchTap="searchTap">
		</homeTopBar>
		<swiper class="banner" indicator-dots circular autoplay>
			<swiper-item class="banner-item" v-for="item in bannerList" :key="item.index" @click="to(item)">
				<image mode="aspectFill" class="banner-iamge" :src="item.image"></image>
			</swiper-item>
		</swiper>
		<u-sticky>
			<view class="py-3 pl-3" :class="scrollTop >= 145 ? 'sticky' :''">
				<text v-for="(item,index) in tabTitle" @click="selTab(index,item.id)" :key="index"
					:class="defaultTabi == index?'selTabTitle':'tabTitle'" class="pr-3">{{ item.tab }}</text>
			</view>
		</u-sticky>
		<view>
			<mescroll-body ref="mescrollRef" :height="windowHeight" @init="mescrollInit" @down="downCallback"
				@up="upCallback" :up="upOption">
				<list-data v-if="defaultTabi == 0" :collectList="collectionList" />
				<listDataNew v-if="defaultTabi == 1" :newList="newList"></listDataNew>
			</mescroll-body>
		</view>
		<notLogin :supplierName="JSON.parse(themeJson).supplierName" :loginState="loginState"></notLogin>
		<!-- #ifdef APP -->
		<versionUpdate :show="updateShow" :appVersion="downloadData.appVersion" @upgrade="clickDownload">
		</versionUpdate>
		<!--#endif-->
	</view>
</template>

<script>
	import {
		getFrontList,
		activityList,
		collectionList
	} from '@/common/api'
	import {
		appUrl
	} from '@/common/config.js'
	import {
		publisherId
	} from "@/json/publisherId.json"
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import mescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		name: "homePage",
		data() {
			return {
				bannerList: [],
				tabTitle: [{
						tab: '精选'
					},
					{
						tab: '最新上线'
					}
				],
				loginState: true,
				defaultTabi: 0,
				scrollTop: 0,
				windowHeight: 0,
				collectionList: [],
				newList: [],
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无相关数据 ~', // 提示
						icon: "/static/zanwu.png", // 图标路径
					}
				},
				updateShow: false,
				downloadData: {},
				bgImg: {
					backgroundImage: `url(${JSON.parse(this.themeJson).allImg2})`
				},
			};
		},
		onShow() {
			let userToken = uni.getStorageSync('token');
			if (userToken == '') return this.loginState = true;;
			this.loginState = false;
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight - 215 + 'px';
			this.getSwiperList();
			// #ifdef APP
			this.getApp()
			// #endif
		},
		methods: {
			//获取版本信息
			getApp() {
				// #ifdef APP
				let that = this;
				var timestamp = Date.parse(new Date());
				uni.request({
					url: appUrl,
					success: (res) => {
						console.log(res, '11');
						plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
							if (widgetInfo.version !== res.data.appVersion) {
								that.updateShow = true;
								that.downloadData = res.data;
							} else {
								that.$u.toast('已是最新版本');
							}
						});
					}
				});
				// #endif
			},
			// 升级app
			clickDownload() {
				let that = this;
				let appVersionPath = that.downloadData.downBaseUrl + that.downloadData.appVersion +
					'.wgt'
				plus.downloader
					.createDownload(appVersionPath, {}, function(d, status) {
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
			},
			getSwiperList() {
				getFrontList().then(res => {
					this.bannerList = res.list;
				})
			},
			to(val) {
				if (val.jumpType == "2") {
					uni.navigateTo({
						url: '/pages/homePages/bannerText?id=' + val.id
					});
					return
				}
				if (val.jumpType == "3") {
					// #ifdef APP
					plus.runtime.openURL(val.jumpUrl);
					// #endif
					// #ifdef H5
					window.location.href = val.jumpUrl;
					// #endif
					return
				}
				if (val.jumpType == "4") {
					uni.navigateTo({
						url: '/' + val.jumpUrl
					});
					return
				}
			},
			//切换tab
			selTab(i) {
				this.defaultTabi = i;
				let page = {
					num: 1
				};
				this.upCallback(page);
			},
			//搜索
			searchTap() {
				uni.navigateTo({
					url: '/pages/homePages/search'
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let that = this;
				if (this.defaultTabi == 0) {
					//联网加载数据
					collectionList(page.num)
						.then(res => {
							if (res.list == null) {
								that.total = 0;
								that.mescroll.endSuccess(0);
								return;
							}
							setTimeout(() => {
								that.mescroll.endSuccess(res.list.length);
							}, 600)
							//设置列表数据
							if (page.num == 1) that.collectionList = []; //如果是第一页需手动制空列表
							that.collectionList = that.collectionList.concat(res.list); //追加新数据
							that.total = res.total;
						})
						.catch(() => {
							//联网失败, 结束加载
							that.mescroll.endErr();
						});
				} else {
					//联网加载数据
					activityList(page.num)
						.then(res => {
							if (res.list == null) {
								that.total = 0;
								that.mescroll.endSuccess(0);
								return;
							}
							setTimeout(() => {
								that.mescroll.endSuccess(res.list.length);
							}, 600)
							//设置列表数据
							if (page.num == 1) that.newList = []; //如果是第一页需手动制空列表
							that.newList = that.newList.concat(res.list); //追加新数据
							that.total = res.total;
						})
						.catch(() => {
							//联网失败, 结束加载
							that.mescroll.endErr();
						});
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.homePage {
		min-height: 100%;
		background-color: var(--c-232728-bgc);
		width: 750rpx;
		background-size: 750rpx 100%;
		background-repeat: no-repeat;

	}

	.banner {
		height: 280rpx;
		// padding-bottom: 200rpx;
	}

	.banner-item {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.banner-iamge {
		width: 100%;
		height: 280rpx;
		border-radius: 20rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.tabTitle {
		font-size: 30rpx;
		color: var(--c-979998-fontcolor7);
	}

	.selTabTitle {
		color: var(--c-ffffff-fontcolor1);
		font-size: 38rpx;
		font-weight: 600;
	}

	.sticky {
		// margin-top:-10rpx;
		background-color: var(--c-202122-navigationBar);
	}
</style>
