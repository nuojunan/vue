import axios from 'axios';
import store from '@/vuex/store';
//
const ajax = axios.create({
  baseURL: store.getters.serviceHost,
  timeout: 10000,
  withCredentials: true
});

const param2String = data => {
  let ret = '';
  for (let it in data) {
    let val = data[it];
    if (typeof val === 'object' && //
        (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
      val = JSON.stringify(val);
    }
    ret += it + '=' + encodeURIComponent(val) + '&';
  }
  if (ret.length > 0) {
    ret = ret.substring(0, ret.length - 1);
  }
  return ret;
};

const get = (url, params) => ajax.get(url, { params: params }).then((res) => {
  if (res.status === 200 && res.data.status !== 0) {
      return Promise.reject(res.data);
  }
  return res.data;
}).catch(error => {
  if ('status' in error) {
    return Promise.reject(error);
  }
  return Promise.reject({data: error.message});
});

const download = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      let iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      // iframe.id = 'NJA_FRAME_ID';
      let ps = param2String(params);
      if (url.indexOf('?') !== -1) {
        url += ('&' + ps);
      } else {
        url += ('?' + ps);
      }
      iframe.onload = function () {
        // TODO 这下载不调用问题
        document.body.removeChild(iframe);
      };
      iframe.src = store.getters.serviceHost + url;
      setTimeout(() => {
        resolve('ok');
      }, 1000);
      window.addEventListener('message', function(error) {
        let res = JSON.parse(error.data);
        if (res && typeof res === 'object' && 'status' in res && res.status !== 0) {
          reject(res);
        }
      });
      document.body.appendChild(iframe);
    } catch (e) {
      reject({data: 'error', status: -1});
    }
  });
};

const postJson = (url, params) => ajax({
    url: url,
    method: 'post',
    data: params
  }).then((res) => {
    if (res.status === 200 && res.data.status !== 0) {
        return Promise.reject(res.data);
    }
    return res.data;
  }).catch(error => {
    if ('status' in error) {
      return Promise.reject(error);
    }
    return Promise.reject({data: error.message});
  });

const post = (url, params) => ajax({
    url: url,
    method: 'post',
    responseType: 'text',
    transformRequest: [function (data) {
      return param2String(data);
   }],
    data: params,
    headers: {
      // 非json提交
       'Content-Type': 'application/x-www-form-urlencoded'
     }
  }).then((res) => {
    if (res.status === 200 && res.data.status !== 0) {
        return Promise.reject(res.data);
    }
    return res.data;
  }).catch(error => {
    if ('status' in error) {
      return Promise.reject(error);
    }
    return Promise.reject({data: error.message});
  });

const del = (url, params) => ajax.delete(url, { params: params }).then((res) => {
  if (res.status === 200 && res.data.status !== 0) {
      return Promise.reject(res.data);
  }
  return res.data;
}).catch(error => {
  if ('status' in error) {
    return Promise.reject(error);
  }
  return Promise.reject({data: error.message});
});

const putJson = (url, params) => ajax({
    url: url,
    method: 'put',
    data: params
  }).then((res) => {
    if (res.status === 200 && res.data.status !== 0) {
        return Promise.reject(res.data);
    }
    return res.data;
  }).catch(error => {
    if ('status' in error) {
      return Promise.reject(error);
    }
    return Promise.reject({data: error.message});
  });

const put = (url, params) => ajax({
    url: url,
    method: 'put',
    responseType: 'text',
    transformRequest: [function (data) {
      return param2String(data);
   }],
    data: params,
    headers: {
      // 非json提交
       'Content-Type': 'application/x-www-form-urlencoded'
     }
  }).then((res) => {
    if (res.status === 200 && res.data.status !== 0) {
        return Promise.reject(res.data);
    }
    return res.data;
  }).catch(error => {
    if ('status' in error) {
      return Promise.reject(error);
    }
    return Promise.reject({data: error.message});
  });

export {
  ajax,
  get,
  download,
  postJson,
  post,
  del,
  putJson,
  put
};
