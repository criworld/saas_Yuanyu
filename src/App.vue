<script>
	export default {
		onLaunch: function() {
			console.log('onLaunch');
		},
		onShow: function() {
			console.log('onShow');
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "@/common/base.scss";
	// @import url("/static/iconfont/iconfont.css");
	// 字体图标
	@import "static/icon/iconfont.css"; //此处路径根据自己的文件结构填写自己的路径

	page {
		height: 100%;
		font-size: 28rpx;
	}

	.tab-bar-height {
		/* #ifdef APP */
		padding-top: 160rpx;
		/* #endif */
		/* #ifdef H5 */
		padding-top: 90rpx;
		/* #endif */
		box-sizing: border-box;
	}

	.uni-tabbar-border {
		// background-color: red !important;
		// display: none;
	}
</style>
