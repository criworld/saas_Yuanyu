<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<meTabs
			:fixed="true"
			v-model="tanindex"
			:tabs="nav"
			@change="tabChange"
			:top="marginTop"
		></meTabs>
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:up="upOption"
			top="90"
		>
			<!-- 数据列表 -->
			<winList :list="list" @onchange="onchange"></winList>
		</mescroll-body>
	</view>
</template>
<script>
import { awardRecordTab } from '@/common/api';
import mescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue';
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: {
		mescrollBody
	},
	data() {
		return {
			centerTitle: '中签记录',
			nav: [
				{
					name: '全部',
					type: -1
				},
				{
					name: '待公布',
					type: 0
				},
				{
					name: '已中签',
					type: 1
				},
				{
					name: '未中签',
					type: 2
				}
			],
			ins: -1,
			tanindex: 0,
			list: [],
			upOption: {
				auto: false, // 不自动加载
				noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				empty: {
					tip: '~ 暂无相关数据 ~', // 提示
					icon: "/static/zanwu.png", // 图标路径
				}
			},
			marginTop:0
		};
	},
	onLoad() {
		this.$nextTick().then(() => {
			this.list = []; // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll(); // 再刷新列表数据
		});
	},
	mounted(){
		// #ifdef APP
		this.marginTop = uni.getSystemInfoSync().statusBarHeight + 80+46
		// #endif
		// #ifdef H5
		this.marginTop = uni.getSystemInfoSync().statusBarHeight + 45+46
		// #endif
	},
	methods: {
		onchange(e) {
			uni.navigateTo({
				url: '/pages/mine/winningListDetails?no=' + e.orderNo,
				animationDuration: 0
			});
		},
		// mescrollInit() {},
		// downCallback() {
		// 	setTimeout(() => {
		// 		this.mescroll.endSuccess();
		// 	}, 1000);
		// },
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			//联网加载数据
			if (this.tanindex == 0) {
				this.ins = -1;
			}
			if (this.tanindex == 1) {
				this.ins = 0;
			}
			if (this.tanindex == 2) {
				this.ins = 1;
			}
			if (this.tanindex == 3) {
				this.ins = 2;
			}
			let temp = {
				pageNum: page.num,
				pageSize: page.size,
				award: this.ins
			};
			awardRecordTab(temp)
				.then(res => {
					let that = this
					if (res.list == null) {
						that.total = 0;
						setTimeout(() => {
							that.mescroll.endSuccess(0);
						}, 600);
						return;
					}
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					setTimeout(() => {
						that.mescroll.endSuccess(res.list.length);
					}, 600);
					//设置列表数据
					if (page.num == 1) that.list = []; //如果是第一页需手动制空列表
					that.list = that.list.concat(res.list); //追加新数据
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		},

		// 切换菜单
		tabChange(e) {
			this.tanindex = e;
			this.list = []; // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll(); // 再刷新列表数据
		}
	}
};
</script>

<style lang="scss" scoped>
.con {
	min-height: 100vh;
	background-color: var(--c-232728-bgc);
}

.nav {
	height: 44px;
	border-bottom: 1rpx solid var(--c-2f3334-linecolor1);
	.item {
		.active {
			color: var(--c-ffffff-fontcolor1);
		}
		text {
			font-size: 28rpx;
			line-height: 44px;
			color: var(--c-979998-fontcolor2);
		}
	}
}
</style>
