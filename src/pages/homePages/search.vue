<template>
	<view class="search tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar backIcon="back" titleLocation="right" searchType="input" :getSearchVal="searchCentent"
			@changeVal="changeVal" @searchVal="searchValSave" />
		<view class="searchVal">
			<view class="d-flex a-center j-sb">
				<text>搜索历史</text>
				<text @click="delHisroty" class="iconfont icon">&#xe645;</text>
			</view>
			<view class="d-flex p-1 d-flex flex-wrap">
				<view class="searchText" @click="searchTxt(items.history,i)" v-for="(items,i) in newHisrotyList"
					:key="i">
					{{ items.history }}
				</view>
				<view class="noData" v-if="newHisrotyList.length == 0">
					暂无搜索
				</view>
			</view>
		</view>
		<view class="searchVal" v-if="searchVal != '' && searchCentent != null">
			相关商品--- {{ searchVal }}
		</view>
		<view>
			<mescroll-body ref="mescrollRef" @down="downCallback" @up="upCallback" :up="upOption">
				<listDataNew :newList="newList" :getSearchVal="searchCentent"></listDataNew>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import {
		activityList
	} from '@/common/api.js'
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import mescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				searchVal: "",
				newList: [],
				newHisrotyList: [],
				searchCentent: null,
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无相关数据 ~', // 提示
						icon: "/static/zanwu.png", // 图标路径
					}
				},
			}
		},
		onLoad() {
			const hisrotyList = uni.getStorageSync('searchHisroty') || [];
			this.newHisrotyList = this.uniqObjInArray(hisrotyList.reverse().slice(0, 7));
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				this.getActivityList(page, this.searchCentent);
			},
			changeVal(e) {
				this.searchVal = e;
				this.searchCentent = e;
				if (e == '') {
					return this.newList = []
				}
				this.getActivityList(1, e);
			},
			searchValSave(e) {
				this.searchCentent = e;
				let setData = [];
				let hisroty = uni.getStorageSync('searchHisroty') || [];
				let data = [{
					history: e
				}];
				setData = [...hisroty, ...data];
				if (setData.length >= 7) {
					this.newHisrotyList = this.uniqObjInArray(setData.reverse().slice(0, 7));
				} else {
					this.newHisrotyList = setData
				}
				uni.setStorageSync('searchHisroty', setData);
			},
			delHisroty() {
				uni.removeStorageSync('searchHisroty');
				this.newHisrotyList = [];
			},
			searchTxt(val, i) {
				this.searchCentent = val;
				this.newHisrotyList.splice(i, 1);
				let newData = {
					history: val
				};
				this.newHisrotyList.unshift(newData);
				this.newList = [];
			},
			getActivityList(page, e) {
				let that = this;
				activityList(page.num, e)
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
			},
			uniqObjInArray(objarray) {
				let len = objarray.length;
				let tempJson = {};
				let res = [];
				for (let i = 0; i < len; i++) {
					//取出每一个对象
					tempJson[JSON.stringify(objarray[i])] = true;
				}
				let keyItems = Object.keys(tempJson);
				for (let j = 0; j < keyItems.length; j++) {
					res.push(JSON.parse(keyItems[j]));
				}
				return res;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		min-height: 100vh;
		background-color: var(--c-eddbb3-fontcolor3);
	}

	.searchVal {
		padding: 0 30rpx;
	}

	.searchText {
		padding: 10rpx;
		margin: 10rpx;
		background-color: var(--c-F6F6F6-bgcportion5);
		border-radius: 15rpx;
	}

	.noData {
		width: 750rpx;
		text-align: center;
		margin: 30rpx 0;
	}
</style>
