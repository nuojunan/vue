# demo

###项目介绍
> A Vue.js project
>  是基于webpack + vue2 + MintUI 开发的前端项目


### 项目技术架构

***
*  vue  (https://cn.vuejs.org/v2/api/#mounted)
*  vue-router
*  vuex
*  axios
*  vue-i18n
*  mint.ui
*  webpack
***

### 备注
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))
代码编辑器使用ATOM：https://github.com/atom/atom/releases/tag/v1.15.0

```
# 项目使用命令

``` 
$ npm install -g vue-cli

$ vue init lindeyi/mint my-project

$ cd my-project

# install 安装项目目录下使用的第三方组件
# 如果网不好使用阿里的地址
# npm install --registry=https://registry.npm.taobao.org
$ npm install

# 启动开发服务，使用热加载方式 localhost:9090
$ npm run dev

# build 打包部署文件
$ npm run build

```
### 安装注意
***
* 首先需要安装node.js环境；
node.js的官网下载地址(https://nodejs.org/en/download/)

* 其次需要通过npm安装webpack插件；
$ npm install webpack -g
webpack中文介绍(http://webpackdoc.com/install.html)

***
# 目录结构
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js 资源
│   ├── components     // 各种组件
│   ├── views          // 各种视图
│   ├── vuex           // vuex状态管理器
│   ├── router		 // 路由配置器
│   ├── i18n		 // 国际化
│   ├── App.vue         // 主页面 
│   └── main.js        // Webpack 预编译入口
</pre>

# 代理配置
<pre>
# dev proxy settings to set proxyTable （in config/index.js）
# demo proxy http://127.0.0.1:8080/proxy
 proxyTable: {
       '/proxy': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/proxy': '/proxy'
          }
        }
 }
</pre>
 ```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
