// 在http.js中引入axios
import axios from "axios"; // 引入axios
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件
import {
  Toast
} from 'vant';

//错误码可以单独放一个文件
// import errCode from 'errCode'
let errCode = {
  '00000': '请求失败',
  '00001': '用户名或密码不正确',
  '00002': '未登录',
  '00003': '用户名或密码不正确',
  '00004': '验证码错误',
  '00006': '角色正在使用中，不允许删除'
}
//实例配置
const service = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/mock" : "/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8;"
  },
  withCredentials: true, //允许携带cookie，需要后端配合
  timeout: 1000 * 60
});

/** 
 * 请求失败后的错误统一处理 
 */
const Err = error => {
  if (error && error.response) {
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。                
      case 401:
        Toast({
          message: '未登录，请登录',
          duration: 1000,
          onClose: () => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }
        });

        break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token
        // 跳转登录页面                
      case 403:
        Toast({
          message: '登录过期，请重新登录',
          duration: 1000,
          forbidClick: true
        });
        // 清除token
        localStorage.removeItem('token');
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 1000);
        break;

        // 404请求不存在
      case 404:
        Toast({
          message: '网络请求不存在',
          duration: 1500,
          forbidClick: true
        });
        break;
        // 其他错误，直接抛出错误提示
      default:
        Toast({
          message: error.response.data.message || '结果不是预期的',
          duration: 1500,
          forbidClick: true
        });
    }
  } else {
    Toast({
      message: '出错啦！',
      duration: 1500,
      forbidClick: true
    });
  }
  return Promise.reject(error)
}


// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['Access-Token'] = token
    }
    if (config.method === 'post') { //post方式需要序列化字符串
      config.data = QS.stringify(config.data)
    }
    return config
  }, Err)

//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    //未登录
    if (res.code == "00002" || res.code == -3) {

      sessionStorage.removeItem('token');
      location.href = "/login";

    } else if (res.code != 10000) {
      //请求成功返回了成功之外的结果
      return Promise.reject(response)

    } else {
      //请求成功
      return res.data || res
    }
  }, Err)



export default service;
