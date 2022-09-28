<template>
	<view class="find tab-bar-height" :style="[JSON.parse(themeJson)]">
		<homeTopBar backIcon="back" titleLocation="center" centerTitle="发现" :isShow="false" />
		<view>
			<image class="find_img" src="../../static/find1.jpg" mode=""></image>
			<view class="find_info">
				<view>
					<image class="find_head" src="../../static/text.png" mode=""></image>
					<image class="find_tag" src="../../static/find2.png" mode=""></image>
					<view class="find_text">
						<text class="iconfont icon">&#xe60c;</text>
						<text class="pl">企业版认证</text>
					</view>
				</view>
				<view class="text-center find_name">剪切机</view>
				<view class="d-flex a-center j-center text-center p-2">
					<view>
						<view class="find_name_text1">作品</view>
						<view class="find_name_text">50</view>
					</view>
					<view class="pl-15">
						<view class="find_name_text1">发行总量</view>
						<view class="find_name_text">50</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="p-3">
					专注于数字作品，连接线下实体，更好的大力发展艺术藏品产业，开辟创新新赛道，让艺术流芳百世
				</view>
			</view>
		</view>
		<view style="height:250rpx"></view>
		<view class="find_commodity">
			<text class="find_title">藏品空间</text>
			<view class="find_bgc"></view>
		</view>
		<view class="px-3">
			<listDataCollect :listData="listData"></listDataCollect>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [{
					name: '可'
				}, {}, {}, {}, {}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.find {
		min-height: calc(100vh - 50px);

		// background-color: var(--c-7A9EFC-bgcportion7);
		.find_img {
			width: 750rpx;
			height: 300rpx;
			position: relative;
		}

		.find_info {
			position: absolute;
			top: 232rpx;
			left: 50rpx;
			width: 650rpx;
			// height: 300rpx;
			border-radius: 20rpx;
			background: linear-gradient(90deg, var(--c-DAE9FF-bgcportiongradual3) 0%, var(--c-E8E4FF-bgcportiongradual4) 100%);

			.find_head {
				position: absolute;
				top: -90rpx;
				left: 260rpx;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: 2px solid var(--c-EBEBEB-linecolor3);
			}

			.find_tag {
				position: absolute;
				top: 20rpx;
				left: 220rpx;
				width: 220rpx;
				height: 39rpx;
			}

			.find_text {
				font-size: 24rpx;
				position: absolute;
				top: 22rpx;
				left: 252rpx;
				color: var(--c-eddbb3-fontcolor3);
				display: flex;
				align-items: center;
			}

			.find_name {
				margin-top: 80rpx;
				font-size: 36rpx;
				font-weight: bold;
				color: var(--c-ffffff-fontcolor1);
			}

			.find_name_text1 {
				color: var(--c-979998-fontcolor2);
			}

			.find_name_text {
				font-size: 40rpx;
				font-weight: bold;
				color: var(--c-ffffff-fontcolor1);
			}

			.line {
				width: 600rpx;
				height: 1px;
				background: var(--c-E0E0E0-linecolor2);
				margin: 10rpx auto;
			}
		}

		.find_commodity {
			padding: 30rpx;

			.find_title {
				position: relative;
				font-size: 38rpx;
				font-weight: bold;
				color: var(--c-ffffff-fontcolor1);
			}

			.find_bgc {
				position: absolute;
				top: 713rpx;
				width: 150rpx;
				height: 16rpx;
				opacity: 0.4;
				border-radius: 30rpx;
				background: linear-gradient(90deg, var(--c-bgcportiongradual-l1-2) 0%, var(--c-eddbb3-fontcolor3) 100%);
			}
		}
	}
</style>
