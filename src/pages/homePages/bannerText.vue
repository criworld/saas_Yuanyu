<template>
	<view class="tab-bar-height">
		<homeTopBar
			backIcon="back"
			titleLocation="center"
			:centerTitle="centerTitle"
		></homeTopBar>
		<u-parse class="u-parses" :content="infoText" :tagStyle="style"></u-parse>
	</view>
</template>

<script>
	import {
		bannerRichText
	} from '@/common/api'
	export default {
		data() {
			return {
				infoText: "",
				centerTitle: "",
				style: {
					// 字符串的形式
					p: 'color: var(--c-979998-fontcolor7);font-size:28rpx',
					img:'width:100%;',
				},
			}
		},
		onLoad(e) {
			bannerRichText(e.id).then(res => {
				this.infoText = res;
			})
		}
	}
</script>

<style scoped>

</style>
