# Wepy app

#### [小程序组件化开发框架: Wepy](https://github.com/Tencent/wepy)
#### [微信小程序组件化开发框架wepy开发资源汇总](https://github.com/aben1188/awesome-wepy)

### 开发
1. ```npm install```
2. ```cp .env.example .env```
3. 修改.env中的环境变量
4. 运行 ```npm run watch``` 或 ```npm run dev```

### 开发者工具使用

1. 使用`微信开发者工具`新建项目，本地开发选择`dist`目录。
2. `微信开发者工具`-->详情-->关闭ES6转ES5。<font style="color:red">重要：漏掉此项会运行报错。</font>
3. `微信开发者工具`-->详情-->关闭上传代码时样式自动补全 <font style="color:red">重要：某些情况下漏掉此项会也会运行报错。</font>
4. `微信开发者工具`-->详情-->关闭代码压缩上传 <font style="color:red">重要：开启后，会导致真机computed, props.sync 等等属性失效。[#270](https://github.com/wepyjs/wepy/issues/270)</font>

### 功能
#### 使用包装后的request, 在src/common/request, page和component可以继承BasePage或BaseComponent, 使用this.http来调用接口，使用方法与axios类似

```js
  import wepy from 'wepy'
  import request from './common/request'; // 使用包装后的request
  export default class extends wepy.app {
    ......

    onLaunch() {
      request.interceptors.config = config => new Promise(resolve => { // config拦截器可返回Promise
        //设置api base url
        config.url = API_URL + config.url;
        resolve(config)
      })

      request.interceptors.fail = (error, config) => {
        // do something

        return Promise.reject(error)
      }

      request.interceptors.success = (response, config) => {
        // do something

        return Promise.resolve(response)
      }

      request.get('/foo', data, config).then(response => console.log(response)).catch(error => console.log(error))
    }
  }

  ......//component 里面


  import BaseComponent from "./base";

  export default class Foo extends BaseComponent {
    onLoad() {
      this.http.get('/foo', data, config).then(response => console.log(response)).catch(error => console.log(error))
    }
  }
```


#### 使用状态管理(wepy-redux), 封装后的方法在src/store里面,如下counter实例

```html
<template>
  <view>
    Num: {{ num }}
    <button @tap="addNum">Add num</button>
  </view>
</template>

<script>
  import BaseComponent from "./base";
  import {mapActions, mapGetters} from "../store";

  export default class Counter extends BaseComponent {
    computed = {
      ...mapGetters({
        num : 'counter.num'
      })
    }

    methods = {
      ...mapActions({
        addNum : 'counter.add'
      })
    }

    onLoad() {

    }
  }
</script>

```
