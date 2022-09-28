<template>
	<view class="con px-3 tab-bar-height" :style="[JSON.parse(themeJson),bgImg]">
		<homeTopBar backIcon="close" titleLocation="center" :centerTitle="centerTitle"></homeTopBar>
		<view style="height:80rpx"></view>
		<view class="logo d-flex j-center">
			<image mode="" :src="JSON.parse(themeJson).logo" ></image>
		</view>
		<view style="height:40rpx"></view>
		<view class="tips" v-if="!show">未注册手机验证后即完成注册</view>
		<view class=" d-flex flex-row a-center">
			<view class="loginType"  :class="show?'':'ishow'"  @click="switchPwd">
				验证码登录
			</view>
			<view class="loginType"  :class="!show?'':'ishow'" style="margin-left:60rpx;" @click="switchPwd">
				密码登录
			</view>
			
		</view>
		<view class="item" style="margin-top:50rpx">
			<!-- <view class="text">手机号</view> -->
			<view class="input py-3">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<text class="iconfont icon-shouji icon-text"></text>
					<input
						type="number"
						v-model="userName"
						maxlength="11"
						placeholder="请输入手机号"
						@blur="blurIpone"
						@input="inputIpone"
					/>
				</view>
				<view v-if="iponeShow" @click="closeuserName">
					<text class="iconfont icon-guanbi2fill icon-text"></text>
				</view>
			</view>
		</view>
		<view class="item" v-if="!show" style="margin-top:40rpx">
			<!-- <view class="text">验证码</view> -->
			<view class="input py-3 d-flex flex-row a-center j-sb">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<text class="iconfont icon-yanzhengma-cuxiantiao icon-text"></text>
					<input
						type="number"
						maxlength="6"
						v-model="vcode"
						placeholder="请输入验证码"
					/>
				</view>
				<text @click="sendCode" v-if="!timeout">{{ codeTxt }}</text>
				<text v-else>{{ timeout }}s后重新获取</text>
			</view>
		</view>
		<view class="item" v-if="show" style="margin-top:40rpx">
			<!-- <view class="text">密码</view> -->
			<view class="input py-3 d-flex flex-row a-center j-sb">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<text class="iconfont icon-weibiaoti-- icon-text"></text>
					<input
						@input="inputPwd"
						type="number"
						maxlength="20"
						password
						placeholder="请输入密码"
						v-model="pwd"
						onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"	
					/>
				</view>
				<view v-if="pwdShow" @click="closepwd">
					<text class="iconfont icon-guanbi2fill icon-text"></text>
				</view>
			</view>
		</view>

		

		<view v-if="show" class="agree1 d-flex flex-row a-center j-sb">
			<view class="d-flex flex-row a-center">
				<view
					class="choice"
					v-if="!radioShow_code"
					@click="checChange"
				></view>
				<view
					class="choice d-flex"
					v-if="radioShow_code"
					@click="checChange"
				>
					<text class="iconfont icon-duigou"></text>
				</view>
				<text class="remember">记住密码</text>
			</view>
			<view
				class="d-flex flex-row a-center forget"
				@click="toPageForget()"
			>
				忘记密码？
			</view>
		</view>

		<MButton
			:disable="disable"
			class="loginBtn"
			text="登录"
			@click.native="login"
		></MButton>
		<!-- <view class="loginType text-center" v-if="!show" @click="switchPwd">
			账号密码登录
		</view>
		<view class="loginType text-center" v-if="show" @click="switchPwd">
			手机验证码登录
		</view> -->
		
		<view v-if="!show" class="agree d-flex flex-row a-center">
			<view
				class="choice"
				v-if="!radioShow"
				@click="radioShowClick"
			></view>
			<view
				class="choice d-flex"
				v-if="radioShow"
				@click="radioShowClick"
			>
				<text class="iconfont icon-duigou"></text>
			</view>
			<view class="xieyi">
				阅读且同意
				<text @click="toPage('/pages/mine/agreement?name=' +  '用户协议' + '&type=1')">《{{JSON.parse(themeJson).supplierName}}用户协议》</text>
				<text @click="toPage('/pages/mine/agreement?name=' +  '隐私政策' + '&type=2')">《{{JSON.parse(themeJson).supplierName}}隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
