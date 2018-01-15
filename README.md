# Accessory app

### [小程序组件化开发框架: Wepy](https://github.com/Tencent/wepy)
### [微信小程序组件化开发框架wepy开发资源汇总](https://github.com/aben1188/awesome-wepy)

#### 环境初始化
1. ```cp .env.example .env```
2. ```npm install```
3. 运行 ```npm run watch``` 或 ```npm run dev```

#### 开发者工具使用

1. 使用`微信开发者工具`新建项目，本地开发选择`dist`目录。
2. `微信开发者工具`-->项目-->关闭ES6转ES5。<font style="color:red">重要：漏掉此项会运行报错。</font>
3. `微信开发者工具`-->项目-->关闭上传代码时样式自动补全 <font style="color:red">重要：某些情况下漏掉此项会也会运行报错。</font>
4. `微信开发者工具`-->项目-->关闭代码压缩上传 <font style="color:red">重要：开启后，会导致真机computed, props.sync 等等属性失效。[#270](https://github.com/wepyjs/wepy/issues/270)</font>
5. 项目根目录运行`wepy build --watch`，开启实时编译。
