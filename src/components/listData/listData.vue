<template>
	<view class="collection-list" :style="[JSON.parse(themeJson)]">
		<view class="btmImg" v-for="(item,index) in collectList" :key="index" @click="collect(item.id)">
			<view class="collection-img">
				<view style="height: 25rpx;"></view>
				<image :src="item == null? '':item.cover" mode="object-fit: contain"></image>
				<text class="in" v-if="item.status==0">{{ item.statusTxt }}</text>
				<text class="end" v-if="item.status==1"><text
						class="iconfont daojishi">&#xe663;</text>{{ item.statusTxt }}<text>{{ item.startTime }}</text></text>
				<text class="no" v-if="item.status==2">
					<span>{{ item.statusTxt }}</span>
				</text>
			</view>
			<view class="propertyName">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	// import navto from "@/util/pathRouter/uniRouter.js"
	// import countdownTimer from './../countDown/countdown-timer.vue'
	export default {
		props: {
			collectList: {
				type: Array,
				default: () => []
			},
		},
		// components: {
		// 	countdownTimer
		// },
		data() {
			return {
				isOnSale: true,
				getSystemTimestamp: null,
			};
		},
		mounted() {
			var timestamp = Date.parse(new Date());
			this.getSystemTimestamp = timestamp;
		},
		methods: {
			//倒计时结束前端改变销售状态
			finish(i) {
				this.collectList[i].isOnSale = false;
			},
			collect(id) {
				uni.navigateTo({
					url: '/pages/homePages/activityDetail?id=' + id
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	@mixin myMixin1 {
		display: inline-block;
		margin-top: 20rpx;
		position: absolute;
		left: 30rpx;
		color: var(--c-eddbb3-fontcolor3);
		margin-left: 30rpx;
		font-size: 26rpx;
		border-radius: 15rpx;
		padding: 13rpx;
		width: max-content;
	}

	.collection-list {
		// width: 690rpx;
		margin: auto;
		padding: 30rpx;
		font-weight: 400;
		font-family: PingFangSC;
		color: #D3CDC7;
		// background-color: var(--c-232728-bgc);

		.collection-img {
			width: 100%;
			height: 670rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
				position: relative;
			}

			width: 690rpx;
			height: 690rpx;
			border-radius: 20rpx;
			margin:auto;


			.no {
				@include myMixin1;
				background: linear-gradient(90deg, var(--c-bgcportiongradual-h-1) 0%, var(--c-bgcportiongradual-h-2) 100%);
			}

			.in {
				@include myMixin1;
				background: linear-gradient(90deg, var(--c-bgcportiongradual-r-1) 0%, var(--c-bgcportiongradual-r-2) 100%);
			}

			.end {
				@include myMixin1;
				background: linear-gradient(90deg, var(--c-bgcportiongradual-l-1) 0%, var(--c-bgcportiongradual-l-2) 100%);
			}
		}

		.propertyName {
			font-size: 34rpx;
			padding: 40rpx 0;
			margin-left: 20rpx;
			width: 540rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: var(--c-ffffff-fontcolor1);
		}
	}

	.btmImg {
		background: url(@/static/common/bottomImg1.png) no-repeat;
		background-size: 100% auto;
		background-position: 0 100%;
	}

	.iconfont {
		color: var(--c-eddbb3-font);
		padding: 0 10rpx !important;
	}
</style>
