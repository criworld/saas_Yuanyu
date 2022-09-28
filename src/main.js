import App from './App'

import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import {
	publisherId
} from "@/json/publisherId.json"

import store from '@/store'
// 引入uView提供的对vuex的简写法文件 
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

import {
	baseUrl
} from '@/common/config.js'

uni.request({
	url: `${baseUrl}/developer/admin/page/frontTheme`,
	data: {
		publishId: publisherId
	},
	success: (res) => {
		let themeJson = res.data.data.theme;
		Vue.prototype.themeJson = themeJson;
		const app = new Vue({
			store,
			...App
		})
		// 引入请求封装
		require('./utils/request/index')(app)
		app.$mount()
		
		// #ifdef VUE3
		import {
			createSSRApp
		} from 'vue'
		export function createApp() {
			const app = createSSRApp(App)
			return {
				app
			}
		}
		// #endif
		uni.setTabBarStyle({
			backgroundColor: JSON.parse(themeJson).tabbarSelColor,
			color: JSON.parse(themeJson).color,
			selectedColor: JSON.parse(themeJson).selectedColor
		})
	}
});
// import themeJson from 'json/theme.json'

// Vue.prototype.themeJson = JSON.stringify(themeJson);


import uView from 'uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'