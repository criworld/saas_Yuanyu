<template>
	<view>
		<view class="new" :style="[JSON.parse(themeJson)]">
			<view class="new_img mx-3 my-5 d-flex" v-for="(val,index) in newList" :key="index" @click="toDetail(val)">
				<view style="width: 250rpx;">
					<image class="img" :src="val.cover" mode=""></image>
					<view class="font d-flex j-center a-center"
						:class="{'new_state':val.activityStatus == '1','new_state1':val.activityStatus == '0','new_state2':val.activityStatus == '2'}">
						<text v-if="val.activityStatus == '0'" class="iconfont daojishi">&#xe663;</text>
						<text v-if="val.activityStatus == '1'" class="iconfont qiandao">&#xe6b8;</text>
						<text v-if="val.activityStatus == '2'" class="iconfont shandian1">&#xe8b8;</text>
						<text>{{ val.activityStatusTxt }}</text>
					</view>
				</view>
				<view class="ml-3" style="flex: 1;">
					<view class="new_text" v-html="highLightTableMsg(val.name, getSearchVal)"></view>
					<view class="mt-2 d-flex">
						<view class="d-flex j-center"
							:class="{'new_type1':val.activityType == '1','new_type2':val.activityType == '3','new_type3':val.activityType == '2'}">
							<text v-if="val.activityType == '3'" class="iconfont icon daojishi">&#xe663;</text>
							<text v-if="val.activityType == '2'" class="iconfont icon gouwuchefill">&#xe73c;</text>
							<text v-if="val.activityType == '1'" class="iconfont icon shandian1">&#xe8c5;</text>
							<view class="new_buy_way d-inline-block">{{ val.activityTypeString }}</view>
						</view>
						<view class="ml-3 d-flex new_buy_b">
							<view class="new_buy_num d-inline-block">限量</view>
							<view class="new_buy_part">{{ val.sumNum }}份</view>
						</view>
					</view>
					<view class="d-flex j-sb mt-8 a-center">
						<view class="renmb">¥<text>{{ val.price }}</text></view>
						<view class="new_btn" >立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			newList: {
				type: Array,
				default: () => []
			},
			getSearchVal: {
				type: String,
				default: ""
			}
		},
		data() {
			return {}
		},
		methods: {
			toDetail(val) {
				if (val.activityType == 3) {
					uni.navigateTo({
						url: '/pages/homePages/seckillTime?alias=' + val.alias
					});
				} else {
					uni.navigateTo({
						url: '/pages/homePages/detailBuy?alias=' + val.alias + '&id=' + val.activityId
					});
				}
			},
			highLightTableMsg(msg, highLightStr) {
				if (msg == null) {
					msg = ''
				}
				if (highLightStr == null) {
					highLightStr = ''
				}
				if (msg instanceof Object) {
					msg = JSON.stringify(msg)
				}
				if (highLightStr instanceof Object) {
					highLightStr = JSON.stringify(highLightStr)
				}
				if (!(msg instanceof String)) {
					msg = msg.toString()
				}
				if (!(highLightStr instanceof String)) {
					highLightStr = highLightStr.toString()
				}
				var htmlStr = ''
				if (highLightStr.length > 0) {
					if (msg.indexOf(highLightStr) !== -1) {
						assemblyStr(msg, highLightStr)
					} else {
						htmlStr = '<span  font-weight: 700;">' + msg + '</span>'
					}
				} else {
					htmlStr = '<span  font-weight: 700;">' + msg + '</span>'
				}

				function assemblyStr(msgAssembly, highLightAssembly) {
					if (msgAssembly.indexOf(highLightAssembly) !== -1) {
						var length = highLightAssembly.length
						var start = msgAssembly.indexOf(highLightAssembly)
						htmlStr = htmlStr + '<span font-weight: 700;">' + msgAssembly.substring(0, start) + '</span>' +
							'<span style="color:#4472FF; font-weight: 700;">' + highLightAssembly + '</span>'
						msgAssembly = msgAssembly.substring(start + length, msgAssembly.length)
						assemblyStr(msgAssembly, highLightAssembly)
					} else {
						htmlStr = htmlStr + '<span  font-weight: 700;">' + msgAssembly + '</span>'
					}
				}
				return htmlStr;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@mixin bgc {
		position: absolute;
		left: 0rpx;
		top: 0rpx;
		width: max-content;
		color: var(--c-eddbb3-fontcolor3);
		border-radius: 30rpx 0 30rpx 0;
		padding: 10rpx 20rpx;
	}

	.new {
		// background-color: var(--c-232728-bgc);
	}

	.new_img {
		position: relative;
		width: 690rpx;
		.img {
			width: 244rpx;
			height: 244rpx;
			border-radius: 30rpx;
		}

		.new_state {
			@include bgc;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-l-1) 0%, var(--c-bgcportiongradual-l-2) 100%);

		}

		.new_state1 {
			@include bgc;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-r-1) 0%, var(--c-bgcportiongradual-r-2) 100%);

		}

		.new_state2 {
			@include bgc;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-h-1) 0%, var(--c-bgcportiongradual-h-2) 100%);
		}

		.new_text {
			color: var(--c-ffffff-fontcolor1);
			font-size: 32rpx;
		}

		@mixin new_buy {
			width: max-content;
			font-size: 24rpx;
			padding: 5rpx 15rpx;
		}

		.new_buy_way {
			width: max-content;
			font-size: 24rpx;
			padding: 5rpx 12rpx 0 0;
			// background-color: var(--c-eddbb3-btc);
			color: var(--c-eddbb3-fontcolor3);
		}

		.new_buy_num {
			width: max-content;
			font-size: 24rpx;
			border-radius: 5rpx 0 0 5rpx;
			padding: 5rpx;
			color: var(--c-232728-fontcolor4);
		}

		.new_buy_part {
			width: max-content;
			font-size: 24rpx;
			border-radius: 0 5rpx 5rpx 0;
			padding: 5rpx;
			// background-color: var(--c-3a3a3b-fontcolor8);
			color: var(--c-609DF8-fontcolor12);
		}

		.renmb {
			color: var(--c-ffffff-fontcolor1);
			font-size: 32rpx;
			text{
				margin-left: 3rpx;
				font-size: 42rpx;
				font-weight: bold;
			}
		}

		.new_buy_b {
			padding: 0 10rpx;
			border-radius: 10rpx;
			border: 1rpx var(--c-E0E0E0-linecolor2) solid;
		}

		.new_type1 {
			border-radius: 10rpx;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-l1-1) 0%, var(--c-bgcportiongradual-l1-2) 100%);
		}

		.new_type2 {
			border-radius: 10rpx;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-h1-1) 0%, var(--c-bgcportiongradual-h1-2) 100%);
		}

		.new_type3 {
			border-radius: 10rpx;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-z1-1) 0%, var(--c-bgcportiongradual-z1-2) 100%);
		}

		.new_btn {
			width: max-content;
			font-size: 24rpx;
			padding: 10rpx 28rpx;
			background: linear-gradient(90deg, var(--c-bgcportiongradual-l-1) 0%, var(--c-bgcportiongradual-l-2) 100%);
			color: var(--c-eddbb3-fontcolor3);
			border-radius: 15rpx;
			font-size: 28rpx;
		}
	}

	.iconfont {
		color: var(--c-eddbb3-font);
		margin-right: 10rpx;
	}

	.icon {
		margin-right: 0rpx;
		// background-color: var(--c-3a3a3b-fontcolor8);
		padding-top: 6rpx;
		padding-left: 8rpx;
		padding-right: 2rpx;
		border-radius: 5rpx 0 0 5rpx;
	}
</style>
