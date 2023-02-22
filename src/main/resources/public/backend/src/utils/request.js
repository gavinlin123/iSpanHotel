import axios from "axios"; //導入axios

const request = axios.create({
  // baseURL: "http://localhost:8080", // 注意！！ 這裡是全域統一加上了 後端介面首碼 首碼，後端必須進行跨域配置！
  baseURL: "/api", // 注意！！ 這裡是全域統一加上了 後端介面首碼 首碼，後端必須進行跨域配置！
  timeout: 5000,
});

// // // request 攔截器
// // // 可以自請求發送前對請求做一些處理
// // // 比如統一加token，對請求參數統一加密
request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    // config.headers['token'] = user.token;  // 設置請求頭
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 攔截器
// 可以在介面回應後統一處理結果
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    // 如果是返回的檔
    if (response.config.responseType === "blob") {
      return res;
    }
    // 相容服務端返回的字串資料
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    return res;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
