/**
 * 响应拦截
 * @param {Object} http 
 */

module.exports = (vm) => {
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		if (data.code == -1 || data.code == 1423 || data.code == 1424 || data.code == 1425) { // 服务端返回的状态码不等于200，则reject()
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.msg)
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise
				return Promise.reject(data)
			}
		} else if (data.code == -401) {
			vm.$u.toast("登录状态已失效,请重新登录~");
			// 清楚缓存
			uni.removeStorageSync('token')
			setTimeout(() => {
				vm.$u.route('/pages/login/login')
			}, 1000)
		}
		return data.data
	}, (response) => {
		vm.$u.toast("网络丢失");
		/*  对响应错误做点什么 （statusCode !== 200）*/
		return Promise.reject(response)
	})
}
