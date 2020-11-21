import axios from 'axios'
//真的最终版
export function request(config) {
  
    //创建axios的实例
    const instance1=axios.create({
        baseURL:'http://152.136.185.210:8000/api/w6',
        timeout:80000
      })
    //axios的拦截器  全局拦截axios.interceptors
    //请求拦截
    instance1.interceptors.request.
    use(config=>{
      //1 config 中信息不符合服务器要求
      //2 每次发送网络请求， 界面显示请求图标
      //3 某些网络请求必须携带特殊参数（登录带token）
    return config
    },
    err=>{
    //  console.log(err);
    })
    //响应拦截
  instance1.interceptors.response.use(
    result=>{ 
    return result.data
    },
    err=>{
     })


      //发送真正的网络请求 返回值是promise对象
     return instance1(config)
}