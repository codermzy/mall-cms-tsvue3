// 在开发中，有时候我们需要根据不同的环境设置不同的环境变量，常见的有三种环境
// 开发环境：development；
// 生产环境：production；
// 测试环境：test；

// 1. 手动修改不同的变量；
// const BASE_URL = 'http://codermzy.org/dev'
// const BASE_NAEM = 'codermzy'

// const BASE_URL = 'http://codermzy.org/prod'
// const BASE_NAEM = 'coderwhy'

// const BASE_URL = 'http://codermzy.org/test'
// const BASE_NAEM = 'xiaomi'

// 2. 通过process.env.NODE.ENV的值进行区分
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://codermzy.org/test'
}

export { BASE_URL, TIME_OUT }

// 方式三：编写不同的环境变量配置文件；
// 见根目录中的 .env.development  .env.production  .env.test
// 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。你可以在应用
// 除了 VUE_APP_* 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：
// NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。
// BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径
