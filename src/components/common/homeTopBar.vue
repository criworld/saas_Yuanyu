<template>
	<view class="homeTopBar" :style="[JSON.parse(themeJson)]">
		<view class="head">
			<text v-if="backIcon == 'back' && titleLocation != 'left' && isShow" @click="tapBack"
				class="iconfont 31fanhui1" :class="buyOrderTab == false?'iconflex':''">&#xe600;</text>
			<text v-if="backIcon == 'close'&& titleLocation != 'left' && isShow" @click="tapBack"
				class="iconfont guanbi" :class="buyOrderTab == false?'iconflex':''">&#xeaf2;</text>
			<!-- 纯粹是为了个人中心页面，顶部导航占位，没别的意思 -->
			<text v-if="!isShow" class="iconfont guanbi" :class="buyOrderTab == false?'iconflex':''"></text>
			<view class="head-title" v-if="titleLocation == 'right' && backIcon != 'back'">
				<image class="img" :src="titleImg" mode=""></image>
			</view>
			<view class="center-head" v-if="titleLocation == 'center' && !buyOrderTab">{{ centerTitle }}</view>
			<view class="right-head" v-if="!buyOrderTab">
				<!-- <text v-if="titleLocation == 'right' && searchType == 'icon'" @click="searchTap"
					class="iconfont icon-sousuo"></text>
				<u-search v-if="titleLocation == 'right' && searchType == 'input'" placeholder="商品名称"
					@change="changeVal" v-model="value" @search="searchVal" :showAction="false"></u-search> -->
			</view>
			<view class="d-flex text-light-title font-35 ml-5" v-if="buyOrderTab">
				<view class="ml-7" :class="selIndex == index?'font-weight text-dark':'nav-title'"
					@click="selBuyWay(index,item.id)" v-for="(item,index) in titleTabs" :key="index">
					{{ item.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "topBar",
		props: {
			titleImg: {
				type: String,
				default: "saasC端"
			},
			centerTitle: {
				type: String,
				default: "登录"
			},
			titleLocation: {
				type: String,
				default: "center"
			},
			backIcon: {
				type: String,
				default: "back"
			},
			//返回路由
			backPath: {
				type: String,
				default: ""
			},
			getSearchVal: {
				type: String
			},
			//搜索类型
			searchType: {
				type: String,
				default: "icon"
			},
			buyOrderTab: {
				type: Boolean,
				default: false
			},
			// 是否展示左边的返回以及关闭
			isShow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				titleTabs: [{
					name: '秒杀',
					id: 0
				}, {
					name: '优先购',
					id: 1
				}, {
					name: '普通购',
					id: 2
				}],
				selIndex: 0,
				value: null
			}
		},
		watch: {
			getSearchVal(newVal) {
				this.value = newVal;
			}
		},
		methods: {
			selBuyWay(i, id) {
				this.selIndex = i;
				this.$emit('changeTopTab', id);
			},
			searchTap() {
				this.$emit('searchTap');
			},
			changeVal(e) {
				uni.$u.debounce(() => this.changeValFun(e), 500);
			},
			changeValFun(e) {
				this.$emit('changeVal', e);
			},
			searchVal(e) {
				this.$emit('searchVal', e);
			},
			tapBack() {
				if (this.backPath != '') {
					uni.switchTab({
						url: this.backPath
					});
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.homeTopBar {
		width: 100%;
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 9999;
		background-color: var(--c-202122-navigationBar);
	}

	.head {
		display: flex;
		box-sizing: border-box;
		color: #333;
		align-items: center;
		height: 92upx;
		width: 100%;
		z-index: 999;
		margin-top: var(--status-bar-height);
		background-color: var(--c-202122-navigationBar);
		padding: 0 20rpx;
	}

	.head-title {

		// font-size: 40rpx;
		// font-weight: 600;
		// color: var(--c-ffffff-navigationBar-fontcolor);
		// line-height: 62rpx;
		// padding: 0 30rpx;
		.img {
			width: 150rpx;
			height: 45rpx;
		}
	}

	.center-head {
		flex: 1;
		text-align: center;
		color: var(--c-ffffff-fontcolor1);
		font-size: 32rpx;
	}

	.right-head {
		flex: 1;
		text-align: right;
	}

	.iconfont {
		color: var(--c-ffffff-fontcolor1);
		font-size: 40rpx;
		// flex: 1;
	}

	.iconflex {
		flex: 1
	}

	.nav-title {
		color: var(--c-232728-fontcolor4);
	}

	::v-deep .u-search__content {
		width: 600rpx !important;
	}
</style>
