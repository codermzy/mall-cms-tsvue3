import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/base.less'
// import './service/axios_demo'
// import zyRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

// registerApp(app)
// app.use(function(app){}) 如果传入一个函数，则在调用这个函数时会自动传入app对象

// 注册 element-plus/其他
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// zyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptors(config) {
//       console.log('单个请求成功的拦截')
//       return config
//     },
//     responseInterceptors(res) {
//       console.log('单个响应成功的拦截')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// // zyRequest
// //   .request<DataType>({
// //     url: '/home/multidata',
// //     method: 'GET',
// //     showLoading: false
// //   })
// //   .then((res) => {
// //     console.log(res)
// //   })
// zyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
