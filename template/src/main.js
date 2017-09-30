// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import FastClick from 'fastclick';
import router from './router';
import i18n from './i18n';
{{#if_eq demoConfig "Mobile"}}
import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
{{/if_eq}}
{{#if_eq demoConfig "PC"}}
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Mock from './mock';
{{/if_eq}}
import store from './vuex/store';
import ajax from './common/js/ajax';

{{#if_eq demoConfig "Mobile"}}
Vue.use(Mint);
{{/if_eq}}
{{#if_eq demoConfig "PC"}}
Vue.use(ElementUI);
Mock.bootstrap();
{{/if_eq}}
Vue.use(ajax);

// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
    error: require('./assets/img/404.png'),
    loading: require('./assets/img/loading.png'),
    attempt: 1
  }
);

Vue.config.productionTip = false;
// 标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title;
  }
});
{{#if_eq demoConfig "Mobile"}}
router.beforeEach(function (to, from, next) {
  Mint.Indicator.open();
  next();
});
{{/if_eq}}

{{#if_eq demoConfig "Mobile"}}
router.afterEach(function (to) {
  setTimeout(() => {
      Mint.Indicator.close();
  }, 500);
});
{{/if_eq}}
{{#if_eq demoConfig "Mobile"}}
// 加载
Vue.prototype.$loading = Mint.Indicator;
Vue.prototype.$message = Mint.MessageBox;
// 移动端点击延迟问题处理
FastClick.attach(document.body);
{{/if_eq}}
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
});
