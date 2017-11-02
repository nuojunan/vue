// 动态路由
class NjaRouter {};
NjaRouter.install = function(Vue, router, store) {
  console.log('注册njaRouter', Vue, router, store);
  store.state.nja_isLogin = false;
  const addRouters = function (data) {
     return new Promise(resolve => {
       console.log('加载动态路由！');
       sessionStorage.setItem('routers', JSON.stringify(data));
       data.forEach((item) => {
         if (item.src) {
           item.component = (resolve) => require(['@/' + item.src], resolve);
         }
         if (item.children) {
           item.children.forEach(childitem => {
             if (childitem.src) {
               childitem.component = (resolve) => require(['@/' + childitem.src], resolve);
             }
           });
         }
       });
       console.log('routerData', data);
       router.addRoutes(data);
       store.state.nja_routers = data.concat(router.options.routes);
       store.state.nja_isLogin = true;
       console.log('加载路由成功！');
       resolve();
     });
  };
  // 判断是否登录
  const isLogined = function () {
    return new Promise((resolve, reject) => {
        // 判断session是否有信息
        let user = sessionStorage.getItem('user');
        if (user) {
          let routerData = sessionStorage.getItem('routers');
          if (routerData) {
            addRouters(JSON.parse(routerData));
            return resolve();
          }
        }
        return reject();
    });
  };
    Vue.prototype.$NjaRouter = {
      isLogined,
      addRouters,
      routers () {
        return store.state.nja_routers;
      }
    };
    router.beforeEach(function (to, from, next) {
      if (to.path === '/login') {
         next();
       } else {
         if (!store.state.nja_isLogin) { // 未登录
           isLogined().then(() => { // 成功
              next(to.path);
           }).catch(() => { // 失败去登录
              next({path: '/login'});
           });
         } else {
           next();
         }
       }
    });
    console.log('注册');
};

export default NjaRouter;
