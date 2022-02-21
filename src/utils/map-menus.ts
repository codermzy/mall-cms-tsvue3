import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu = null

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
        if (!firstMenu) {
          firstMenu = route
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(menus)
  return routes
}

export function pathMapBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// export function pathMapToMenu(userMenus: any[], currentPath: string) {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       console.log(menu.id)
//       return menu
//     }
//   }
// }
export function mapMenusToPermissions(userMenus: any[]) {
  const permission: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permission
}

export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetLeaf = (menuList: any) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leafKeys
}

export { firstMenu }
