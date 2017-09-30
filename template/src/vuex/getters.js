// 这个 getHeaderTitle 函数会返回 headerTitle 的值
// 在 ES6 里你可以写成：
// export const getHeaderTitle = state => state.headerTitle;

export function getHeaderTitle (state) {
  return state.headerTitle;
};

export function serviceHost (state) {
  return state.serviceHost;
};

export function isLogin (state) {
  return state.isLogin;
};

export function unitName (state) {
  return state.unitName;
};

export function isRefresh (state) {
  return state.isRefresh;
};
