import { createApp } from 'vue'
import { registerApp } from './global'
import "normalize.css"
import "./assets/css/index.css"

import  ftRequset   from './service'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store/index'

setupStore()

const app = createApp(App)

// 在use（store）前体检注册好routes，解决刷新没有路由的问题
registerApp(app)



app.use(router)
app.use(store)
app.mount('#app')

// console.log(process.env.VUE_APP_BASE_NAME);
// console.log(process.env.VUE_APP_BASE_URL);


// ftRequset.request({
//   url:'home/multidata',
//   method:"GET",
//   interceptors:{
//     requestInterceptor:(config) =>{
//       console.log('单独请求request');
//       return config
//     },
//     responseInterceptor:(res) =>{
//       console.log('单独响应的response');
//       return res
//     }
//   }
// })
// interface DataType {
//   data:any
//   returnCode:string
//   success:boolean
// }

// ftRequset.request<DataType>({
//   url:'home/multidata',
//   method:"GET",
//   // showLoadding:false
// }).then((res)=>{
//   console.log(res.data);
// })

