import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { // 首页
      path: '/',
      name: 'index',
      hidden: true,
      redirect: '/login'
   }, {
     path: '/index',
     name: '嵌套路由单页面',
     iconCls: 'el-icon-menu',
     component: (resolve) => require(['@/views/main/index.vue'], resolve),
     onlyPage: true,
     children: [
      {
        path: 'index',
        name: 'index1',
        component: (resolve) => require(['@/views/hello.vue'], resolve)
      }
     ]
   }, {
     path: '/web',
     name: '嵌套路由多页面',
     iconCls: 'el-icon-date',
     component: (resolve) => require(['@/views/main/index.vue'], resolve),
     children: [
      {
        path: 'index',
        name: 'index2',
        component: (resolve) => require(['@/views/hello.vue'], resolve)
      }, {
        path: 'abc',
        name: 'postcss样式测试',
        component: (resolve) => require(['@/views/test/index.vue'], resolve)
      }, {
        path: 'i18n',
        name: 'i18n测试',
        meta: {i18n: 'test/i18ntest'},
        component: (resolve) => require(['@/views/test/i18ntest.vue'], resolve)
      }, {
        path: 'from',
        name: '表单',
        component: (resolve) => require(['@/views/test/from.vue'], resolve)
      }, {
        path: 'list',
        name: '列表',
        component: (resolve) => require(['@/views/test/list.vue'], resolve)
      }, {
        path: '*',
        hidden: true,
        redirect: 'index2'
      }
    ]
  }, { // login
    path: '/login',
    hidden: true,
    component: (resolve) => require(['@/views/login/index.vue'], resolve)
   }, { // hello
     path: '/hello',
    //  hidden: true,
     name: '简单路由单页面',
     iconCls: 'el-icon-upload',
     component: (resolve) => require(['@/views/hello.vue'], resolve)
    }
  ]
});
