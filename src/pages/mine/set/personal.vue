<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view class="item d-flex flex-row j-sb a-center py-3 mx-3 my-2 px-2">
			<view class="left"><text>头像</text></view>
			<view class="right flex-1 d-flex flex-row a-center j-end " >
				<image
					v-if="info.avatar == ''"
					class=""
					src="/static/mine/nologin.png"
					mode="widthfix"
					lazy-load="false"
					binderror=""
					bindload=""
				></image>
				<image
					v-else
					class=""
					:src="info.avatar"
					mode="widthfix"
					lazy-load="false"
					binderror=""
					bindload=""
					@click="clk(1)"
				></image>
				<text class="iconfont icon-youjiantou1"></text>
			</view>
		</view>
		<view
			class="item d-flex flex-row j-sb a-center py-3 mx-3 my-2 px-2"
			@click="toPage('/pages/mine/set/nickname?name='+info.nickname)"
		>
			<view class="left"><text>昵称</text></view>
			<view class="right flex-1 d-flex flex-row a-center j-end ">
				<text>{{info.nickname}}</text>
				<text class="iconfont icon-youjiantou1"></text>
			</view>
		</view>
		<view class="item d-flex flex-row j-sb a-center py-3 mx-3 my-2 px-2">
			<view class="left"><text>手机号</text></view>
			<view class="right flex-1 d-flex flex-row a-center j-end ">
				<text>{{info.phone}}</text>
			</view>
		</view>
		<!-- <view class="item d-flex flex-row j-sb a-center py-3 mx-3 my-2 px-2">
			<view class="left"><text>区块链地址</text></view>
			<view class="right flex-1 d-flex flex-row a-center j-end ">
				<text>0xff01929ed3e0019b5f……</text>
				<text class="iconfont icon-fuzhi"></text>
			</view>
		</view> -->
		
		<avatar @upload="myUpload" quality="1" ref="avatar" selWidth="250upx" selHeight="250upx"></avatar>
	</view>
</template>

<script>
import { getUserInfo,updatePic,uploadGetToken } from '@/common/api';
export default {
	
	data() {
		return {
			centerTitle: '个人信息',
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
			info:{}
		};
	},
	onShow() {
		this.getUserInfoAll();
		this.getToken()
	},
	methods: {
		getToken() {
		    uploadGetToken().then((res) => {
		        this.token = res.token;
		    });
		},
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
		clk(index) {
			this.$refs.avatar.fChooseImg(index,{
				selWidth: '350upx', selHeight: '350upx', inner: true
			});
			
		},
		// 编辑头像
		myUpload(e) {
			let fileName =
			    "land/" +
			    Date.parse(new Date()) +
			    this.code + ".png";
			uni.uploadFile({
			    url: 'https://upload-z2.qiniup.com/',
			    name: 'file',
			    filePath: e.path,
			    formData: {
			        token: this.token,
			        key: fileName,
			        fname: fileName
			    },
			    success: (res) => {
			        let req = JSON.parse(res.data)
					let urls = "https://website-cdn.gfanx.com/" + req.key
					
			        updatePic({
			            updateInfo: "avatar=" + urls
			        }).then(res => {
						this.info.avatar = urls
			            uni.showToast({
			                title: "修改成功"
			            })
			        })
			
			    },
			    fail: (err) => {
			        uni.showToast({
			            title: "出了点问题",
			            icon: "error"
			        })
			    }
			});
			
			
		},
	}
};
</script>

<style lang="scss" scoped>
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
}

.item:last-child {
	border-bottom: 0;
}
.item {
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
		image {
			margin-right: 30rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		.text {
			margin-right: 30rpx;
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			background: linear-gradient(84.69deg, #f0e1c0 0%, #d9b080 98.96%);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12rpx;
		}
		.iconfont {
			margin-left: 20rpx;
			font-size: 20px;
			color: var(--c-e9d7af-bgcportiongradual1);
		}
		.iconfont{
			font-size:36rpx;
			color: var(--c-ffffff-fontcolor1);
		}
	}
}
</style>