import { userLogin, getRegCode,getUserInfo } from '@/common/api';
export default {
	data() {
		return {
			disable: true,
			show: false, //展示是密码登录还是验证码登录
			userName: '', //手机号
			radioShow: false,
			vcode: '', //验证码
			timeout: 0, //倒计时秒数
			intervalFlag: null,
			codeTxt: '获取验证码',
			pwd: "",//密码
			radioShow_code: false,
			redirect: "/",
			centerTitle:"手机验证码登录",
			iponeShow:false,
			pwdShow:false,
			bgImg:{
				backgroundImage: `url(${JSON.parse(this.themeJson).allImg2})`
			},
		};
	},
	computed: {
	  dateRange() {
	    const { userName, vcode, radioShow } = this;
	    return {
	      userName,
	      vcode,
	      radioShow,
	    };
	  },
	  //手机号+密码
	  dateRange_pwd() {
	    const { userName, pwd, radioShow_code } = this;
	    return {
	      userName,
	      pwd,
	      radioShow_code,
	    };
	  },
	},
	watch: {
	  dateRange_pwd: {
	    handler() {
	      if (
	        this.userName &&
	        this.userName.trim() &&
	        this.pwd &&
	        this.pwd.trim()
	      ) {
	        this.disable = false;
	      } else {
	        this.disable = true;
	      }
	    },
	  },
	
	  dateRange: {
	    handler() {
	      if (
	        this.userName &&
	        this.userName.trim() &&
	        this.vcode &&
	        this.vcode.trim() &&
	        this.radioShow
	      ) {
	        this.disable = false;
	      } else {
	        this.disable = true;
	      }
	    },
	    deep: true,
	  },
	},
	onLoad(opt) {
		this.initData(opt)
		let {
			redirect,
			code,
			state,
			phone
		} = opt
		this.redirect = redirect || "/";
	},
	methods: {
		inputIpone(){
			this.iponeShow = true
		},
		inputPwd(){
			this.pwdShow = true
		},
		closeuserName(){
			this.userName = ''
		},
		closepwd(){
			this.pwd = ''
		},
		blurIpone(){
			if(this.userName.length>1){
				if(!(/^1[3456789]\d{9}$/.test(this.userName.trim()))){
					uni.showToast({
						title:'手机号格式错误',
						icon:'none'
					})
					return false;
				}
				
				// if(!(/^\d+$|^\d+[.]?\d+$/.test(this.userName.trim()))){
				// 	uni.showToast({
				// 		title:'只能输入数字',
				// 		icon:'none'
				// 	})
				// 	return
				// }
				
				
				 // /^\d+$|^\d+[.]?\d+$/;
			}
		},
		// 记住密码
		checChange() {
			this.radioShow_code = !this.radioShow_code
			if (this.radioShow_code) {
				uni.setStorageSync('checked', true);
				uni.setStorageSync('userName', this.userName);
				uni.setStorageSync('pwd', this.pwd);
				uni.setStorageSync("disable", false);
			} else {
				uni.removeStorageSync('checked')
				uni.removeStorageSync('userName')
				uni.removeStorageSync('pwd')
				uni.setStorageSync("disable", true);
			}
		},
		toPageForget(){
			if(this.userName.length == 11){
				uni.navigateTo({
					url:'/pages/login/forgotPwd?userName=' + this.userName,
					animationDuration:0
				})
			}else{
				uni.navigateTo({
					url:'/pages/login/forgotPwd',
					animationDuration:0
				})
			}
			
		},
		initData(opt) {
			let that = this;
			let chec = Boolean(uni.getStorageSync('checked'))
			let phone = opt.phone
			let password = opt.password
			if (chec) {
				that.radioShow_code = Boolean(uni.getStorageSync('checked'))
				that.userName = uni.getStorageSync('userName')
				that.pwd = uni.getStorageSync('pwd')
			}
			if (phone && password) {
				that.userName = phone
				that.pwd = password
			}
		},
		// 协议跳转
		toPage(url){
			uni.navigateTo({
				url:url,
				animationDuration:0
			})
		},
		// 登录按钮
		login() {
			if (this.show == true) {
				if (!this.validate()) return;
				let params = {
					phone: this.userName,
					password: this.pwd.replace(/\s+/g, ''),
					inviterCode: this.vcode
				};
				userLogin(params).then(res => {
					if (this.pwd.length <= 6) {
						uni.showToast({
							title: '当前账户登录密码过于简单，请尽快修改密码',
							icon: 'none'
						});
					} else {
					    uni.showToast({
					    	title: '登录成功',
					    	icon: 'none'
					    });
					}
					setTimeout(() => {
					    this.$store.commit("getUserToken", res.token);
					    this.getUserInfoAll();
					    uni.navigateBack()
					}, 1000)
					
				});
			} else {
				if (!this.validate_pwd()) return;
				let params = {
					code: this.vcode,
					phone: this.userName,
					// inviterCode: this.vcode
				};
				userLogin(params).then(res => {
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
					this.$store.commit("getUserToken", res.token);
					this.getUserInfoAll();
					uni.navigateBack()
				});
			}
		},
		getUserInfoAll() {
			getUserInfo().then(res => {
				this.$store.commit('getUserInfo', res);
			})
		},
		validate() {
			//非空
			if (this.userName.trim() == "") {
				uni.showToast({
					title:'请输入手机号',
					icon:'none'
				})
				return false;
			}else if (this.pwd.trim() == "") {
				uni.showToast({
					title:'请输入密码',
					icon:'none'
				})
				return false;
			} else if (this.pwd.trim().length < 6) {
				uni.showToast({
					title:'密码不能小于6位',
					icon:'none'
				})
				return false;
			} else if (!(/^1[3456789]\d{9}$/.test(this.userName.trim()))) {
				uni.showToast({
					title:'手机号格式错误',
					icon:'none'
				})
		        return false;
		    }
			return true;
		},
		validate_pwd() {
			//非空
			if (this.userName.trim() == "") {
				this.$u.toast("请输入手机号");
				return false;
			} else if (!(/^1[3456789]\d{9}$/.test(this.userName.trim()))) {
				this.$u.toast("手机号格式错误");
				return false;
			} else if (this.vcode.trim() == "") {
				this.$u.toast("请输入验证码");
				return false;
			} else if (!this.radioShow) {
				this.$u.toast("请阅读并勾选页面协议");
				return false;
			}
		
			return true;
		},
		switchPwd() {
			this.show = !this.show;
			if(this.show == false){
				this.centerTitle = '手机验证码登录'
				this.disable = true;
			}else{
				this.centerTitle = '账号密码登录'
				this.disable = Boolean(uni.getStorageSync("disable"));
			}
		},
		toPage(e) {
			uni.navigateTo({
				url: e,
				animationDuration: 0
			});
		},
		radioShowClick() {
			this.radioShow = !this.radioShow;
		},
		// 获取验证码
		sendCode() {
			if (this.userName) {
				if (!/^1[3456789]\d{9}$/.test(this.userName.trim())) {
					uni.showToast({
						title: '手机号格式错误',
						icon: 'none'
					});
					return false;
				}
				getRegCode({ phone: this.userName }).then(res => {
					uni.showToast({
						title: '验证码获取成功',
						icon: 'none'
					});
					this.startTimer();
				});
			} else {
				uni.showToast({
					title: '请填写手机号',
					icon: 'none'
				});
			}
		},
		// 倒计时事件
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
.logo{
	image{
		width:284rpx;
		height:70rpx;
	}
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
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid var(--c-EBEBEB-linecolor3);
		input {
			font-size: 28rpx;
			line-height: 32rpx;
			color: var(--c-838484-fontcolor6);
		}
		
		.icon-text{
			margin-right:10rpx;
			font-size: 32rpx;
			color: var(--c-232728-fontcolor4);
		}
		text {
			font-size: 28rpx;
			line-height: 28rpx;
			color: var(--c-609DF8-fontcolor12);
		}
	}
}
.agree1{
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
		color: var(--c-609DF8-fontcolor12);
	}
	.xieyi {
		margin-left: 30rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		color: var(--c-979998-fontcolor2);
		text {
			color: var(--c-609DF8-fontcolor12);
		}
	}
}
.agree {
	position:fixed;
	bottom:137rpx;
	left:30rpx;
	z-index:1;
	// margin-top: 30rpx;
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
		color: var(--c-609DF8-fontcolor12);
	}
	.xieyi {
		margin-left: 30rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		color: var(--c-979998-fontcolor2);
		text {
			color: var(--c-609DF8-fontcolor12);
		}
	}
}
.loginBtn {
	margin-top: 250rpx;
	background: linear-gradient(90deg, var(--c-7A9EFC-bgcportiongradual1) 0%, var(--c-5A9AF8-bgcportiongradual2) 100%);
	color: var(--c-ffffff-fontcolor11);
}
.loginType {
	margin-top: 40rpx;
	font-size: 28rpx;
	line-height: 32rpx;
	color: var(--c-838484-fontcolor6);
}
.ishow{
	font-size: 40rpx;
	font-weight: 500;
	color: var(--c-ffffff-fontcolor1);
}
</style>
