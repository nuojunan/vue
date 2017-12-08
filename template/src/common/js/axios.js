import axios from 'axios';
import store from '@/vuex/store';
//
const ajax = axios.create({
  baseURL: store.getters.serviceHost,
  timeout: 10000,
  withCredentials: true
});

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
      let ret = '';
      for (let it in data) {
        let val = data[it];
        if (val instanceof Array && val.length > 0 && (typeof val[0] !== 'object')) {
          val = encodeURIComponent(val);
        } else if (typeof val === 'object') {
          val = JSON.stringify(val);
        }
        ret += it + '=' + val + '&';
      }
      return ret;
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
      let ret = '';
      for (let it in data) {
        let val = data[it];
        if (val instanceof Array && val.length > 0 && (typeof val[0] !== 'object')) {
          val = encodeURIComponent(val);
        } else if (typeof (val) === 'object') {
          val = JSON.stringify(val);
        }
        ret += it + '=' + val + '&';
      }
      return ret;
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
  postJson,
  post,
  del,
  putJson,
  put
};
