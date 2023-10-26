

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 从本地存储中获取token
    if (token) {
      config.headers['token'] = token; // 添加token头部信息
    }
    console.log("111123")
    console.log(config)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据进行处理
    return response;
  },
  function (error) {
    // 对响应错误进行处理
    if (error.response.status === 401) {
      // 登录状态失效，跳转到登录页面
      alert("登陆失效，请重新登陆");
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

module.exports = instance;