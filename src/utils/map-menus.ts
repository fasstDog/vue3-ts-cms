import { IBreadcrumb } from "@/base-ui/breadcrumb";
import { RouteRecord } from "vue-router";
let firstMenu :any

export function mapMenusToRoutes(userMenus:any[]):RouteRecord[]{
  const routes :RouteRecord[] =[]

  //1.先去加载所有的routes
  const allRoutes:RouteRecord[] =[]
      // 1.1递归找到m/router/main下所有的.ts文件
  const routeFiles = require.context('../router/main',true,/\.ts/)

   routeFiles.keys().forEach((key)=>{
     const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
   })


  // 2.根据菜单userMenus来添加对应的routes
   const _recurseGetRoute = (menus:any[]) => {
    for(const menu of menus){
      if(menu.type === 2){
        const route = allRoutes.find((route)=>{
          return route.path === menu.url
        })
        if(route) {
          routes.push(route)
          if(!firstMenu){
            firstMenu = menu
          }
        }
      }else{
        _recurseGetRoute(menu.children)
      }
    }
   }

   _recurseGetRoute(userMenus)

  return routes
}

export function pathMapBreadcrumbs(userMenus:any[],currentPath:string,){
  const breadcrumbs:IBreadcrumb[] =[]

  pathMaoToMenu(userMenus,currentPath,breadcrumbs)

  return breadcrumbs
}

export function pathMaoToMenu(userMenus:any[],currentPath:string,breadcrumbs?:IBreadcrumb[]):any{
  for(const menu of userMenus){
    if(menu.type === 1){
      // 表示是一级菜单，找孩子
      const findMenu = pathMaoToMenu(menu.children ?? [],currentPath)
      if(findMenu){
        breadcrumbs?.push({name:menu.name})
        breadcrumbs?.push({name:findMenu.name})
        return findMenu
      }
    }else if (menu.type ===2 && menu.url === currentPath){
      return menu
    }
  }
}

// 拿到按钮的权限
export function mapMenusToPermissions(userMenus:any[]){
  const permissions:string[]=[]

  // 获取权限
  const _recurseGetPermission = (menus:any[])=>{
    for(const menu of menus){
      if(menu.type === 1 || menu.type === 2){
        _recurseGetPermission(menu.children ?? [])
      }else if(menu.type === 3){
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export { firstMenu }


// export function pathMapBreadcrumbs(userMenus:any[],currentPath:string,){
//   const breadcrumbs:IBreadcrumb[] =[]

//   for(const menu of userMenus){
//     if(menu.type === 1){
//       // 表示是一级菜单，找孩子
//       const findMenu = pathMaoToMenu(menu.children ?? [],currentPath)
//       if(findMenu){
//         breadcrumbs.push({name:menu.name,path:menu.url})
//         breadcrumbs.push({name:findMenu.name,path:findMenu.url})
//         return findMenu
//       }
//     }else if (menu.type ===2 && menu.url === currentPath){
//       return menu
//     }
//   }
//   return breadcrumbs
// }

// export function pathMaoToMenu(userMenus:any[],currentPath:string):any{
//   for(const menu of userMenus){
//     if(menu.type === 1){
//       // 表示是一级菜单，找孩子
//       const findMenu = pathMaoToMenu(menu.children ?? [],currentPath)
//       if(findMenu){
//         return findMenu
//       }
//     }else if (menu.type ===2 && menu.url === currentPath){
//       return menu
//     }
//   }
// }
