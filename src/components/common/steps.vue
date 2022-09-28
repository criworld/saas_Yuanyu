<template>
	<view class="steps">
		<view class="d-flex a-center" v-for="(item,index) in stepsState" :key="index">
			<view class="step1-line" :class="{'cutLine':index == 1,'cutLine1':index == 2,'cutLine2':index == 3}"
				v-if="index != 0"></view>
			<view :class="{'stepNum':index == 0,'stepNum1':index == 1,'stepNum2':index == 2,'stepNum3':index == 3}" cla>
				{{ index+1 }}
			</view>
			<view class="step1">
				<view class="step1Test">
					<view class="text-light-content">
						<!-- <text v-if="index == 0" class="iconfont qiandao">&#xe6b8;</text>
						<text v-if="index == 1" class="iconfont daojishi1">&#xe77e;</text>
						<text v-if="index == 2" class="iconfont shijian">&#xe8b8;</text>
						<text v-if="index == 3" class="iconfont rmb">&#xe61b;</text> -->
						<view class="txt">
							{{ item.txt }}
						</view>
						<view class="">
							{{item.timeStr}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			stepsState: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				getNewList: []
			}
		},
		created() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	@mixin myMixin1 {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		color: var(--c-eddbb3-fontcolor3);
		font-weight: bold;
		border-radius: 50rpx;
		border: 5px var(--c-EBEBEB-linecolor3) solid;
	}

	.stepNum {
		@include myMixin1;
		background-color: var(--c-7A9EFC-bgcportion7);
	}

	.stepNum1 {
		@include myMixin1;
		background-color: var(--c-bgcportiongradual-z1-1);
	}

	.stepNum2 {
		@include myMixin1;
		background-color: var(--c-bgcportiongradual-z1-2);
	}

	.stepNum3 {
		@include myMixin1;
		background-color: var(--c-bgcportiongradual-r-2);
	}

	// .myMixin2 {
	// 	background-color: #E8C59D;
	// 	text-align: center;
	// 	border: 2px solid #724914;
	// }

	// .myMixin4 {
	// 	text-align: center;
	// 	border: 2px solid #2e2d2e;
	// }

	// .myMixin3 {
	// 	border: 2px solid #2e2d2e;
	// 	text-align: center;
	// }

	// .cutLine1 {
	// 	background-color: #2e2d2e;
	// }

	.cutLine {
		background: linear-gradient(90deg, var(--c-5A9AF8-bgcportiongradual2) 0%, var(--c-bgcportiongradual-z1-1) 100%);
		border-top: 5px var(--c-EBEBEB-linecolor3) solid;
		border-bottom: 5px var(--c-EBEBEB-linecolor3) solid;
	}

	.cutLine1 {
		background: linear-gradient(90deg, var(--c-bgcportiongradual-z1-1) 0%, var(--c-bgcportiongradual-z1-2) 100%);
		border-top: 5px var(--c-EBEBEB-linecolor3) solid;
		border-bottom: 5px var(--c-EBEBEB-linecolor3) solid;
	}

	.cutLine2 {
		background: linear-gradient(90deg, var(--c-bgcportiongradual-z1-2) 0%, var(--c-bgcportiongradual-r-2) 100%);
		border-top: 5px var(--c-EBEBEB-linecolor3) solid;
		border-bottom: 5px var(--c-EBEBEB-linecolor3) solid;
	}

	.steps {
		display: flex;
		justify-content: center;
		align-items: center;
		// margin-bottom: 80rpx;

		.step1 {
			// @include myMixin1;
			position: relative;

			.step1Test {
				width: 130rpx;
				position: absolute;
				left: -100rpx;
				bottom: -185rpx;
				margin-right: 20rpx;
				border-radius: 20rpx;
				text-align: center;
				padding: 20rpx 15rpx;

				.txt {
					color: var(--c-ffffff-fontcolor1);
				}
			}
		}

		.step1-line {
			box-sizing: border-box;
			width: 140rpx;
			// padding: 0 20rpx;
			height: 32rpx;
		}

		.step2 {
			// @include myMixin1;
			position: relative;
		}
	}

	.iconfont {
		font-size: 46rpx;
	}
</style>
