import axios from 'axios'
import baseURL from './baseUrl'
import {Notify} from 'vant';

const http = {}
const instance = axios.create({
    baseURL,
    timeout: 5000
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
      // //设置全局加载弹窗
      // Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true,
      //     // duration:0
      // });
      return config
  },
  function (error) {
      return Promise.reject(error)
  }
)


// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
      return response.data
  },
  err => {
      if (err && err.response) {
          switch (err.response.status) {
              case 400:
                  err.message = '请求出错'
                  break
              case 401:
                  // Message.warning({
                  //     message: '授权失败，请重新登录'
                  // })
                  // store.commit('LOGIN_OUT') //传值给vuex的mutation改变state
                  setTimeout(() => {
                      window.location.reload() //浏览器刷新当前页面
                  }, 1000)

                  return
              case 403:
                  err.message = '拒绝访问'
                  break
              case 404:
                  err.message = '请求错误,未找到该资源'
                  break
              case 500:
                  err.message = '服务器端出错'
                  break
          }
      } else {
          err.message = '连接服务器失败'
      }
      Notify({type: 'danger', message: err.message});
      return Promise.reject(err.response)
  }
)

http.get = function (url, options) {
  return new Promise((resolve, reject) => {
      instance
          .get(url, options)
          .then(response => {
              if (response.status === 200) {
                  resolve(response.data)
                  Notify({type: 'success', message: response.message});
              } else {
                  Notify({type: 'danger', message: response.message});
                  reject(response.message)
              }
          })
          .catch(e => {
              console.log(e)
          })
  })
}

http.post = function (url, data, options) {
  return new Promise((resolve, reject) => {
      instance
          .post(url, data, options)
          .then(response => {
              if (response.status === 200) {
                  resolve(response.data)
                //   Notify({type: 'primary', message: response.message});
              } else if (response.status === 501) {
                  Notify({type: 'warning', message: response.message});
              } else {
                  // Notify({type: 'danger', message: response.message});
                  reject(response.message)
              }
          })
          .catch(e => {
              console.log(e)
          })
  })
}

export default http