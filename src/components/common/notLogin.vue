<template>
	<view class="notLogin d-flex j-sb a-center" :style="[JSON.parse(themeJson)]" v-if="loginState">
		<view class="notLogin_text">
			登录{{ supplierName }}，开启全新体验
		</view>
		<view class="d-flex">
			<MButton class="goLogin" text="登录" @click.native="goLogin"></MButton>
			<u-icon @click="closeNotLogin" :color="JSON.parse(themeJson).shareColor2" name="close"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			loginState: {
				type: Boolean,
				default: true
			},
			supplierName: {
				type: String,
				default: ""
			}
		},
		data() {
			return {}
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			closeNotLogin() {
				this.loginState = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.notLogin {
		width: 92.5%;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(90deg, var(--c-bgcportiongradual-l-1) 0%, var(--c-bgcportiongradual-l-2) 100%);
		border-radius: 20rpx;
		color: #D3CDC7;
		margin: auto;
		position: fixed;
		padding: 0 30rpx;
		box-sizing: border-box;
		left: 27rpx;
		/* #ifdef APP */
		bottom: 10rpx;
		/* #endif */
		/* #ifdef H5 */
		bottom: 120rpx;
		// ios安全距离
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		/* #endif */
		.notLogin_text {
			color: var(--c-eddbb3-fontcolor3);
		}

		.goLogin {
			width: 100rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			margin-right: 20rpx;
			background-color: var(--c-232728-bgc);
			color: var(--c-609DF8-fontcolor12);
		}
	}
</style>
