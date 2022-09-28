<template>
	<div class="mButton" :class="disable ? 'disable' : ''" v-bind="$attrs">
		{{ text }}
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			text: String,
			disable: {
				type: Boolean,
				default: false,
			},
		},
		mounted() {},
		created() {},
	};
</script>
<style lang="scss" scoped>
	.mButton {
		// margin: auto;
		height: 104rpx;
		line-height: 104rpx;
		border-radius: 22rpx;
		text-align: center;
		font-weight: 600;
		font-size: 36rpx;

		&.disable {
			opacity: 0.5;
		}
	}
</style>
