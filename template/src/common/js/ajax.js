import axios from 'axios';
import store from '@/vuex/store';
//
const axiosBase = axios.create({
  baseURL: store.getters.serviceHost,
  timeout: 2000
});

const _ajax = {
      get (params) {
        axiosBase.get(params.url, {params: params.data}).then(function (response) {
            if (response.data.status === -10) {
              // 跳转登录
               return;
            }
            params.success(response.data);
        }).catch(function (error) {
              // 错误处理
             params.error(error);
        });
      },
      post (params) {
        axiosBase({
          url: params.url,
          method: 'post',
          responseType: 'text',
          transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
         }],
          data: params.data,
          headers: {
            // 非json提交
             'Content-Type': 'application/x-www-form-urlencoded'
           }
        }).then(function (response) {
            if (response.data.status === -10) {
                // 跳转登陆页面
                return;
            }
            params.success(response.data);
          }).catch(function (error) {
            // 错误处理
            params.error(error);
          });
      },
      postJson (params) {
        axiosBase({
          url: params.url,
          method: 'post',
          data: params.data
        }).then(function (response) {
            if (response.data.status === -10) {
                // 跳转登陆页面
                return;
            }
            params.success(response.data);
          }).catch(function (error) {
            // 错误处理
              params.error(error);
          });
      }
    };

class Ajax {};
Ajax.install = function(Vue) {
    console.log(11);
    Vue.prototype.$ajax = _ajax;
    console.log('注册');
};

export default Ajax;
