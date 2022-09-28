<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view class="list mx-3" style="margin-top:30rpx">
			<view
				class="item d-flex flex-row j-sb a-center py-3 mx-1"
				@click="toPage('/pages/mine/set/personal')"
			>
				<view class="left"><text>基本信息</text></view>
				<view class="right flex-1 d-flex flex-row a-center j-end">
					<text class="iconfont icon-youjiantou1"></text>
				</view>
			</view>
			<view class="item d-flex flex-row j-sb a-center py-3 mx-1">
				<view class="left"><text>手机号</text></view>
				<view class="right flex-1 d-flex flex-row a-center j-end">
					<text>{{ info.phone }}</text>
				</view>
			</view>
		</view>
		<view class="list mx-3" style="margin-top:40rpx">
			<view
				class="item d-flex flex-row j-sb a-center py-3 mx-1"
				@click="toPageAuth()"
			>
				<view class="left"><text>实名认证</text></view>
				<view class="right flex-1 d-flex flex-row a-center j-end">
					<text>
						{{ info.realAuth == true ? '已实名' : '未实名' }}
					</text>
					<text class="iconfont icon-youjiantou1"></text>
				</view>
			</view>
			<view
				class="item d-flex flex-row j-sb a-center py-3 mx-1"
				@click="toPagePwd()"
			>
				<view class="left"><text>{{info.passwordSet == false?'设置密码':'修改密码'}} </text></view>
				<view class="right flex-1 d-flex flex-row a-center j-end">
					<view v-if="info.passwordSet == false" class="text">!</view>
					<text v-if="info.passwordSet == false">未设置</text>
					<text class="iconfont icon-youjiantou1"></text>
				</view>
			</view>
			<!-- <view class="item d-flex flex-row j-sb a-center py-3 mx-3">
				<view class="left"><text>通用设置</text></view>
				<view class="right flex-1 d-flex flex-row a-center j-end">
					<u-icon
						name="arrow-right"
						color="#959696"
						size="20"
					></u-icon>
				</view>
			</view> -->
			<view
				class="item d-flex flex-row j-sb a-center py-3 mx-1"
				@click="toPage('/pages/mine/set/cancellation?ipone=' + info.phone)"
			>
				<view class="left"><text>注销账号</text></view>
				<view class="right flex-1 d-flex flex-row a-center j-end">
					<text>注销后无法恢复，谨慎操作</text>
					<text class="iconfont icon-youjiantou1"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserInfo } from '@/common/api';
export default {
	data() {
		return {
			centerTitle: '设置',
			list1: [
				{
					name: '基本信息'
				},
				{
					name: '手机号'
				}
			],
			list2: [
				{
					name: '实名认证'
				},
				{
					name: '密码设置'
				},
				{
					name: '通用设置'
				},
				{
					name: '注销账号'
				}
			],
			info: {}
		};
	},
	onShow() {
		this.getUserInfoAll();
	},
	methods: {
		getUserInfoAll() {
			getUserInfo().then(res => {
				this.info = res;
			});
		},
		toPage(e) {
			uni.navigateTo({
				url: e,
				animationDuration: 0
			});
		},
		toPageAuth() {
			if (this.info.realAuth == false) {
				uni.navigateTo({
					url: '/pages/mine/set/authentication',
					animationDuration: 0
				});
			}
		},
		toPagePwd(){
			if(this.info.passwordSet == false){
				console.log('新号首次进入，去设置密码')
				uni.navigateTo({
					url: '/pages/mine/set/setLoginPwd?ipone=' + this.info.phone + '&name=' + '设置密码',
					animationDuration: 0
				});
			}else{
				console.log('老号，去修改密码')
				uni.navigateTo({
					url: '/pages/mine/set/setLoginPwd?ipone=' + this.info.phone + '&name=' + '修改密码',
					animationDuration: 0
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
}

.header {
	width: 750rpx;
}

.list {
	// background: var(--c-0d0d0d-bgcportion2);
	border-radius: 20rpx;
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
				font-size: 30rpx;
				color: var(--c-979998-fontcolor7);
			}
			.text {
				margin-right: 30rpx;
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				background: linear-gradient(
					84.69deg,
					var(--c-bgcportiongradual-l-1) 0%,
					var(--c-bgcportiongradual-l-2) 98.96%
				);
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12rpx;
				color:var(--c-eddbb3-fontcolor3)
			}
			.iconfont{
				font-size:36rpx;
				color: var(--c-ffffff-fontcolor1);
			}
		}
	}
}
</style>
