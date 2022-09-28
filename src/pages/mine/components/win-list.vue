<template>
	<view>
		<view class="winlist">
			<view
				class="item p-3 d-flex flex-row j-sb a-center"
				v-for="(item, index) in list"
				:key="index"
				@click="to(item)"
			>
				<view class="left">
					<image
						class=""
						:src="item.icon"
						mode="widthfix"
						lazy-load="false"
						binderror=""
						bindload=""
					></image>
				</view>
				<view class="right flex-1">
					<view class="name d-flex flex-row j-sb a-center">
						<text class="text4">{{ item.name }}</text>
						<text class="text1" v-if="item.award == 0">待公布</text>
						<text class="text2" v-if="item.award == 1">已中签</text>
						<text class="text3" v-if="item.award == 2">未中签</text>
					</view>
					<view class="time my-2">
						认购时间：{{ item.createdAt }}
					</view>
					<view class="num">
						<text>认购数量：{{ item.buyNum }}份</text>
						<text style="margin-left:50rpx" v-if="item.award == 1">中签数量：{{item.awardNum}}份</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {}
	},
	methods: {
		to(item){
			this.$emit('onchange',item)
		}
	}
};
</script>

<style lang="scss" scoped>
.winlist {
	.item {
		.left {
			width: 150rpx;
			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}
		}
		.right {
			margin-left: 30rpx;
			.name {
				.text4 {
					font-size: 34rpx;
					letter-spacing: 0.5px;
					font-weight: 600;
					color: var(--c-ffffff-fontcolor1);
				}
				.text1 {
					font-size: 24rpx;
					letter-spacing: -0.05px;
					color: var(--c-609DF8-fontcolor12);
				}
				.text2 {
					font-size: 24rpx;
					letter-spacing: -0.05px;
					color: var(--c-bgcportiongradual-h1-2);
				}
				.text3 {
					font-size: 24rpx;
					letter-spacing: -0.05px;
					color: var(--c-979998-fontcolor2);
				}
			}
			.time {
				font-size: 22rpx;
				color: var(--c-ffffff-fontcolor1);
			}
			.num {
				text{
					font-size: 22rpx;
					color: var(--c-888888-bgcportion6);
				}
			}
		}
	}
}
</style>
