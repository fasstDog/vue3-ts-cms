import axios from "axios";

// 导出的是axios的实例（对象）

// axios.request({
//   method:'GET'
// })

// 1.基本使用
axios.get('http://123.207.32.32:8000/home/multidata').then((res)=>{
  console.log(res);
})




// 2.Promise本身是有类型的
// new Promise<string>((reslove,reject)=>{
//   reslove('123')
// }).then((res)=>{
//   console.log(res.length);
// }).catch((err)=>{
//   console.log(err);
// })

// 3.axios的配置选项
// 全局配置
axios.defaults.baseURL = 'http://httpbin.org'
// 超时事件
axios.defaults.timeout = 1000

// axios.defaults.headers

// 4.get请求
axios.get('/get',{
  params:{
    name:'fasst',
    age:18
  },
  // 单独的配置
  timeout:5000
}).then((res)=>{
  console.log(res.data);

})

// 5.post请求
axios.post('/post',{
  data:{
    name:'fasst',
    age:18
  }
}).then((res)=>{
  console.log(res.data);
})



//6. axios.all  -->多个请求，一起返回
axios.all([
  axios.get('/get',{params:{name:'fsasst'}}),
  axios.post('/post',{data:{name:'fasst'}})
]).then((res)=>{
  console.log(...res);

})


// 7.axios拦截器
// 拦截请求(fn1请求成功执行,fn2请求失败执行)
axios.interceptors.request.use((config)=>{
  // 请求成功想做的操作
  // 1.添加token
  // 2.loding动画
  return config
},(err)=>{
  console.log(err);
})
// 拦截响应(fn1服务器正常返回数据 20x，fn2服务器响应失败 40x，50x)
axios.interceptors.response.use((res)=>{
  console.log('success interceptors');
  return res
},(err)=>{
  console.log('服务器响应失败');
})
