<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
			:buyOrderTab="true"
			@changeTopTab="changeTopTab"
		></homeTopBar>
		<meTabs :fixed="true" v-model="tanindex" :top="marginTop" :tabs="navList" @change="tabChange"></meTabs>
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:up="upOption"
			top="90"
		>
			<!-- 数据列表 -->
			<purchaseList
				@isOvertime="isOvertime"
				v-if="selTyps == 1 || selTyps == 2"
				:list="indexList"
			></purchaseList>
			<seckillList
				@isOvertimeSeckill="isOvertimeSeckill"
				v-if="selTyps == 0"
				:list="indexList"
				@orderCancel="orderCancel"
			></seckillList>
		</mescroll-body>
	</view>
</template>

<script>
import {
	goPurchaseTab,
	seckillGoPurchaseTab,
	activityActivityOrderCancel
} from '@/common/api.js';
import mescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue';
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			centerTitle: '我的认购',
			navList: [
				{
					name: '全部',
					id: 0
				},
				{
					name: '待支付',
					id: 1
				},
				{
					name: '已支付',
					id: 2
				},
				{
					name: '已超时',
					id: 3
				},
				{
					name: '已取消',
					id: 4
				}
			],
			tanindex: 0,
			tanindex_num: 0, //真正的值
			upOption: {
				auto: false, // 不自动加载
				noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				empty: {
					tip: '~ 暂无相关数据 ~', // 提示
					icon: "/static/zanwu.png", // 图标路径
				}
			},
			selTyps: 0,
			indexList: [],
			temp: {},
			marginTop:0
		};
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
		upCallback(page) {
			if (this.selTyps == 0) {
				this.temp = {
					pageNum: page.num,
					pageSize: page.size,
					status: this.tanindex_num
				};
				seckillGoPurchaseTab(this.temp)
					.then(res => {
						let that = this
						if (res.list == null) {
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
						if (page.num == 1) that.indexList = []; //如果是第一页需手动制空列表
						that.indexList = that.indexList.concat(res.list); //追加新数据
						
					})
					.catch(() => {
						//联网失败, 结束加载
						this.mescroll.endErr();
					});
				return;
			}
			if (this.selTyps == 1) {
				this.temp = {
					pageNum: page.num,
					pageSize: page.size,
					status: this.tanindex_num,
					activityType: this.selTyps
				};
			}
			if (this.selTyps == 2) {
				this.temp = {
					pageNum: page.num,
					pageSize: page.size,
					status: this.tanindex_num,
					activityType: this.selTyps
				};
			}
			goPurchaseTab(this.temp)
				.then(res => {
					if (res.list == null) {
						// this.indexList = [];
						this.mescroll.endSuccess(0);
						return;
					}
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.list.length);
					//设置列表数据
					if (page.num == 1) this.indexList = []; //如果是第一页需手动制空列表
					this.indexList = this.indexList.concat(res.list); //追加新数据
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		},

		tabChange(e) {
			// 样式
			this.tanindex = e;
			if (this.selTyps == 0) {
				this.tanindex_num = e;
				this.indexList = []; // 先置空列表,显示加载进度
				this.mescroll.resetUpScroll(); // 再刷新列表数据
			}

			if (this.selTyps == 1) {
				this.tanindex_num = e - 1;
				this.indexList = []; // 先置空列表,显示加载进度
				this.mescroll.resetUpScroll(); // 再刷新列表数据
			}
			if (this.selTyps == 2) {
				this.tanindex_num = e - 1;
				this.indexList = []; // 先置空列表,显示加载进度
				this.mescroll.resetUpScroll(); // 再刷新列表数据
			}
		},
		// 秒杀去掉订单
		orderCancel(orderNo) {
			let data = {
				orderNo
			};
			activityActivityOrderCancel(data).then(res => {
				uni.showToast({
					title: '订单取消成功',
					icon: 'none'
				});
				this.indexList = []; // 先置空列表,显示加载进度
				this.mescroll.resetUpScroll(); // 再刷新列表数据
			});
		},
		isOvertime() {
			// this.indexList = []; // 先置空列表,显示加载进度
			// this.mescroll.resetUpScroll(); // 再刷新列表数据
		},
		isOvertimeSeckill() {
			// this.indexList = []; // 先置空列表,显示加载进度
			// this.mescroll.resetUpScroll(); // 再刷新列表数据
		},
		// 点击顶部（三个）导航
		changeTopTab(id) {
			this.selTyps = id;
			this.tabIndex = 0;
			if (id == 0) {
				this.tanindex_num = 0;
				this.navList = [
					{
						name: '全部',
						id: 0
					},
					{
						name: '待支付',
						id: 1
					},
					{
						name: '已支付',
						id: 2
					},
					{
						name: '已超时',
						id: 3
					},
					{
						name: '已取消',
						id: 4
					}
				];
			} else {
				this.tanindex_num = -1;
				this.navList = [
					{
						name: '全部',
						id: -1
					},
					{
						name: '待支付',
						id: 0
					},
					{
						name: '已支付',
						id: 1
					},
					{
						name: '已超时',
						id: 2
					}
				];
			}
			this.indexList = []; // 先置空列表,显示加载进度
			this.mescroll.resetUpScroll(); // 再刷新列表数据
		},
		// mescrollInit() {},
		// downCallback() {
		// 	// this.$nextTick().then(() => {
		// 	// 	this.indexList = []; // 先置空列表,显示加载进度
		// 	// 	this.mescroll.resetUpScroll(); // 再刷新列表数据
		// 	// });
		// 	// if(this.selTyps == 0){
		// 	// 	this.$nextTick().then(() => {
		// 	// 		this.indexList = []; // 先置空列表,显示加载进度
		// 	// 		this.mescroll.resetUpScroll(); // 再刷新列表数据
		// 	// 	});
		// 	// }
		// 	// console.log('111')
		// 	// setTimeout(() => {
		// 	// 	this.mescroll.endSuccess();
		// 	// }, 1000);
		// },
	}
};
</script>

<style lang="scss" scoped>
.con {
	// height: calc(100vh - 50px);
	background-color: var(--c-232728-bgc);
}
</style>
