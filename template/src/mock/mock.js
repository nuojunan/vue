import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;

const toParam = params => {
  if (!params) {
    return {};
  }
  let result = {};
  try {
    result = JSON.parse(params);
  } catch (e) {
    if (typeof params === 'string') {
      params.split('&').forEach(s => {
        if (s.length > 1) {
          let p = s.split('=');
          result[p[0]] = p[1];
        }
      });
      return result;
    }
  }
  return result;
};

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      status: 0,
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      status: 0,
      msg: 'failure'
    });
    // 登录
    mock.onPost('/login').reply(config => {
      let {username, password} = toParam(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });
          if (hasUser) {
            resolve([200, { status: 0, data: user }]);
          } else {
            resolve([200, { status: -1, data: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });
    // 获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            status: 0,
            data: mockUsers
          }]);
        }, 1000);
      });
    });
    // 获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            status: 0,
            totalRows: total,
            data: mockUsers
          }]);
        }, 1000);
      });
    });

    // 删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            status: 0,
            data: '删除成功'
          }]);
        }, 500);
      });
    });

    // 批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            status: 0,
            data: '删除成功'
          }]);
        }, 500);
      });
    });

    // 编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            status: 0,
            data: '编辑成功'
          }]);
        }, 500);
      });
    });

    // 新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            status: 0,
            data: '新增成功'
          }]);
        }, 500);
      });
    });
  }
};
