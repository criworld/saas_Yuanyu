<template>
	<view class="con" :style="[JSON.parse(themeJson),bgImg]">
		<view v-if="isToken == true">
			<!-- <view class="header">
				<view :style="{ height: statusBarHeight + 'px' }"></view>
				<view :style="{ height: 44 + 'px' }"></view>
				<text>卡包</text>
			</view> -->
			<homeTopBar backIcon="back" titleLocation="center" :centerTitle="centerTitle" :isShow="false"
				class="header"></homeTopBar>
			<view class="num" :style="{top:heightTop + 'px'}">共计：<text>{{ total }}</text>个</view>
			<view :style="{
					paddingTop: height + 50 + 'px'
				}">
				<mescroll-body  ref="mescrollRef" :height="pageHeight" @init="mescrollInit" @down="downCallback"
					@up="upCallback" :up="upOption">
					<cardBagList :list="list" @onChange="onChange"></cardBagList>
				</mescroll-body>
			</view>

		</view>
		<view v-else class="d-flex a-center j-center flex-column pt-300">
			<view class=" d-flex a-center j-center">
				<image style="width: 120rpx;height: 120rpx;" class="b-radius50" src="/static/mine/nologin.png" mode="">
				</image>
			</view>
			<view class="text-light-content pb-10 pt-3 d-flex flex-column j-center a-center tips">
				<text>登录{{JSON.parse(themeJson).supplierName}}</text>
				<text>发现更多精彩</text>
			</view>
			<MButton class="span-16" text="立即登录" @click.native="immLogin"></MButton>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		knapsackList,
		listByPub
	} from '@/common/api';
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import mescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		computed: {
			...mapState(['userToken'])
		},
		components: {
			mescrollBody
		},
		data() {
			return {
				windowHeight: 0,
				statusBarHeight: 0,
				dataList: [],
				height: 0,

				list: [],
				page: 1,
				scrollHeight: 300,
				noMore: false,
				pageHeight: 0,
				heightTop: 0,
				isToken: false, //false就是没有token，未登录，true为有token，代表登录
				appKey: [],
				cateId: [],
				total: 0,
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无相关数据 ~', // 提示
						icon: "/static/zanwu.png", // 图标路径
					}
				},
				centerTitle: '我的藏品',
				bgImg: {
					backgroundImage: `url(${JSON.parse(this.themeJson).allImg2})`
				},
			};
		},
		mounted() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			if (this.isToken == true) {
				// #ifdef APP
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.header')
					.boundingClientRect(data => {
						this.height = data.height;
						this.heightTop = data.height;
					})
					.exec();
					
					this.pageHeight = uni.getSystemInfoSync().windowHeight - 440 - this.height + 'px';
					console.log(this.pageHeight);
					
				// #endif
				// #ifdef H5
				const query = uni.createSelectorQuery();
				query
					.select('.header')
					.boundingClientRect(data => {
						this.height = data.height;
						this.heightTop = data.height;
					})
					.exec();
					this.pageHeight = uni.getSystemInfoSync().windowHeight - 40 - this.height;
				// #endif
			}
		},

		onShow() {
			if (this.userToken != '') {
				this.isToken = true;
				// this.$nextTick().then(() => {})
				this.canReset && this.mescroll.resetUpScroll() // 重置列表数据为第一页  
				this.canReset && this.mescroll.scrollTo(0, 0) // 重置列表数据为第一页时,建议把滚动条也重置到顶部,避免无法再次翻页的问题  
				this.canReset = true // 过滤第一次的onShow事件,避免初始化界面时重复触发upCallback, 无需配置auto:false
				// 注意: 子组件没有 onShow 的生命周期, 所以
				// 对于 mescroll-more.vue 和 mescroll-swiper.vue 的返回刷新, 需更新 1.3.3 版本, 且参考对应示例的onShow写法
			} else {
				this.isToken = false;
			}
		},
		methods: {
			// 跳转详情
			onChange(item) {
				uni.navigateTo({
					url: '/pages/cardBag/details?appId=' + item.appId + '&tokenId=' + item.tokenId,
					animationDuration: 0
				});
			},
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				listByPub().then(res => {
					res.unshift({
						cnName: "全部",
					});
					this.category_list = res
					this.appKey = this.category_list.map(x => {
						return x.appKey
					}) // 生成数组
					this.appKey = this.appKey.filter(n => n)
					const params = {
						pageNum: page.num,
						pageSize: page.size,
						appIds: this.appKey,
						assetType: this.cateId
					};
					//联网加载数据
					knapsackList(params)
						.then(res => {
							if (res == null) {
								this.total = 0;
								if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
								setTimeout(() => {
									this.mescroll.endSuccess(0);
								}, 600)
								return;
							}
							setTimeout(() => {
								this.mescroll.endSuccess(res.list.length);
							}, 600)
							//设置列表数据
							if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
							this.list = this.list.concat(res.list); //追加新数据
							this.total = res.total;
						})
						.catch(() => {
							//联网失败, 结束加载
							this.mescroll.endErr();
						});
				})


				// console.log(page)

			},

			immLogin() {
				uni.navigateTo({
					url: '/pages/login/login',
					animationDuration: 0
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.con {
		min-height: 100vh;
		position: relative;
		background-color: var(--c-232728-bgc);
		background-size: 750rpx 100vh;
		background-repeat: no-repeat;
	}

	.span-16 {
		width: 540rpx;
		height: 80rpx;
		background: var(--c-7A9EFC-bgcportion7);
		color: var(--c-eddbb3-fontcolor3);
		border-radius: 20rpx;
		font-size: 40rpx;
		line-height: 80rpx;
	}

	.tips {
		font-size: 26rpx;
		line-height: 44rpx;
		color: var(--c-979998-fontcolor2);
	}

	// .header {
	// 	position: fixed;
	// 	top: 0;
	// 	z-index: 1;
	// 	left: 0;
	// 	width: 750rpx;
	// 	height: 332rpx;
	// 	background-image: url('~@/static/cardBag/back.png');
	// 	background-size: 750rpx 332rpx;
	// 	text-align: center;

	// 	text {
	// 		color: #fff;
	// 		font-size: 44rpx;
	// 		letter-spacing: 5rpx;
	// 	}
	// }

	.num {
		position: absolute;
		z-index: 1999;
		width: 100%;
		height: 40px;
		font-size: 28rpx;
		line-height: 40px;
		padding: 0 30rpx;
		box-sizing: border-box;
		letter-spacing: -0.408rpx;
		color: var(--c-ffffff-fontcolor1);

		text {
			color: var(--c-609DF8-fontcolor12)
		}

		// background-color: var(--c-232728-bgc);
	}

	.list {
		position: fixed;
		left: 0;
		z-index: 1;
		width: 100%;
	}
</style>
