const {
	http
} = uni.$u
import {
	publisherId
} from "@/json/publisherId.json"
// const publisherId = "ZHW";
const loginFrom = publisherId;



export const getFrontList = () => http.get('/launchpad/open/banner/getFrontList?publisherId=' + publisherId)
export const bannerRichText = (id) => http.get('/launchpad/open/banner/getRichText?id=' + id)

// 登录 => 用户登录 
export const userLogin = ({
	phone,
	password,
	inviterCode,
	code
}) => http.post('/ucenter/client/open/login', {
	phone,
	password,
	inviterCode,
	loginFrom,
	publisherId,
	code
})
// 登录页面获取验证码
export const getRegCode = (params) => http.post('/client/client/open/user/ibox/vcode', Object.assign(params, {
	publisherId
}))
// 个人信息
export const getUserInfo = (params) => http.get('/client/client/api/user/info', params)
// 个人中心修改个人信息
export const updatePic = (params) => http.post('/ucenter/client/api/user/info/update', params)
// 获取七牛上传凭证
export const uploadGetToken = (params) => http.get('/client/upload/get_token', params)
// 实名认证
export const authentication = (params) => http.post('/client/client/api/user/realname/auth', params)
// 背包
export const listByPub = () => http.get('/developer/app/list_by_pub?publisherId=' + publisherId)
// 背包
export const knapsackList = ({
	pageNum,
	pageSize,
	appIds,
	assetType
}) => http.post('/knapsack/knapsack/list', {
	pageNum,
	pageSize,
	appIds,
	assetType
})
// 背包详情
export const sellDetail = (appId, tokenId) => http.get('/market/open/sell/detail?appId=' + appId + '&tokenId=' +
	tokenId)
//中签记录（个人中心）
export const awardRecordTab = (page) => http.get(
	'/launchpad/api/sub/list?pageNum=' + page.pageNum + '&pageSize=' + page.pageSize + '&award=' + page.award)

//中签记录详情
export const subDetail = (orderNo) => http.get(
	'/launchpad/api/sub/detail?orderNo=' + orderNo)

//我的购买(秒杀)
export const seckillGoPurchaseTab = (page) => http.get(
	'/launchpad/api/seckill/activity/order/list?pageNum=' + page.pageNum + '&pageSize=' + 10 +
	'&status=' + page
	.status)
//我的购买(优先购)
export const goPurchaseTab = (page) => http.get(
	'/launchpad/api/sub/order/list?pageNum=' + page.pageNum + '&pageSize=' + 10 + '&status=' + page
	.status + '&activityType=' + page.activityType)
//秒杀下单取消
export const activityActivityOrderCancel = (params) => http.post(
	'/launchpad/api/seckill/activity/order/cancel', params)
//秒杀下单结果详情
export const activityOrderDetail = (orderNo) => http.get(
	'/launchpad/api/seckill/activity/order/detail?orderNo=' + orderNo)
//获取订单号
export const orderCreate = (params) => http.post(
	'/launchpad/api/sub/order/create', params)
//支付订单详情
export const orderDetail = (orderNo) => http.get(
	'/launchpad/api/sub/order/detail?orderNo=' + orderNo)

// 忘记密码的获取验证码
export const getResetPwdCode = (params) => http.post('/client/client/open/user/reset_password/vcode', Object.assign(params, {
	publisherId
}))
// 忘记密码
export const resetPwdByRemember = (params) => http.post('/client/client/open/user/password/reset', params)
// 设置密码
export const passwordSet = (params) => http.post('/client/client/api/user/password/set', params)

//首页最新上线
export const activityList = (pageNum, searchVal = "") => http.get(
	'/launchpad/open/sass/activity/list?pageNum=' + pageNum + "&publisherId=" + publisherId + "&searchVal=" +
	searchVal)

//首页精选
export const collectionList = (pageNum) => http.get(
	'/launchpad/open/sass/activity/collection/list?pageNum=' + pageNum + "&publisherId=" + publisherId)

// 获取活动详情
export const getActivityDetail = (alias, isLogin) => http.get(
	`/launchpad/${isLogin}/activity/detail?alias=` + alias + "&publisherId=" + publisherId)

// 获取精选活动详情
export const collectionDetail = (id) => http.get(
	'/launchpad/open/sass/activity/collection/detail?id=' + id + '&publisherId=' + publisherId)

//商品详情
export const productDetail = (id = {}) => http.get('/asset/assets/product/detail?id=' + id)

// 修改密码的发送验证码
export const resetPasswordVcode = (params) => http.post('/client/client/api/user/reset_password/vcode', Object.assign(params, {
	publisherId
}))

// 手机app版本更新
export const getVersionUpgrade = () => http.get('/client/client/api/appVersion/versionUpgrade?publisherId=' +
	publisherId)

//获取中签结果（只展示一次）
export const awardResult = (aid) => http.get(
	'/launchpad/api/activity/award/result?aid=' + aid)

//中签记录
export const awardRecord = (alias, isLogin) => http.get(
	`/launchpad/${isLogin}/activity/award/record?alias=` + alias)

//详情最大购买数量
export const payInfo = (alias) => http.get(
	'/launchpad/api/pay/info?alias=' + alias)

//获取订单号
export const activitySub = (params) => http.post(
	'/launchpad/api/activity/sub', params)

//认购结果
export const subResult = (orderNo) => http.get(
	'/launchpad/api/activity/sub/result?orderNo=' + orderNo)


//秒杀接口
// 获取活动详情
export const seckillDetail = (alias, isLogin) => http.get(
	`/launchpad/${isLogin}/seckill/activity/detail?alias=` + alias + "&publisherId=" + publisherId)

//秒杀下单
export const seckillActivitySub = (params) => http.post(
	'/launchpad/api/seckill/activity/order/create', params)

//秒杀下单结果
export const seckillSubResult = (orderNo) => http.get(
	'/launchpad/api/seckill/activity/order/create/result?orderNo=' + orderNo)

// 用户协议，隐私协议传type和publishId
export const pageGettexts = (type, publishId) => http.get('/developer/admin/page/gettexts?type=' + type +
	'&publishId=' + publisherId)

// app端版本更新
// https://meta-resource.oss-cn-beijing.aliyuncs.com/app_versions/{发行商ID}/version.json?t=时间戳
// export const appVersions = () => http.get(`/app_versions/${publisherId}/version.json?t=` + t)
