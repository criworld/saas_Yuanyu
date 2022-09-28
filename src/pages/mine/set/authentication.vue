<template>
	<view class="con tab-bar-height" :style="[JSON.parse(themeJson),bgImg]">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<view style="height:100rpx"></view>
		<view class="title mx-3">真实姓名</view>
		<view class="box mx-3 p-2">
			<input
				type="text"
				maxlength="12"
				placeholder="请输入真实姓名"
				v-model="form.realName"
				@input="fpNumInput"
			/>
		</view>
		<!-- <text class="mx-3">最多可输入12个字符</text> -->
		<view style="height:50rpx"></view>
		<view class="title mx-3">身份证号</view>
		<view class="box mx-3 p-2">
			<input
				type="text"
				maxlength="19"
				placeholder="请输入身份证号"
				v-model="form.idCardNo"
				@input="fpNumInputId"
			/>
		</view>
		<!-- <text class="mx-3">最多可输入12个字符</text> -->
		<view style="height:300rpx"></view>
		<MButton
			class="mx-3 text-center btn"
			:disable="disable"
			text="确定"
			@click.native="submit"
		></MButton>
	</view>
</template>

<script>
import { authentication } from '@/common/api.js';
export default {
	data() {
		return {
			centerTitle: '实名认证',
			disable: true,
			form: {
				realName: '',
				idCardNo: ''
			},
			bgImg:{
				backgroundImage: `url(${JSON.parse(this.themeJson).allImg1})`
			},
		};
	},
	computed: {
		dateRange() {
			const { realName, idCardNo } = this.form;
			return {
				realName,
				idCardNo
			};
		}
	},
	watch: {
		dateRange: {
			handler() {
				if (this.form.realName.trim() && this.form.idCardNo.trim()) {
					this.disable = false;
				} else {
					this.disable = true;
				}
			},
			deep: true
		}
	},
	methods: {
		submit() {
			if (!this.validation()) return;
		},
		
		fpNumInput(e) {
			const o = e.target;
			const inputRule =/[^\u4E00-\u9FA5]/g //只能输入中文
			this.$nextTick(function() {
				this.form.realName = o.value.replace(inputRule , '');
			})
         },
		 fpNumInputId(e){
			const o = e.target;
            const inputRule =/[\W]/g //只能输入数字+字母
			this.$nextTick(function() {
				this.form.idCardNo = o.value.replace(inputRule , '');
			}) 
		 },
		validation() {
			//非空
			if (this.form.realName.trim() == '') {
				this.$u.toast('请输入真实姓名');
				return false;
			} else if (this.form.idCardNo.trim() == '') {
				this.$u.toast('请输入您的身份证号');
				return false;
			} else if (!this.getCardTypeNumber(this.form.idCardNo)) {
				return false;
			}
			return true;
		},
		getCardTypeNumber(value) {
			const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			if (reg.test(value) === false && value) {
				this.$u.toast('请输入正确格式的身份证号码');
			} else {
				this.loginTip();
			}
		},
		loginTip() {
			let data = {
				idCardNo: this.form.idCardNo,
				realName: this.form.realName.replace(/\s+/g, '')
			};
			authentication(data).then(res => {
				this.$u.toast('认证成功');
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
	width: 750rpx;
	height: 100vh;
	background-size: 750rpx 100vh;
}
.title {
	font-weight: 500;
	font-size: 28rpx;
	color: var(--c-ffffff-fontcolor1);
}
.box {
	border-bottom: 1rpx solid var(--c-EBEBEB-linecolor3);
	border-radius: 10rpx;
	margin-top: 30rpx;
	input {
		font-size: 30rpx;
		color: var(--c-979998-fontcolor2);
	}
}
text {
	font-size: 20rpx;
	line-height: 38rpx;
	color: var(--c-979998-fontcolor2);
}
.btn{
	background:var(--c-7A9EFC-bgcportion7);
	color: var(--c-eddbb3-fontcolor3);
}
</style>
