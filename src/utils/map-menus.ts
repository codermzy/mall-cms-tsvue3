import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 加载router/main下的所有.ts文件
  // 参数一：加载路径 参数二：是否递归查找 参数三: 正则表达式, 加载.ts结尾的文件
  const routeFiles = require.context('../router/main', true, /\.ts$/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRouter)
  // 2.根据菜单获取需要添加的routes

  // type ===1 -> children type === 1
  // type ===2 => url -> router
  // 递归获取后端返回的所有的路由对象
  const _recurseGetRoute = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 如果后端不管任何用户都直接返回给我们所有的路由时
        // 我们就需要判断 menu.url和route.path一致时，在进行加载
        const route = allRoutes.find((route) => route.path === menu.url)
        routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(menus)
  return routes
}
