import axios from 'axios'

axios.get('https://v1.hitokoto.cn/').then((res) => {
  console.log(res)
})

// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'codermzy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'mzy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

//4. axios的配置选项

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// axios
//   .get('/get', {
//     params: {
//       name: 'codermzy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// axios
//   .post('/post', {
//     data: {
//       name: 'mzy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 5.axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'mzy', age: 18 } }),
    axios.post('/post', { data: { name: 'mzy', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0])
    console.log(res[1])
  })

//6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1. 给请求添加token
    // 2. isLoading动画
    console.log(config)
    return config
  },
  (err) => {
    console.log(err)
    return err
  }
)

// fn1: 数据响应成功(服务器正常的返回了数据 20x)
axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return err
  }
)
