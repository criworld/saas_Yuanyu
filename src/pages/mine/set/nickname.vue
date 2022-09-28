<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view style="height:100rpx"></view>
		<view class="box mx-3 p-2">
			<input
				type="text"
				maxlength="12"
				v-model="nickName"
				placeholder="请输入昵称"
			/>
		</view>
		<view style="height:20rpx"></view>
		<text class="mx-3">最多可输入12个字符</text>
		<view style="height:600rpx"></view>
		<MButton
			class="btn mx-3 text-center"
			text="保存"
			@click.native="save"
		></MButton>
		<!-- <view class="btn mx-3 text-center" @click="save">保存</view> -->
	</view>
</template>

<script>
import { updatePic } from '@/common/api.js';
import utils from '@/common/utils.js';
export default {
	data() {
		return {
			centerTitle: '修改昵称',
			nickName: ''
		};
	},
	onLoad(e) {
		this.nickName = e.name;
	},
	methods: {
		save() {
			if (this.nickName == '') {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				});
				return;
			}

			if (utils.isNull(this.nickName)) {
				uni.showToast({
					title: '请输入内容',
					icon: 'none'
				});
				return false;
			}
			let payload = {
				updateInfo: 'nickname=' + this.nickName.replace(/\s+/g, '')
			};
			updatePic(payload).then(res => {
				uni.showToast({
					title: '修改成功',
					icon: 'none'
				});
				
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},1000)
				
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
}
.box {
	border-radius: 10rpx;
	background:var(--c-F6F6F6-bgcportion5);
	input {
		font-size: 30rpx;
		color: var(--c-ffffff-fontcolor1);
	}
}
text {
	font-size: 24rpx;
	line-height: 38rpx;
	color: var(--c-bgcportiongradual-h-2);
}
.btn{
	background:var(--c-7A9EFC-bgcportion7);
	color: var(--c-eddbb3-fontcolor3);
}
</style>
