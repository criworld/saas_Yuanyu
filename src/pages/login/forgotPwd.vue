<template>
	<view class="con px-3 tab-bar-height" :style="[JSON.parse(themeJson),bgImg]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view style="height:80rpx"></view>
		<view class="item" style="margin-top:50rpx">
			<view class="text">手机号</view>
			<view class="input py-3">
				<input
					type="number"
					v-model="userName"
					maxlength="11"
					placeholder="请输入手机号"
					pattern="[0-9]*"
					@blur="blurIpone"
				/>
			</view>
		</view>
		<view class="item" style="margin-top:40rpx">
			<view class="text">验证码</view>
			<view class="input py-3 d-flex flex-row a-center j-sb">
				<input
					v-model="vcode"
					type="number"
					maxlength="6"
					placeholder="请输入验证码"
				/>
				<text @click="sendCode" v-if="!timeout">{{ codeTxt }}</text>
				<text v-else>{{ timeout }}s后重新获取</text>
			</view>
		</view>

		<MButton
			:disable="disable"
			class="loginBtn"
			text="下一步"
			@click.native="submit"
		></MButton>
	</view>
</template>

<script>
import { getResetPwdCode } from '@/common/api.js';
export default {
	data() {
		return {
			disable: true,
			userName: '', //手机号
			vcode: '', //验证码
			centerTitle: '忘记密码',
			codeTxt: '获取验证码',
			timeout: 0,
			bgImg:{
				backgroundImage: `url(${JSON.parse(this.themeJson).allImg2})`
			},
		};
	},
	computed: {
		dateRange() {
			const { userName, vcode } = this;
			return {
				userName,
				vcode
			};
		}
	},
	watch: {
		dateRange: {
			handler() {
				if (this.userName && this.userName.trim() && this.vcode && this.vcode.trim()) {
					this.disable = false;
				} else {
					this.disable = true;
				}
			},
			deep: true
		}
	},
	onLoad(e) {
		this.userName = e.userName;
	},
	methods: {
		blurIpone(){
			if(!(/^1[3456789]\d{9}$/.test(this.userName.trim()))){
				uni.showToast({
					title:'手机号格式错误',
					icon:'none'
				})
				return false;
			}
		},
		submit() {
			if (!this.validation()) return;
			uni.navigateTo({
				url: '/pages/login/pwd?name=' + '忘记密码' + '&vcode=' + this.vcode + '&userName=' + this.userName,
				animationDuration: 0
			});
		},
		// 获取验证码
		sendCode() {
			if (this.userName) {
				if (!/^1[3456789]\d{9}$/.test(this.userName.trim())) {
					this.$u.toast('手机号格式错误');
					return false;
				}
				getResetPwdCode({
					phone: this.userName
				}).then(res => {
					this.$u.toast('验证码获取成功');
					this.startTimer();
				});
			} else {
				this.$u.toast('请填写手机号');
			}
		},
		startTimer() {
			this.timeout = 60;
			this.intervalFlag = setInterval(() => {
				if (this.timeout > 0) {
					this.timeout -= 1;
				} else {
					this.codeTxt = '重新发送';
					clearInterval(this.intervalFlag);
					this.intervalFlag = null;
				}
			}, 1000);
		},
		validation() {
			//非空
			if (this.userName.trim() == '') {
				this.$u.toast('请输入手机号');
				return false;
			} else if (!/^1[3456789]\d{9}$/.test(this.userName.trim())) {
				this.$u.toast('手机号格式错误');
				return false;
			} else if (this.vcode.trim() == '') {
				this.$u.toast('请输入验证码');
				return false;
			}
			return true;
		}
	}
};
</script>

<style lang="scss" scoped>
.con {
	background-color: var(--c-232728-bgc);
	min-height: 100vh;
	width: 750rpx;
	height: 100vh;
	background-size: 750rpx 100vh;
}
.tips {
	letter-spacing: 2rpx;
	font-size: 20rpx;
	line-height: 32rpx;
	color: var(--c-979998-fontcolor2);
}
.item {
	.text {
		font-size: 28rpx;
		line-height: 32rpx;
		color: var(--c-ffffff-fontcolor1);
	}
	.input {
		border-bottom: 1rpx solid var(--c-EBEBEB-linecolor3);
		input {
			font-size: 28rpx;
			line-height: 32rpx;
			color: var(--c-838484-fontcolor6);
		}
		text {
			font-size: 28rpx;
			line-height: 28rpx;
			color: var(--c-609DF8-fontcolor12);
		}
	}
}
.agree {
	margin-top: 30rpx;
	.choice {
		width: 26rpx;
		height: 26rpx;
		border: 1rpx solid var(--c-838484-fontcolor6);
	}
	.remember {
		margin-left: 20rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		color: var(--c-979998-fontcolor2);
	}
	.forget {
		font-size: 24rpx;
		line-height: 28rpx;
		color: var(--c-eddbb3-fontcolor3);
	}
	.xieyi {
		margin-left: 30rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		color: var(--c-979998-fontcolor2);
		text {
			color: var(--c-ffffff-fontcolor1);
		}
	}
}
.loginBtn {
	margin-top: 250rpx;
	background:var(--c-7A9EFC-bgcportion7);
	color: var(--c-eddbb3-fontcolor3);
}
.loginType {
	margin-top: 80rpx;
	font-size: 20rpx;
	line-height: 32rpx;
	color: var(--c-eddbb3-fontcolor3);
}
</style>
