import axios from 'axios'
import {
  Message
} from 'element-ui'
axios.interceptors.request.use(config => {
  return config;
}, err => {
  Message.error({
    message: '请求超时!'
  });
  // return Promise.resolve(err);
});
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 500) {
    Message.error({
      message: data.data.msg
    });
    return;
  }
  if (data.data.msg) {
    Message.success({
      message: data.data.msg
    });
  }
  return data;
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({
      message: '服务器未连接⊙﹏⊙∥'
    });
  } else if (err.response.status === 403) {
    Message.error({
      message: '权限不足,请联系管理员!'
    });
  } else if (err.response.status === 401) {
    Message.error({
      message: err.response.data.msg
    });
  } else {
    if (err.response.data.msg) {
      Message.error({
        message: err.response.data.msg
      });
    } else {
      Message.error({
        message: '未知错误!'
      });
    }
  }
  // return Promise.resolve(err);
});
let base = '';
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;;charset=UTF-8'
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
};
export const cellStyles = ({row, column, rowIndex, columnIndex}) => {
  return "padding:2px;font-size:12px";
};
export const jsonToString = (json) => {
  var cache = [];
  var str = JSON.stringify(json, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null;
  return str;
};
export const toTreeData = (data) => {
  let result = [];
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.child;
  });
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  data.forEach(item => {
    let parent = map[item.parentClientId];
    if (parent&&item.component!="btn") {
      (parent.child || (parent.child = [])).push(item);
    } else {
      result.push(item);
    }
  });

  return result;
};

export const formatDateTime= (value)=> {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
};
