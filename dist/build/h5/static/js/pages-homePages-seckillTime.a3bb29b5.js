(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-homePages-seckillTime"],{"0b48":function(t,i,a){"use strict";var e=a("4094"),n=a.n(e);n.a},"0c0b":function(t,i,a){"use strict";a.r(i);var e=a("b9f8"),n=a.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return e[t]}))}(o);i["default"]=n.a},1517:function(t,i,a){"use strict";a.r(i);var e=a("483a"),n=a("9f44");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return n[t]}))}(o);a("0b48");var c,s=a("f0c5"),r=Object(s["a"])(n["default"],e["b"],e["c"],!1,null,"6aa5529f",null,!1,e["a"],c);i["default"]=r.exports},"1eec":function(t,i,a){"use strict";var e=a("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e(a("8d94")),o=e(a("a49b")),c=a("3228"),s={components:{countdownTimer:n.default},data:function(){return{txgBtn:"立即秒杀",scrollTop:0,shareShow:!1,show:!1,activityDetailObj:{},alias:"",codeUrl:"",buyShow:!1,chartImg:[{text:"copyLink",chartName:"复制链接",scene:null},{text:"poster",chartName:"分享海报",scene:null}],newData:{}}},onLoad:function(t){this.alias=t.alias,this.newData=t},onShow:function(){this.getNewData()},onPageScroll:function(t){this.scrollTop=t.scrollTop},methods:{getNewData:function(){this.getSeckillDetail(this.newData.alias)},getSeckillDetail:function(t){var i=this,a=""==this.$store.state.userToken?"open":"api";(0,c.seckillDetail)(t,a).then((function(t){i.activityDetailObj=t,i.verifySubscription(!0)}))},detailBack:function(){"y"==this.newData.backPath?uni.navigateTo({url:"/pages/homePages/activityDetail?id="+this.newData.opId}):uni.switchTab({url:"/pages/homePages/index"})},detailShare:function(){""!=this.$store.state.userToken?this.shareShow=!0:uni.navigateTo({url:"/pages/login/login"})},close:function(){this.shareShow=!1},chartWay:function(t,i){if("copyLink"!=t){if("poster"==t)return this.codeUrl="".concat(o.default.copyLink,"/pages/homePages/seckillTime?alias=")+this.newData.alias,console.log(this.codeUrl),this.shareShow=!1,void(this.show=!0);console.log(i)}else{var a=this,e="".concat(o.default.copyLink,"/pages/homePages/seckillTime?alias=")+a.newData.alias;uni.setClipboardData({data:e,success:function(){a.shareShow=!1}})}},seckillTime:function(){this.getNewData()},commonBtn:function(){"去登录"==this.txgBtn?uni.navigateTo({url:"/pages/login/login"}):this.verifySubscription(!1)},verifySubscription:function(t){return""==this.$store.state.userToken?(this.txgBtn="去登录",void(this.disable=!1)):0==this.activityDetailObj.status?(t&&(this.txgBtn="未开始"),void this.$u.toast("活动暂未开始，等一会儿再来吧～")):void(this.activityDetailObj.limitBuy>0&&1==this.activityDetailObj.status?t?(this.txgBtn="立即秒杀",this.disable=!1):this.buyShow=!0:2!=this.activityDetailObj.status?0==this.activityDetailObj.limitBuy&&(t?(this.disable=!0,this.txgBtn="已认购"):this.$u.toast("已认购过")):t?(this.txgBtn="已结束",this.disable=!1):this.$u.toast("活动已结束"))},buyEnd:function(){this.getNewData(),this.buyShow=!1},subscriptionClick:function(){this.buyShow=!1},closeCanvas:function(){this.show=!1}}};i.default=s},"2db3":function(t,i,a){"use strict";a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return o})),a.d(i,"a",(function(){return e}));var e={uPopup:a("3626").default,MButton:a("a2aa").default},n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[a("u-popup",{attrs:{show:t.subscriptionShow},on:{close:function(i){arguments[0]=i=t.$handleEvent(i),t.closeSubscription.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"popupBgc"},[a("v-uni-view",{staticClass:"mt-3 mr-4 text-right"},[a("v-uni-text",{staticClass:"iconfont chenggong1",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.closeSubscription.apply(void 0,arguments)}}},[t._v("")])],1),a("v-uni-view",{staticClass:"popupBgc_info p-3 d-flex"},[a("v-uni-image",{attrs:{src:t.activityDetailObj.coverImgUrl,mode:""}}),a("v-uni-view",{staticClass:"ml-3 py-3"},[a("v-uni-view",{staticClass:"rg_text"},[t._v(t._s(t.activityDetailObj.name))]),a("v-uni-view",{staticClass:"mt-5 font-weight font-32r"},[t._v("¥"+t._s(t.activityDetailObj.priceYuan))])],1)],1),a("v-uni-view",{staticClass:"p-4 d-flex j-sb"},[a("v-uni-view",[a("v-uni-text",{staticClass:"rg_text"},[t._v("认购数量")]),a("v-uni-text",[t._v("（每人限购"+t._s(t.activityDetailObj.limitBuy)+"份）")])],1),a("v-uni-view",[a("v-uni-text",{staticClass:"iconfont jian",class:{active_num:t.car_num<=1},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.num_reduce()}}},[t._v("")]),a("v-uni-text",{staticClass:"px-3 num"},[t._v(t._s(t.car_num))]),a("v-uni-text",{staticClass:"iconfont jia",class:{active_num:t.car_num>=t.activityDetailObj.limitBuy},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.num_add()}}},[t._v("")])],1)],1),a("v-uni-view",{staticClass:"d-flex a-center j-center m-4"},[a("MButton",{staticClass:"resellBtn",attrs:{text:t.txgBtn},nativeOn:{click:function(i){return t.commonBtn(i)}}})],1)],1)],1)],1)},o=[]},"2e04":function(t,i,a){var e=a("24fb"),n=a("1de5"),o=a("0dd4"),c=a("e4ca");i=e(!1);var s=n(o),r=n(c);i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.detailBuy[data-v-6aa5529f]{min-height:100vh;background-color:var(--c-232728-bgc)}.detailBuy .img1[data-v-6aa5529f]{width:100%;height:%?650?%;position:relative}.detailBuy_bar[data-v-6aa5529f]{position:absolute;position:fixed;top:var(--window-top);padding:0 %?20?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;width:%?750?%;padding-top:0;z-index:999}.scrollBgc[data-v-6aa5529f]{position:absolute;position:fixed;top:var(--window-top);padding:0 %?20?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;width:%?750?%;padding-top:0;z-index:999;background-color:var(--c-202122-navigationBar)}.detailBuy_info .img2[data-v-6aa5529f]{position:absolute;left:%?35?%;top:%?580?%;width:%?680?%;height:%?180?%;border-radius:%?20?%;background-color:var(--c-232728-bgc)}.detailBuy_info .detailBuy_info_name[data-v-6aa5529f]{position:absolute;left:%?40?%;top:%?600?%;width:%?680?%;text-align:center}.detailBuy_info .detailBuy_info_name .detailBuy_info_name_0[data-v-6aa5529f]{color:var(--c-ffffff-fontcolor1);font-size:%?36?%}.detailBuy_info .detailBuy_info_name .shandian1[data-v-6aa5529f]{margin-right:%?0?%;padding-top:%?6?%;border-radius:%?5?% 0 0 %?5?%;color:var(--c-bgcportiongradual-h1-1)}.detailBuy_info .detailBuy_info_name .new_buy_way[data-v-6aa5529f]{width:-webkit-max-content;width:max-content;font-size:%?24?%;padding:%?5?% %?15?%;border-radius:0 %?5?% %?5?% 0;color:var(--c-ffffff-fontcolor1)}.detailBuy_info .detailBuy_info_name .detailBuy_info_name_1[data-v-6aa5529f]{background-color:var(--c-F0F0F0-bgcportion8);color:var(--c-ffffff-fontcolor1);border-radius:%?10?%}.distance_time[data-v-6aa5529f]{color:var(--c-ffffff-fontcolor1);font-size:%?30?%;font-weight:100}.distance_time_p[data-v-6aa5529f]{padding:%?20?% 0;text-align:center}.distance_time_p uni-text[data-v-6aa5529f]{width:%?140?%;text-align:center;display:inline-block;color:var(--c-ffffff-fontcolor1);font-size:%?55?%;font-weight:700}.distance_time_b[data-v-6aa5529f]{text-align:center}.distance_time_b uni-text[data-v-6aa5529f]{color:var(--c-ffffff-fontcolor1);width:%?140?%;text-align:center;font-weight:100;display:inline-block}.icon[data-v-6aa5529f]{width:%?80?%;height:%?80?%;text-align:center;line-height:%?80?%;border-radius:50%;background-color:var(--c-202122-navigationBar);color:var(--c-ffffff-fontcolor1);font-size:%?40?%}.detailBuy_bgc[data-v-6aa5529f]{margin:%?30?%;border-radius:%?10?%;background-color:var(--c-232728-bgc);position:relative}.detailBuy_bgc .activityName uni-image[data-v-6aa5529f]{width:%?180?%;height:%?20?%}.detailBuy_bgc .activityName uni-text[data-v-6aa5529f]{font-size:%?35?%;color:var(--c-ffffff-fontcolor1)}.detailBuy_bgc .activityName_bgc[data-v-6aa5529f]{position:absolute;top:%?61?%;width:%?130?%;height:%?16?%;opacity:.4;border-radius:%?30?%;background:-webkit-linear-gradient(left,var(--c-bgcportiongradual-l1-2),var(--c-eddbb3-fontcolor3));background:linear-gradient(90deg,var(--c-bgcportiongradual-l1-2),var(--c-eddbb3-fontcolor3))}.detailBuy_bgc .detailBuy_left[data-v-6aa5529f]{font-size:%?28?%;color:var(--c-979998-fontcolor2)}.detailBuy_bgc .detailBuy_right[data-v-6aa5529f]{color:var(--c-ffffff-fontcolor1)}.detailBuy_bgc .detailBuy_right_cor[data-v-6aa5529f]{color:var(--c-b1c7cb-fontcolor5)}.detailBuy_bgc .border_line[data-v-6aa5529f]{border:1px var(--c-eddbb3-bordercolor) solid;border-radius:%?10?%}.detailBuy_bgc .detailBuy_zq[data-v-6aa5529f]{box-shadow:0 0 %?20?% 0 rgba(57,58,76,.3);padding:%?40?%;border-radius:%?20?%}.detailBuy_line[data-v-6aa5529f]{width:100%;height:%?2?%;background-color:var(--c-2f3334-linecolor1)}.fixedBtnBgc[data-v-6aa5529f]{background-color:var(--c-232728-bgc);box-sizing:border-box}.fixedBtnBgc .resellPrice[data-v-6aa5529f]{color:var(--c-ffffff-fontcolor1);font-size:%?45?%;font-weight:700}.resellBtn[data-v-6aa5529f]{width:50%;font-size:%?32?%;background:-webkit-linear-gradient(left,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));background:linear-gradient(90deg,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));color:var(--c-ffffff-fontcolor11)}.share_title[data-v-6aa5529f]{color:var(--c-ffffff-fontcolor1)}.shareBgc[data-v-6aa5529f]{background-color:var(--c-232728-bgc)}.shareBgc .line[data-v-6aa5529f]{width:%?750?%;height:%?2?%;background-color:var(--c-E0E0E0-linecolor2)}.closeBtn[data-v-6aa5529f]{width:100%;background:-webkit-linear-gradient(left,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));background:linear-gradient(90deg,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));color:var(--c-ffffff-fontcolor11)}.shareIcon1[data-v-6aa5529f]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor1);background-color:var(--c-shareupBgColor1)}.shareIcon2[data-v-6aa5529f]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor2);background-color:var(--c-shareupBgColor2)}.shareIcon3[data-v-6aa5529f]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor3);background-color:var(--c-shareupBgColor3)}.shareIcon4[data-v-6aa5529f]{font-size:%?50?%;padding:%?25?%;border-radius:50%;color:var(--c-shareupColor4);background-color:var(--c-shareupBgColor4)}.btmImg[data-v-6aa5529f]{background:url('+s+") no-repeat;background-size:100% auto;background-position:0 100%}.isSign[data-v-6aa5529f]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:100%}.isSign .isSign_content[data-v-6aa5529f]{background:url("+r+") no-repeat;background-size:100% 100%;background-color:var(--c-232728-bgc);width:%?500?%;height:%?620?%;border-radius:%?20?%;text-align:center}.isSign .isSign_content .isSign_top uni-image[data-v-6aa5529f]{width:%?120?%;height:%?20?%}.isSign .isSign_content .isSign_top .noSign[data-v-6aa5529f]{font-size:%?32?%;color:var(--c-979998-fontcolor2)}.isSign .isSign_content .isSign_top .isSign[data-v-6aa5529f]{font-size:%?32?%;color:var(--c-eddbb3-fontcolor3)}.isSign .isSign_content .isSignText[data-v-6aa5529f]{color:var(--c-ffffff-fontcolor1)}.isSign .isSign_content .isSignTextNum[data-v-6aa5529f]{color:var(--c-eddbb3-fontcolor3)}.isSign .isSign_content .noSigns[data-v-6aa5529f]{width:%?240?%;height:%?240?%}.isSign .isSign_content .isSigns[data-v-6aa5529f]{width:%?300?%;height:%?300?%;border-radius:%?15?%}.isSign .isSign_content .isSign_btn[data-v-6aa5529f]{width:80%;margin:auto}.isSign .isSign_content .isSign_btns[data-v-6aa5529f]{width:80%;margin:auto;background-color:var(--c-979998-bgcportion5);color:var(--c-ffffff-fontcolor1);font-weight:100}.chenggong1[data-v-6aa5529f]{color:var(--c-000000-font);padding:%?15?%;border-radius:50%;font-size:%?42?%}.liness[data-v-6aa5529f]{width:%?700?%;height:%?2?%;background-color:var(--c-EBEBEB-linecolor3);margin:auto}",""]),t.exports=i},4094:function(t,i,a){var e=a("2e04");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("1213a485",e,!0,{sourceMap:!1,shadowMode:!1})},"483a":function(t,i,a){"use strict";a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return o})),a.d(i,"a",(function(){return e}));var e={MButton:a("a2aa").default,uPopup:a("3626").default,uOverlay:a("0c21").default,share:a("14fa").default,seckillSub:a("ad84").default},n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"detailBuy",style:[JSON.parse(t.themeJson)]},[e("v-uni-image",{staticClass:"img1",attrs:{src:t.activityDetailObj.coverImgUrl,mode:""}}),e("v-uni-view",{class:t.scrollTop>=250?"scrollBgc":"detailBuy_bar"},[e("v-uni-text",{staticClass:"iconfont icon 31fanhui1",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.detailBack.apply(void 0,arguments)}}},[t._v("")]),e("v-uni-text",{staticClass:"iconfont icon JC_054",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.detailShare.apply(void 0,arguments)}}},[t._v("")])],1),e("v-uni-view",{staticClass:"detailBuy_info"},[e("v-uni-image",{staticClass:"img2",attrs:{src:a("0dd4"),mode:""}}),e("v-uni-view",{staticClass:"detailBuy_info_name"},[e("v-uni-view",{staticClass:"detailBuy_info_name_0"},[t._v(t._s(t.activityDetailObj.name))]),e("v-uni-view",{staticClass:"d-flex j-center mt-2"},[e("v-uni-view",{staticClass:"d-flex j-center"},[e("v-uni-text",{staticClass:"iconfont shandian1"},[t._v("")]),e("v-uni-view",{staticClass:"new_buy_way"},[e("v-uni-text",[t._v("秒杀")]),t._v(t._s(t.activityDetailObj.sumNum)+"份")],1)],1),e("v-uni-view",{staticClass:"detailBuy_info_name_1 px-2 ml-3"},[t._v("总发行"+t._s(t.activityDetailObj.assetTotal)+"份")])],1)],1)],1),e("v-uni-view",{staticStyle:{height:"100rpx"}}),e("v-uni-view",{staticClass:"liness"}),e("v-uni-view",{staticClass:"detailBuy_bgc",staticStyle:{"margin-top":"60rpx"}},[e("v-uni-view",{staticClass:"distance_time text-center"},[t._v("距离开始")]),e("countdown-timer",{attrs:{autoStart:!0,time:1e3*t.activityDetailObj.lastSec},on:{finish:function(i){arguments[0]=i=t.$handleEvent(i),t.seckillTime.apply(void 0,arguments)}},scopedSlots:t._u([{key:"default",fn:function(i){var a=i.day,n=i.hour,o=i.minute,c=i.second;return[e("v-uni-view",{staticClass:"distance_time_p"},[e("v-uni-text",[t._v(t._s(-1==a?0:a))]),e("v-uni-text",[t._v(t._s(-1==n?0:n))]),e("v-uni-text",[t._v(t._s(-1==o?0:o))]),e("v-uni-text",[t._v(t._s(-1==c?0:c))])],1),e("v-uni-view",{staticClass:"distance_time_b"},[e("v-uni-text",[t._v("DAYS")]),e("v-uni-text",[t._v("HOURS")]),e("v-uni-text",[t._v("MIN")]),e("v-uni-text",[t._v("SEC")])],1)]}}])})],1),e("v-uni-view",{staticClass:"detailBuy_bgc p-3"},[e("v-uni-view",{staticClass:"activityName d-flex a-center"},[e("v-uni-text",[t._v("基本信息")])],1),e("v-uni-view",{staticClass:"activityName_bgc"}),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("所属分类")]),e("v-uni-view",{staticClass:"detailBuy_right font-28r"},[t._v(t._s(t.activityDetailObj.assetCateString))])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("合约地址")]),e("v-uni-view",{staticClass:"detailBuy_right_cor font-28r"},[t._v(t._s(t.activityDetailObj.chainAddr||"-----"))])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("技术支持")]),e("v-uni-view",{staticClass:"detailBuy_right_cor font-28r"},[t._v(t._s(t.activityDetailObj.chainName||"-----"))])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("创建时间")]),e("v-uni-view",{staticClass:"detailBuy_right font-28r"},[t._v(t._s(t.activityDetailObj.assetCreateAt))])],1),e("v-uni-view",{staticClass:"my-2 d-flex j-sb"},[e("v-uni-view",{staticClass:"detailBuy_left font-32r"},[t._v("鉴赏期")]),e("v-uni-view",{staticClass:"detailBuy_right font-28r"},[t._v(t._s(t.activityDetailObj.nfrDay||"-----")),0!=t.activityDetailObj.nfrDay?e("v-uni-text",[t._v("天")]):t._e()],1)],1)],1),""!=t.activityDetailObj.assetDetailImg?e("v-uni-view",{staticClass:"detailBuy_bgc p-3 btmImg"},[e("v-uni-view",{staticClass:"activityName d-flex a-center"},[e("v-uni-text",[t._v("作品故事")])],1),e("v-uni-view",{staticClass:"activityName_bgc"}),e("v-uni-image",{staticStyle:{width:"100%","text-align":"center","margin-top":"20rpx","border-radius":"10rpx"},attrs:{src:t.activityDetailObj.assetDetailImg,mode:"widthFix"}})],1):t._e(),e("v-uni-view",{staticStyle:{height:"160rpx"}}),e("v-uni-view",{staticClass:"fixedBtn fixedBtnBgc px-7"},[e("v-uni-view",{staticClass:"resellPrice"},[t._v("¥ "+t._s(t.activityDetailObj.priceYuan))]),e("MButton",{staticClass:"resellBtn",attrs:{text:t.txgBtn},nativeOn:{click:function(i){return t.commonBtn(i)}}})],1),e("u-popup",{attrs:{show:t.shareShow},on:{close:function(i){arguments[0]=i=t.$handleEvent(i),t.shareShow=!1}}},[e("v-uni-view",{staticClass:"shareBgc",staticStyle:{height:"440rpx",padding:"30rpx"}},[e("v-uni-view",{staticClass:"mr-4 text-right"},[e("v-uni-text",{staticClass:"iconfont chenggong1",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.shareShow=!1}}},[t._v("")])],1),e("v-uni-view",{staticClass:"d-flex j-center share_title"},[t._v("立即分享给好友")]),e("v-uni-view",{staticClass:"d-flex m-5"},t._l(t.chartImg,(function(i,a){return e("v-uni-view",{key:a,staticClass:"flex-1 pt-3",staticStyle:{"text-align":"center"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.chartWay(i.text,i.scene)}}},[0==a?e("v-uni-text",{staticClass:"iconfont shareIcon1 fuzhi"},[t._v("")]):t._e(),1==a?e("v-uni-text",{staticClass:"iconfont shareIcon2 haibao"},[t._v("")]):t._e(),2==a?e("v-uni-text",{staticClass:"iconfont shareIcon3 pengyou"},[t._v("")]):t._e(),3==a?e("v-uni-text",{staticClass:"iconfont shareIcon4 pengyouquan"},[t._v("")]):t._e(),e("v-uni-view",{staticClass:"font-sm pt-3 share_title"},[t._v(t._s(i.chartName))])],1)})),1),e("MButton",{staticClass:"closeBtn",attrs:{text:"取消"},nativeOn:{click:function(i){return t.close(i)}}})],1)],1),e("u-overlay",{attrs:{show:t.show}},[e("v-uni-view",{staticStyle:{display:"flex","justify-content":"center","align-items":"center",height:"100%"}},[e("share",{attrs:{activityDetailObj:t.activityDetailObj,codeUrl:t.codeUrl},on:{closeCanvas:function(i){arguments[0]=i=t.$handleEvent(i),t.closeCanvas.apply(void 0,arguments)}}})],1)],1),e("seckillSub",{attrs:{buyShow:t.buyShow,alias:t.alias,activityDetailObj:t.activityDetailObj},on:{buyEnd:function(i){arguments[0]=i=t.$handleEvent(i),t.buyEnd.apply(void 0,arguments)},subscriptionClick:function(i){arguments[0]=i=t.$handleEvent(i),t.subscriptionClick.apply(void 0,arguments)}}})],1)},o=[]},"8cd5":function(t,i,a){var e=a("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.popupBgc[data-v-3f5093e5]{background-color:var(--c-232728-bgc)}.popupBgc .popupBgc_info uni-image[data-v-3f5093e5]{width:%?200?%;height:%?200?%;border-radius:%?30?%}.popupBgc .rg_text[data-v-3f5093e5]{color:var(--c-ffffff-fontcolor1);font-size:%?34?%}.popupBgc .resellBtn[data-v-3f5093e5]{width:100%;background:-webkit-linear-gradient(left,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));background:linear-gradient(90deg,var(--c-7A9EFC-bgcportiongradual1),var(--c-5A9AF8-bgcportiongradual2));color:var(--c-ffffff-fontcolor11)}.iconfont[data-v-3f5093e5]{font-size:%?45?%;color:var(--c-000000-font)}.num[data-v-3f5093e5]{color:var(--c-ffffff-fontcolor1);font-size:%?38?%}.active_num[data-v-3f5093e5]{color:var(--c-979998-fontcolor2)}.chenggong1[data-v-3f5093e5]{padding:%?15?%;border-radius:50%}.warp[data-v-3f5093e5]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:100%}.rect[data-v-3f5093e5]{width:280px;height:320px;background-color:var(--c-3a3a3b-bgcportion3);border-radius:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.rect uni-image[data-v-3f5093e5]{width:%?200?%;height:%?200?%}.immediatelyBuy[data-v-3f5093e5]{width:70%;font-size:%?28?%;margin-top:%?20?%;height:%?70?%;line-height:%?70?%}',""]),t.exports=i},"8d94":function(t,i,a){"use strict";a.r(i);var e=a("ec9c"),n=a("bde2");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return n[t]}))}(o);var c,s=a("f0c5"),r=Object(s["a"])(n["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);i["default"]=r.exports},"94ce":function(t,i,a){var e=a("8cd5");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("cc17a5f4",e,!0,{sourceMap:!1,shadowMode:!1})},"9f44":function(t,i,a){"use strict";a.r(i);var e=a("1eec"),n=a.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return e[t]}))}(o);i["default"]=n.a},a597:function(t,i,a){"use strict";var e=a("94ce"),n=a.n(e);n.a},ad84:function(t,i,a){"use strict";a.r(i);var e=a("2db3"),n=a("0c0b");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return n[t]}))}(o);a("a597");var c,s=a("f0c5"),r=Object(s["a"])(n["default"],e["b"],e["c"],!1,null,"3f5093e5",null,!1,e["a"],c);i["default"]=r.exports},b9f8:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,a("b680");var e=a("3228"),n={props:{buyShow:{type:Boolean,default:!1},activityDetailObj:{type:Object,default:function(){}},alias:{type:String,default:""}},data:function(){return{subscriptionShow:!1,isPayCuccess:!1,car_num:1,txgBtn:"提交认购",timer:null,status:"",hintText:"恭喜您中签了"}},watch:{buyShow:function(t){this.subscriptionShow=t},activityDetailObj:function(t){this.txgBtn="提交认购(￥".concat(t.priceYuan,")")}},methods:{num_add:function(){this.car_num>=this.activityDetailObj.limitBuy?this.$u.toast("不可再增加了哦~"):(this.car_num=this.car_num+1,this.txgBtn="提交认购(￥".concat((this.car_num*this.activityDetailObj.priceYuan).toFixed(2),")"))},num_reduce:function(){this.car_num<=1?this.$u.toast("不可再减少了哦~"):(this.car_num=this.car_num-1,this.txgBtn="提交认购(￥".concat((this.car_num*this.activityDetailObj.priceYuan).toFixed(2),")"))},commonBtn:function(){var t=this;this.subscriptionShow=!1;var i={successRedirectUrl:"successRedirectUrl",exitRedirectUrl:"exitRedirectUrl",alias:this.alias,num:this.car_num};(0,e.seckillActivitySub)(i).then((function(i){t.getPayResult(i)})),this.$emit("buyEnd")},getPayResult:function(t){var i=this;uni.showLoading({title:"秒杀中..."}),this.timer=setInterval((function(){(0,e.seckillSubResult)(t).then((function(t){console.log(t),"fail"==t.step?(uni.hideLoading(),i.$u.toast(t.reason),clearInterval(i.timer)):"success"==t.step&&(uni.hideLoading(),clearInterval(i.timer),uni.navigateTo({url:"/pages/pay?token="+i.$store.state.userToken+"&orderNo="+t.orderNo+"&alias="+i.alias+"&pathEntrance=3"}))}))}),3e3)},closeSubscription:function(){this.$emit("subscriptionClick")},buyCondition:function(){this.isPayCuccess=!1,this.$emit("buyEnd")}},onUnload:function(){clearInterval(this.timer),this.timer=null}};i.default=n},bde2:function(t,i,a){"use strict";a.r(i);var e=a("cf84"),n=a.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return e[t]}))}(o);i["default"]=n.a},cf84:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,a("a9e3");var e={props:{time:{type:Number,default:0},autoStart:{type:Boolean,default:!1}},data:function(){return{timer:null,timeData:{remain:0,day:0,hour:0,minute:0,second:0}}},watch:{time:function(){this.reset()}},methods:{updateTimeData:function(){var t=this.timeData.remain;this.timeData.day=Math.floor(t/1e3/60/60/24),this.timeData.hour=Math.floor(t/1e3/60/60%24),this.timeData.minute=Math.floor(t/1e3/60%60),this.timeData.second=Math.floor(t/1e3%60)},startTimer:function(){var t=this;this.timer&&clearInterval(this.timer),this.timeData.remain<1e3||(this.timer=setInterval((function(){t.timeData.remain-=1e3,t.updateTimeData(),t.timeData.remain<1e3&&(t.pause(),t.$emit("finish"))}),1e3))},reset:function(){this.timeData.remain=this.time,this.updateTimeData(),this.autoStart&&this.start()},pause:function(){this.timer&&(clearInterval(this.timer),this.timer=null)},start:function(){this.timer||this.startTimer()}},mounted:function(){this.reset()},beforeDestroy:function(){this.pause()}};i.default=e},ec9c:function(t,i,a){"use strict";var e;a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return o})),a.d(i,"a",(function(){return e}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[t._t("default",null,{time:t.time,remain:t.timeData.remain,day:t.timeData.day,hour:t.timeData.hour,minute:t.timeData.minute,second:t.timeData.second})],2)},o=[]}}]);