<template>
	<view :style="[JSON.parse(themeJson)]">
		<u-popup :show="show" @close="close" @open="open" mode="center" :closeOnClickOverlay="false">
			<view class="version">
				<view class="bg" :style="{backgroundImage: `url(${JSON.parse(this.themeJson).appUpdateImg})`}"></view>
				<view class="close">
					<!-- <view></view>
					<view @click="close">
						<text class="iconfont icon-guanbi"></text>
					</view> -->
				</view>
				<view class="tip">
					<text :class="isShow?'zhuan':'nozhuan'" class="iconfont icon-xuanzhuan"></text>
					<text>版本更新</text>
					<text>发现新版本v{{appVersion}}，升级后体验更顺畅</text>
					<button @click="upgrade()">立即升级</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			appVersion: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				isShow: false,
			}
		},
		methods: {
			close() {
				this.$emit('close')
			},
			open() {},
			upgrade() {
				this.isShow = true
				this.$emit('upgrade')
			}
		}
	};
</script>

<style lang="scss" scoped>
	::v-deep.version {
		border-radius: 22rpx;
		background-color: var(--c-232728-bgc);
		position: relative;
		width: 581rpx;
		padding-bottom: 40rpx;

		.bg {
			position: absolute;
			top: -40rpx;
			width: 581rpx;
			height: 496rpx;
			background-size: 581rpx 496rpx;
		}

		.close {
			margin: 0 19rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			view {
				.closeimg {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}

		.tip {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-top: 280rpx;
			padding: 0 20rpx;
			box-sizing: border-box;

			@keyframes round_animate {
				to {
					transform: rotate(1turn);
				}
			}

			.nozhuan {
				// width: 51rpx;
				// height: 51rpx;
				// background: url("/static/mine/zhuan.png") no-repeat center center;
				// background-size: contain;
			}

			.zhuan {
				// width: 51rpx;
				// height: 51rpx;
				// background: url("/static/mine/zhuan.png") no-repeat center center;
				// background-size: contain;
				-webkit-animation: round_animate 2s linear infinite;
				animation: round_animate 2s linear infinite;
			}

			text:nth-of-type(1) {
				margin-top: 39rpx;
				font-size: 32rpx;
				font-weight: 600;
				// color: #D3CDC7;
				color: var(--c-ffffff-fontcolor1);
				line-height: 48rpx;
			}

			text:nth-of-type(2) {
				margin-top: 26rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: var(--c-ffffff-fontcolor1);
				line-height: 48rpx;
			}

			button {
				margin-top: 68rpx;
				width: 460rpx;
				height: 88rpx;
				background: linear-gradient(90deg, var(--c-7A9EFC-bgcportiongradual1) 0%, var(--c-5A9AF8-bgcportiongradual2) 100%);
				border-radius: 22rpx;
				font-size: 36rpx;
				font-weight: 600;
				color: var(--c-eddbb3-fontcolor3);
				line-height: 88rpx;
			}
		}

		.iconfont {
			font-size: 45rpx !important;
			color: var(--c-ffffff-fontcolor1) !important;
		}
	}
</style>
