import { post, get } from '@/common/js/axios';

export const requestLogin = params => post(`/login`, params);

export const getUserList = params => get(`/user/list`, params);

export const getUserListPage = params => get(`/user/listpage`, params);

export const removeUser = params => get(`/user/remove`, params);

export const batchRemoveUser = params => get(`/user/batchremove`, params);

export const editUser = params => get(`/user/edit`, params);

export const addUser = params => get(`/user/add`, params);
