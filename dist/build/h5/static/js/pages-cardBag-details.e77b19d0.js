(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cardBag-details"],{"1f60":function(t,a,i){var e=i("8600");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("2bd0f3a2",e,!0,{sourceMap:!1,shadowMode:!1})},"764c":function(t,a,i){"use strict";i.r(a);var e=i("8519"),n=i.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){i.d(a,t,(function(){return e[t]}))}(o);a["default"]=n.a},"77eb":function(t,a,i){"use strict";var e=i("1f60"),n=i.n(e);n.a},8519:function(t,a,i){"use strict";var e=i("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=e(i("ade3")),o=e(i("a49b")),s=i("3228"),r={data:function(){var t;return t={stepsState:[],scrollTop:0,setPercent:0,shareShow:!1,show:!1,disable:!0,activityDetailObj:{},awardResultData:{},publicity:{},newData:{},buyShow:!1,chartImg:[{text:"copyLink",chartName:"复制链接",scene:null},{text:"poster",chartName:"分享海报",scene:null}],detailsInfo:{}},(0,n.default)(t,"activityDetailObj",{}),(0,n.default)(t,"newData",{}),(0,n.default)(t,"codeUrl",""),t},onLoad:function(t){this.newData=t},onShow:function(){this.getNewData()},onPageScroll:function(t){this.scrollTop=t.scrollTop},methods:{getNewData:function(){this.getSellDetail(this.newData.appId,this.newData.tokenId)},getSellDetail:function(t,a){var i=this;(0,s.sellDetail)(t,a).then((function(t){i.detailsInfo=t,i.activityDetailObj={name:t.assetName,coverImgUrl:t.assetPic,assetNo:t.assetNo,assetSum:t.assetSum,type:"card"}}))},detailBack:function(){uni.switchTab({url:"/pages/cardBag/index"})},detailShare:function(){""!=this.$store.state.userToken?this.shareShow=!0:uni.navigateTo({url:"/pages/login/login"})},close:function(){this.shareShow=!1},chartWay:function(t,a){var i=this;if("copyLink"!=t){if("poster"==t)return i.codeUrl="".concat(o.default.copyLink,"/pages/cardBag/details?appId=")+i.newData.appId+"&tokenId="+i.newData.tokenId,i.shareShow=!1,void(i.show=!0)}else{var e="".concat(o.default.copyLink,"/pages/cardBag/details?appId=")+i.newData.appId+"&tokenId="+i.newData.tokenId;uni.setClipboardData({data:e,success:function(){i.shareShow=!1}})}},buyEnd:function(){this.getNewData(),this.buyShow=!1},subscriptionClick:function(){this.buyShow=!1},closeCanvas:function(){this.show=!1}}};a.default=r},8600:function(t,a,i){var e=i("24fb"),n=i("1de5"),o=i("e4ca");a=e(!1);var s=n(o);a.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.detailBuy[data-v-84ad02b4]{min-height:100vh;background-color:var(--c-232728-bgc)}.detailBuy .img1[data-v-84ad02b4]{width:100%;height:%?650?%;position:relative}.detailBuy_bar[data-v-84ad02b4]{position:absolute;position:fixed;top:var(--window-top);padding:0 %?20?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;width:%?750?%;padding-top:0;z-index:999}.scrollBgc[data-v-84ad02b4]{position:absolute;position:fixed;top:var(--window-top);padding:0 %?20?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;width:%?750?%;padding-top:0;z-index:999;background-color:var(--c-202122-navigationBar)}.ms .miaoshu[data-v-84ad02b4]{margin-top:%?20?%;font-size:%?22?%;line-height:%?32?%;color:var(--c-232728-fontcolor4)}.ms .miaoshu_text[data-v-84ad02b4]{margin-top:%?10?%;font-size:%?22?%;line-height:%?32?%;color:var(--c-232728-fontcolor4);text-align:left;display:-webkit-box;overflow:hidden;text-overflow:ellipsis;word-wrap:break-word;white-space:normal!important;-webkit-line-clamp:1;-webkit-box-orient:vertical}.detailBuy_info .img2[data-v-84ad02b4]{position:absolute;left:0;top:%?580?%;width:%?750?%;height:%?180?%;border-radius:%?44?%;background-color:var(--c-232728-bgc)}.detailBuy_info .detailBuy_info_name[data-v-84ad02b4]{position:absolute;left:%?40?%;top:%?600?%;width:%?680?%}.detailBuy_info .detailBuy_info_name .detailBuy_info_name_0[data-v-84ad02b4]{color:var(--c-ffffff-fontcolor1);font-size:%?36?%}.detailBuy_info .detailBuy_info_name .shandian1[data-v-84ad02b4]{margin-right:%?0?%;background-color:var(--c-3a3a3b-fontcolor8);padding-top:%?6?%;border-radius:%?5?% 0 0 %?5?%;color:var(--c-eddbb3-font)}.detailBuy_info .detailBuy_info_name .new_buy_way[data-v-84ad02b4]{width:-webkit-max-content;width:max-content;font-size:%?24?%;padding:%?5?% %?15?%;border-radius:0 %?5?% %?5?% 0;background-color:var(--c-eddbb3-btc);color:var(--c-232728-fontcolor4)}.detailBuy_info .detailBuy_info_name .detailBuy_info_name_1[data-v-84ad02b4]{border:1px var(--c-eddbb3-bordercolor) solid;color:var(--c-eddbb3-fontcolor3);border-radius:%?10?%}.distance_time[data-v-84ad02b4]{color:var(--c-eddbb3-fontcolor3);font-size:%?30?%;font-weight:100}.distance_time_p[data-v-84ad02b4]{padding:%?20?% 0;text-align:center}.distance_time_p uni-text[data-v-84ad02b4]{width:%?140?%;text-align:center;display:inline-block;color:var(--c-eddbb3-fontcolor3);font-size:%?55?%;font-weight:700}.distance_time_b[data-v-84ad02b4]{text-align:center}.distance_time_b uni-text[data-v-84ad02b4]{color:var(--c-eddbb3-fontcolor3);width:%?140?%;text-align:center;font-weight:100;display:inline-block}.icon[data-v-84ad02b4]{width:%?80?%;height:%?80?%;text-align:center;line-height:%?80?%;border-radius:50%;background-color:var(--c-202122-navigationBar);color:var(--c-ffffff-fontcolor1);font-size:%?40?%}.detailBuy_bgc[data-v-84ad02b4]{margin:%?30?%;position:relative;border-radius:%?10?%}.detailBuy_bgc .activityName_bgc[data-v-84ad02b4]{position:absolute;top:%?61?%;width:%?130?%;height:%?16?%;opacity:.4;border-radius:%?30?%;background:-webkit-linear-gradient(left,var(--c-bgcportiongradual-l1-2),var(--c-eddbb3-fontcolor3));background:linear-gradient(90deg,var(--c-bgcportiongradual-l1-2),var(--c-eddbb3-fontcolor3))}.detailBuy_bgc .activityName uni-image[data-v-84ad02b4]{width:%?180?%;height:%?20?%}.detailBuy_bgc .activityName uni-text[data-v-84ad02b4]{font-size:%?35?%;color:var(--c-ffffff-fontcolor1)}.detailBuy_bgc .detailBuy_left[data-v-84ad02b4]{font-size:%?28?%;color:var(--c-ffffff-fontcolor1)}.detailBuy_bgc .detailBuy_right[data-v-84ad02b4]{color:var(--c-979998-fontcolor2)}.detailBuy_bgc .detailBuy_right_cor[data-v-84ad02b4]{color:var(--c-979998-fontcolor2)}.detailBuy_bgc .border_line[data-v-84ad02b4]{border:1px var(--c-eddbb3-bordercolor) solid;border-radius:%?10?%}.detailBuy_bgc .detailBuy_zq[data-v-84ad02b4]{border:15px var(--c-3a3a3b-bgcportion3) solid;border-radius:%?20?%;background-color:var(--c-3a3a3b-bgcportion3)}.fixedBtnBgc[data-v-84ad02b4]{background-color:var(--c-171717-bgcportion4);box-sizing:border-box}.fixedBtnBgc .resellPrice[data-v-84ad02b4]{color:var(--c-ffffff-fontcolor1);font-size:%?45?%;font-weight:700}.resellBtn[data-v-84ad02b4]{width:50%;font-size:%?32?%}.share_title[data-v-84ad02b4]{color:var(--c-ffffff-fontcolor1)}.shareBgc[data-v-84ad02b4]{background-color:var(--c-232728-bgc)}.shareBgc .line[data-v-84ad02b4]{width:%?750?%;height:%?2?%;background-color:var(--c-E0E0E0-linecolor2)}.shareIcon1[data-v-84ad02b4]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor1);background-color:var(--c-shareupBgColor1)}.shareIcon2[data-v-84ad02b4]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor2);background-color:var(--c-shareupBgColor2)}.shareIcon3[data-v-84ad02b4]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor3);background-color:var(--c-shareupBgColor3)}.shareIcon4[data-v-84ad02b4]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor4);background-color:var(--c-shareupBgColor4)}.isSign[data-v-84ad02b4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:100%}.isSign .isSign_content[data-v-84ad02b4]{background:url('+s+") no-repeat;background-size:100% 100%;background-color:var(--c-232728-bgc);width:%?500?%;height:%?620?%;border-radius:%?20?%;text-align:center}.isSign .isSign_content .isSign_top uni-image[data-v-84ad02b4]{width:%?120?%;height:%?20?%}.isSign .isSign_content .isSign_top .noSign[data-v-84ad02b4]{font-size:%?32?%;color:var(--c-979998-fontcolor2)}.isSign .isSign_content .isSign_top .isSign[data-v-84ad02b4]{font-size:%?32?%;color:var(--c-eddbb3-fontcolor3)}.isSign .isSign_content .isSignText[data-v-84ad02b4]{color:var(--c-ffffff-fontcolor1)}.isSign .isSign_content .isSignTextNum[data-v-84ad02b4]{color:var(--c-eddbb3-fontcolor3)}.isSign .isSign_content .noSigns[data-v-84ad02b4]{width:%?240?%;height:%?240?%}.isSign .isSign_content .isSigns[data-v-84ad02b4]{width:%?300?%;height:%?300?%;border-radius:%?15?%}.isSign .isSign_content .isSign_btn[data-v-84ad02b4]{width:80%;margin:auto}.isSign .isSign_content .isSign_btns[data-v-84ad02b4]{width:80%;margin:auto;background-color:var(--c-979998-bgcportion5);color:var(--c-ffffff-fontcolor1);font-weight:100}.chenggong1[data-v-84ad02b4]{color:var(--c-000000-font);padding:%?15?%;border-radius:50%;font-size:%?42?%}.closeBtn[data-v-84ad02b4]{margin:0 auto;margin-top:%?30?%;width:80%;background:-webkit-linear-gradient(left,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));background:linear-gradient(90deg,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));color:var(--c-ffffff-fontcolor11)}",""]),t.exports=a},"976b":function(t,a,i){"use strict";i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return o})),i.d(a,"a",(function(){return e}));var e={uPopup:i("3626").default,MButton:i("a2aa").default,uOverlay:i("0c21").default,share:i("14fa").default},n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"detailBuy",style:[JSON.parse(t.themeJson)]},[e("v-uni-image",{staticClass:"img1",attrs:{src:t.detailsInfo.assetPic,mode:""}}),e("v-uni-view",{class:t.scrollTop>=250?"scrollBgc":"detailBuy_bar"},[e("v-uni-text",{staticClass:"iconfont icon 31fanhui1",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.detailBack.apply(void 0,arguments)}}},[t._v("")]),e("v-uni-text",{staticClass:"iconfont icon JC_054",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.detailShare.apply(void 0,arguments)}}},[t._v("")])],1),e("v-uni-view",{staticClass:"detailBuy_info"},[e("v-uni-image",{staticClass:"img2",attrs:{src:i("0dd4"),mode:""}}),e("v-uni-view",{staticClass:"detailBuy_info_name"},[e("v-uni-view",{staticClass:"detailBuy_info_name_0"},[t._v(t._s(t.detailsInfo.assetName))]),e("v-uni-view",{staticClass:"ms"},[e("v-uni-view",{staticClass:"miaoshu"},[t._v("资产描述:")]),e("v-uni-view",{staticClass:"miaoshu_text"},[t._v(t._s(t.detailsInfo.assetIntro))])],1)],1)],1),e("v-uni-view",{staticStyle:{height:"120rpx"}}),e("v-uni-view",{staticClass:"detailBuy_bgc p-3"},[e("v-uni-view",{staticClass:"activityName d-flex a-center"},[e("v-uni-text",[t._v("基本信息")])],1),e("v-uni-view",{staticClass:"activityName_bgc"}),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("所属分类")]),e("v-uni-view",{staticClass:"detailBuy_right font-28r"},[t._v(t._s(t.detailsInfo.assetCateString))])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("编号")]),e("v-uni-view",{staticClass:"detailBuy_right_cor font-28r"},[t._v("#"+t._s(t.detailsInfo.assetNo)+"/"+t._s(t.detailsInfo.assetSum))])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("TokenID")]),e("v-uni-view",{staticClass:"detailBuy_right_cor font-28r"},[t._v(t._s(t.detailsInfo.tokenId))])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("合约地址")]),e("v-uni-view",{staticClass:"detailBuy_right_cor font-28r"},[t._v("------")])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("技术支持")]),e("v-uni-view",{staticClass:"detailBuy_right_cor font-28r"},[t._v("------")])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("鉴赏期")]),e("v-uni-view",{staticClass:"detailBuy_right_cor font-28r"},[t._v("------")])],1)],1),e("v-uni-view",{staticStyle:{height:"160rpx"}}),e("u-popup",{attrs:{show:t.shareShow},on:{close:function(a){arguments[0]=a=t.$handleEvent(a),t.shareShow=!1}}},[e("v-uni-view",{staticClass:"shareBgc",staticStyle:{height:"490rpx","padding-top":"30rpx"}},[e("v-uni-view",{staticClass:"mr-4 text-right"},[e("v-uni-text",{staticClass:"iconfont chenggong1",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.shareShow=!1}}},[t._v("")])],1),e("v-uni-view",{staticClass:"d-flex j-center share_title"},[t._v("立即分享给好友")]),e("v-uni-view",{staticClass:"d-flex m-5"},t._l(t.chartImg,(function(a,i){return e("v-uni-view",{key:i,staticClass:"flex-1 pt-3",staticStyle:{"text-align":"center"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.chartWay(a.text,a.scene)}}},[0==i?e("v-uni-text",{staticClass:"iconfont shareIcon1 fuzhi"},[t._v("")]):t._e(),1==i?e("v-uni-text",{staticClass:"iconfont shareIcon2 haibao"},[t._v("")]):t._e(),2==i?e("v-uni-text",{staticClass:"iconfont shareIcon3 pengyou"},[t._v("")]):t._e(),3==i?e("v-uni-text",{staticClass:"iconfont shareIcon4 pengyouquan"},[t._v("")]):t._e(),e("v-uni-view",{staticClass:"font-sm pt-3 share_title"},[t._v(t._s(a.chartName))])],1)})),1),e("v-uni-view",{staticClass:"line"}),e("MButton",{staticClass:"closeBtn",attrs:{text:"取消"},nativeOn:{click:function(a){return t.close(a)}}})],1)],1),e("u-overlay",{attrs:{show:t.show,opacity:"0.6"}},[e("v-uni-view",{staticStyle:{display:"flex","justify-content":"center","align-items":"center",height:"100%"}},[e("share",{attrs:{codeUrl:t.codeUrl,activityDetailObj:t.activityDetailObj},on:{closeCanvas:function(a){arguments[0]=a=t.$handleEvent(a),t.closeCanvas.apply(void 0,arguments)}}})],1)],1)],1)},o=[]},eb1d:function(t,a,i){"use strict";i.r(a);var e=i("976b"),n=i("764c");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(a,t,(function(){return n[t]}))}(o);i("77eb");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],e["b"],e["c"],!1,null,"84ad02b4",null,!1,e["a"],s);a["default"]=c.exports}}]);