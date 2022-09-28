<template>
	<view @longtap="longtap" style="position: relative">
		<l-painter ref="painter" :isCanvasToTempFilePath="isCanvasToTempFilePath" @progress="progress"
			@success="successPath" :css="cssBgc">
			<l-painter-image :src="activityDetailObj.coverImgUrl" object-fit="contain"
				css="position:relative;top:0;left:0;width:650rpx;height:550rpx;border-radius: 15rpx;"></l-painter-image>
			<l-painter-view css="padding:30rpx;width: 650rpx;">
				<l-painter-image :src="info.avatar" object-fit="contain"
					css="width:50rpx;height:50rpx;border-radius: 50%;margin-right:15rpx;">
				</l-painter-image>
				<l-painter-text :text="info.phone+'分享了一个'+'('+activityDetailObj.name+')'"
					css="color: rgba(255,255,255,.7); font-size: 24rpx;height:50rpx;line-height:50rpx" />
				<l-painter-view css="display:flex;padding-top:30rpx">
					<l-painter-view css="width:430rpx;">
						<l-painter-text :text="activityDetailObj.name" :css="cssName">
						</l-painter-text>
						<!-- <l-painter-text text="#4298" css="display:block;padding-top:10rpx"></l-painter-text> -->
						<l-painter-text v-if="activityDetailObj.type != 'card'" :text="'¥'+activityDetailObj.priceYuan"
							:css="cssPrice">
						</l-painter-text>
						<l-painter-text v-if="activityDetailObj.type == 'card'"
							:text="'#'+activityDetailObj.assetNo+'/'+activityDetailObj.assetSum" :css="cssPrice">
						</l-painter-text>
					</l-painter-view>
					<l-painter-qrcode :text="codeUrl"
						css="width: 90px;  height: 90px;border-radius: 15rpx;margin-top:15rpx;margin-left:-45rpx;background:#ffffff;padding:10rpx;" />
				</l-painter-view>
			</l-painter-view>
			<l-painter-text text="长按图片保存到相册" :css="cssSaveImg"></l-painter-text>
		</l-painter>
		<text class="iconfont guanbi" @click="closeCanvas">&#xeaf2;</text>
		<u-overlay :show="show">
			<view class="warp">
				<view class="rect">
					<u-loading-icon text="海报生成中..." mode="semicircle" :duration="duration"></u-loading-icon>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '@/common/api';
	export default {
		props: {
			activityDetailObj: {
				type: Object,
				default: () => {}
			},
			codeUrl: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				isCanvasToTempFilePath: false,
				show: true,
				info: {},
				cssName: '',
				cssPrice: '',
				cssSaveImg: '',
				cssBgc: '',
				duration: null,
			}
		},
		created() {
			let theme = JSON.parse(this.themeJson);
			this.cssName = `color:${theme.shareColor1};font-size: 32rpx;display:block`;
			this.cssPrice = `color:${theme.shareColor1};font-size: 32rpx;display:block`;
			this.cssSaveImg = `color:${theme.shareColor1};width:600rpx;text-align: center;padding:30rpx 0`;
			this.cssBgc = `background:${theme.backColor1};width: 650rpx;border-radius: 15rpx;`;
			getUserInfo().then(res => {
				this.info = res
			});
		},
		methods: {
			successPath(e) {
				console.log(e);
			},
			progress(e) {
				this.duration = e * 1000;
				if (e == 1) this.show = false;
			},
			closeCanvas() {
				this.$emit('closeCanvas');
			},
			
			longtap() {
				let that = this;
				that.$refs.painter.canvasToTempFilePathSync({
					fileType: "jpg",
					// 如果返回的是base64是无法使用 saveImageToPhotosAlbum，需要设置 pathType为url
					pathType: 'url',
					quality: 1,
					success: (res) => {
						// #ifdef APP
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								that.$u.toast("海报已保存至相册～");
							}
						});
						// #endif  
						// #ifdef H5
						let oA = document.createElement("a");
						oA.download = ''; // 设置下载的文件名，默认是'下载'
						oA.href = res.tempFilePath;
						document.body.appendChild(oA);
						oA.click();
						oA.remove(); // 下载之后把创建的元素删除
						// #endif
					},
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.guanbi {
		font-size: 45rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		color: var(--c-eddbb3-font);
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	
	.rect {}
</style>
