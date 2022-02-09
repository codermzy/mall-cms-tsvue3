const path = require('path')
module.exports = {
  // 配置方式一：Vue-Cli提供的属性
  outputDir: './build',
  // 配置方式二: 和webpack属性完全一致，最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components' //在vue-cli中已经默认配置 @ 为 src路径
  //     }
  //   }
  // }

  // 配置方式三:
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }
  }
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
