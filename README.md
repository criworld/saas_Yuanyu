## 项目安装

git clone https://brq5j1d.gfanx.pro/meta_front/saas_yuanyu
cd uni-vue2-pro  
npm install  
npm run dev:h5(参考 package.json 中的命令)

## 项目介绍

本项目基于 uni-app 框架开发的基础架构，可开箱即用  
本项目为 vue-cli 创建的项目，如需使用 hbuilderx，只需将整个项目全部导入 hbuilderx 即可  
使用本项目，需具备 vue/uni-app 相关知识  
本项目正在开发更多的组件以满足更多样的需求  
目前已实现一部分基础组件(sj-开头的组件)，以及换肤、富文本加载(mp-html 组件)、canvas 绘图/二维码生成(lime-painter 组件内)等功能，换肤功能，可输入/pages/setting/skin 自行查看  
mp-html/lime-painer 这两个组件来源于网络，感谢各自的开发者  
目前跨端支持 APP/H5/微信小程序，其他端未测试，如有需要，可自行修改调试  

## 项目访问地址

[点击此处访问H5](http://saas_app.gfanx.pro/#)  

复制本地址到浏览器访问： [](http://saas_app.gfanx.pro/#)

## 本地打包apk流程

1. 修该src/json的publishId
2. 创建keystore,配置package.json 放入keysotre_files/（publishId）中
3. 修改logo