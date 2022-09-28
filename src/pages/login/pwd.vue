<template>
	<view class="con px-3 tab-bar-height" :style="[JSON.parse(themeJson),bgImg]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view style="height:80rpx"></view>
		<view class="item">
			<view class="text">登录密码</view>
			<view class="input px-3 py-3 d-flex flex-row a-center j-sb">
				<input
					type="text"
					maxlength="20"
					password
					placeholder="8-20位字母、数字、符号组合"
					v-model="pwd1"
					onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
				/>
			</view>
		</view>
		<view class="item" style="margin-top:30rpx">
			<view class="text">确认密码</view>
			<view class="input px-3 py-3 d-flex flex-row a-center j-sb">
				<input
					type="text"
					maxlength="20"
					password
					placeholder="8-20位字母、数字、符号组合"
					v-model="pwd2"
					onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
				/>
			</view>
		</view>

		<MButton
			:disable="disable"
			class="loginBtn"
			text="确定"
			@click.native="submit"
		></MButton>
	</view>
</template>

<script>
import { resetPwdByRemember, passwordSet } from '@/common/api.js';
export default {
	data() {
		return {
			disable: true,
			pwd1: '',
			pwd2: '',
			vcode: '',
			centerTitle: '',
			vcode: '',
			bgImg:{
				backgroundImage: `url(${JSON.parse(this.themeJson).allImg2})`
			},
		};
	},
	computed: {
		dateRange() {
			const { pwd1, pwd2 } = this;
			return {
				pwd1,
				pwd2
			};
		}
	},
	watch: {
		dateRange: {
			handler() {
				if (
					this.pwd1 &&
					this.pwd1.trim() &&
					this.pwd2 &&
					this.pwd2.trim()
				) {
					this.disable = false;
				} else {
					this.disable = true;
				}
			},
			deep: true
		}
	},
	onLoad(e) {
		this.centerTitle = e.name;
		this.userName = e.userName;
		this.vcode = e.vcode;
		this.userName = e.userName;
	},
	methods: {
		validation() {
			var regex = new RegExp(
				'(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}'
			);

			//非空
			if (this.pwd1.trim() == '') {
				this.$u.toast('请输入密码');
				return false;
			} else if (this.pwd1.trim().length < 8) {
				this.$u.toast('密码不能小于8位');
				return false;
			} else if (this.pwd2.trim() == '') {
				this.$u.toast('请再次输入密码');
				return false;
			} else if (this.pwd2.trim() != this.pwd1.trim()) {
				this.$u.toast('两次输入密码不一样');
				return false;
			} else if (
				!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(
					this.pwd1.trim()
				)
			) {
				this.$u.toast('请输入由字母、数字、符号组合的密码组合');
				return false;
			}

			return true;
		},
		submit() {
			if (!this.validation()) return;
			if (this.centerTitle == '忘记密码') {
				let data = {
					phone: this.userName,
					password: this.pwd1.replace(/\s+/g, ''),
					vcode: this.vcode
				};
				resetPwdByRemember(data).then(res => {
					this.$u.toast('密码修改成功');
					setTimeout(() => {
						uni.navigateBack({
							delta: 2
						});
					}, 1000);
				});
			}else{
				passwordSet({
					password: this.pwd1.replace(/\s+/g, '')
				}).then(res => {
					this.$u.toast('密码设置成功');
					setTimeout(() => {
						this.$store.commit('logout');
						this.$u.toast('请重新登录');
						
						// 密码修改成功之后，得需要把之前的记住密码去掉
						uni.removeStorageSync('checked')
						uni.removeStorageSync('userName')
						uni.removeStorageSync('pwd')
						uni.setStorageSync("disable", true);
						
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/homePages/index'
							});
						}, 600);
					}, 600);
				});
			}

			

			// if (!this.disable && this.centerTitle == '设置密码') {
			// 	passwordSet({
			// 		password: this.pwd1.replace(/\s+/g, '')
			// 	}).then(res => {
			// 		this.$u.toast('密码设置成功');
			// 		setTimeout(() => {
			// 			this.$store.commit('logout');
			// 			this.$u.toast('请重新登录');
			// 			setTimeout(() => {
			// 				uni.switchTab({
			// 					url: '/pages/homePages/index'
			// 				});
			// 			}, 600);
			// 		}, 600);
			// 	});
			// } else {
			// 	passwordSet({
			// 		password: this.pwd1.replace(/\s+/g, '')
			// 	}).then(res => {
			// 		this.$u.toast('密码设置成功');
			// 		setTimeout(() => {
			// 			this.$store.commit('logout');
			// 			this.$u.toast('请重新登录');
			// 			setTimeout(() => {
			// 				uni.switchTab({
			// 					url: '/pages/homePages/index'
			// 				});
			// 			}, 600);
			// 		}, 600);
			// 	});
			// 	return;

			// 	let data = {
			// 		phone: this.userName,
			// 		password: this.pwd1.replace(/\s+/g, ''),
			// 		vcode: this.vcode
			// 	};
			// 	resetPwdByRemember(data).then(res => {
			// 		this.$u.toast('密码修改成功');
			// 		setTimeout(() => {
			// 			uni.navigateBack({
			// 				delta: 2
			// 			});
			// 		}, 1000);
			// 	});
			// }
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
		margin-top: 20rpx;
		border-bottom: 1rpx solid var(--c-EBEBEB-linecolor3);
		border-radius: 10rpx;
		input {
			font-size: 28rpx;
			line-height: 32rpx;
			color: var(--c-838484-fontcolor6);
			flex: 1;
		}
		text {
			font-size: 28rpx;
			line-height: 28rpx;
			color: var(--c-eddbb3-fontcolor3);
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
