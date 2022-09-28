<template>
	<view class="con px-3 tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar backIcon="close" titleLocation="center" :centerTitle="centerTitle"></homeTopBar>
		<view style="height:80rpx"></view>
		<view class="item">
			<view class="text">向+86{{ipone}}发送验证码</view>
		</view>
		<view class="item"  style="margin-top:60rpx">
			<view class="text">验证码</view>
			<view class="input py-3 d-flex flex-row a-center j-sb">
				<input
					type="number"
					maxlength="6"
					v-model="vcode"
					placeholder="请输入验证码"
				/>
				<text @click="sendCode" v-if="!timeout">{{ codeTxt }}</text>
			</view>
		</view>
		

		<MButton
			:disable="disable"
			class="loginBtn"
			text="确认注销"
			@click.native="submit"
		></MButton>
		
	</view>
</template>

<script>
import { resetPasswordVcode } from '@/common/api.js';//换成注销账号的接口
export default {
	data() {
		return {
			centerTitle:"",
			codeTxt:'获取验证码',
			timeout:0,
			vcode:'',
			disable:true,
			ipone:''
		};
	},
	computed: {
		dateRange() {
			const { vcode } = this;
			return {
				vcode
			};
		}
	},
	watch: {
		dateRange: {
			handler() {
				if (this.vcode && this.vcode.trim()) {
					this.disable = false;
				} else {
					this.disable = true;
				}
			},
			deep: true
		}
	},
	
	onLoad(e) {
		this.centerTitle = e.name
		this.ipone = e.ipone
	},
	methods: {
		sendCode(){
			resetPasswordVcode().then(res => {
				this.$u.toast('验证码获取成功');
				this.startTimer();
			});
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
			if (this.vcode.trim() == '') {
				this.$u.toast('请输入验证码');
				return false;
			}
			return true;
		},
		submit() {
			if (!this.validation()) return;
			let _this = this;
			this.$store.commit('logout');
			this.$u.toast('注销成功');
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/mine/index'
				});
			}, 600);
			
		},
	}
};
</script>

<style lang="scss" scoped>
.con {
	height: calc(100vh);
	background-color: var(--c-232728-bgc);
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
		text {
			line-height: 26rpx;
			text-align: center;
			color: var(--c-ffffff-fontcolor1);
			font-size: 10px;
		}
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
