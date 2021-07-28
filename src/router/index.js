import Vue from 'vue'
import Router from 'vue-router'
import request from '../utils/request'
import _this from '../main'

// import Signin from '@/views/Signin.vue'
import Index from '@/views/Index.vue'
const Signin = () => import('../views/Signin.vue')
// const Index = () => import('../views/Index.vue')

import centerCart from '@/components/CenterManager/centerCart'
import equipCart from '@/components/CenterManager/equipCart'
import userCart from '@/components/CenterManager/userCart'
// const centerCart = () => import('../components/CenterManager/centerCart')
// const equipCart = () => import('../components/CenterManager/equipCart')
// const userCart = () => import('../components/CenterManager/userCart')

import roleAuthority from '@/components/SystemManage/roleAuthority'
import authorityInterface from '@/components/SystemManage/authorityInterface'
import roleList from '@/components/SystemManage/roleList'
// const roleAuthority = () => import('../components/SystemManage/roleAuthority')
// const authorityInterface = () => import('../components/SystemManage/authorityInterface')
// const roleList = () => import('../components/SystemManage/roleList')

import guardList from '@/components/EnterpriseManage/GuardManage/guardList'
import tagList from '@/components/EnterpriseManage/TagManage/tagList'
import equipList from '@/components/EnterpriseManage/EquipManage/equipList'
import equipHistory from '@/components/EnterpriseManage/EquipManage/equipHistory'
// const guardList = () => import('../components/EnterpriseManage/GuardManage/guardList')
// const tagList = () => import('../components/EnterpriseManage/TagManage/tagList')
// const equipList = () => import('../components/EnterpriseManage/EquipManage/equipList')
// const equipHistory = () => import('../components/EnterpriseManage/EquipManage/equipHistory')

import userList from '@/components/EnterpriseManage/StaffManage/userList'
import roleList1 from '@/components/EnterpriseManage/StaffManage/roleList1'
import roleList2 from '@/components/EnterpriseManage/StaffManage/roleList2'
import roleList3 from '@/components/EnterpriseManage/StaffManage/roleList3'
import roleList4 from '@/components/EnterpriseManage/StaffManage/roleList4'
// const userList = () => import('../components/EnterpriseManage/StaffManage/userList')
// const roleList1 = () => import('../components/EnterpriseManage/StaffManage/roleList1')
// const roleList2 = () => import('../components/EnterpriseManage/StaffManage/roleList2')
// const roleList3 = () => import('../components/EnterpriseManage/StaffManage/roleList3')
// const roleList4 = () => import('../components/EnterpriseManage/StaffManage/roleList4')

import checkedList from '@/components/EnterpriseManage/CheckManage/checkedList'
import checkDetail from '@/components/EnterpriseManage/CheckManage/checkDetail'
// const checkedList = () => import('../components/EnterpriseManage/CheckManage/checkedList')
// const checkDetail = () => import('../components/EnterpriseManage/CheckManage/checkDetail')

import formInbox from '@/components/EnterpriseManage/SafeManage/formInbox'
import formDetail from '@/components/EnterpriseManage/SafeManage/formDetail'
import equipInform from '@/components/EnterpriseManage/SafeManage/equipInform'
import informDetail from '@/components/EnterpriseManage/SafeManage/informDetail'
// const formInbox = () => import('../components/EnterpriseManage/SafeManage/formInbox')
// const formDetail = () => import('../components/EnterpriseManage/SafeManage/formDetail')
// const equipInform = () => import('../components/EnterpriseManage/SafeManage/equipInform')
// const informDetail = () => import('../components/EnterpriseManage/SafeManage/informDetail')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'Signin',
      // component: resolve => require(['@/views/Signin.vue'],resolve)
      component: Signin
    },
    {
      path: '/index',
      name: 'Index',
      // component: resolve => require(['@/views/Index.vue'],resolve),
      component: Index,
      redirect: '/centercart',
      children: [
        {
          path: '/centercart',
          name: 'centerCart',
          // component: resolve => require(['@/components/CenterManager/centerCart'],resolve),
          component: centerCart
        },
        {
          path: '/equipcart',
          name: 'equipCart',
          // component: resolve => require(['@/components/CenterManager/equipCart'],resolve),
          component: equipCart
        },
        {
          path: '/usercart',
          name: 'userCart',
          // component: resolve => require(['@/components/CenterManager/userCart'],resolve),
          component: userCart
        },
        {
          path: '/roleauthority',
          name: 'roleAuthority',
          // component: resolve => require(['@/components/SystemManage/roleAuthority'],resolve),
          component: roleAuthority
        },
        {
          path: '/authorityinterface',
          name: 'authorityInterface',
          // component: resolve => require(['@/components/SystemManage/authorityInterface'],resolve),
          component: authorityInterface
        },
        {
          path: '/rolelist',
          name: 'roleList',
          // component: resolve => require(['@/components/SystemManage/roleList'],resolve),
          component: roleList
        },
        {
          path: '/guardlist',
          name: 'guardList',
          // component: resolve => require(['@/components/EnterpriseManage/GuardManage/guardList'],resolve),
          component: guardList
        },
        {
          path: '/taglist',
          name: 'tagList',
          // component: resolve => require(['@/components/EnterpriseManage/TagManage/tagList'],resolve),
          component: tagList
        },
        {
          path: '/equiplist',
          name: 'equipList',
          // component: resolve => require(['@/components/EnterpriseManage/EquipManage/equipList'],resolve),
          component: equipList
        },
        {
          path: '/equiphistory',
          name: 'equipHistory',
          // component: resolve => require(['@/components/EnterpriseManage/EquipManage/equipHistory'],resolve),
          component: equipHistory
        },
        {
          path: '/userlist',
          name: 'userList',
          // component: resolve => require(['@/components/EnterpriseManage/StaffManage/userList'],resolve),
          component: userList
        },
        {
          path: '/rolelist1',
          name: 'roleList1',
          // component: resolve => require(['@/components/EnterpriseManage/StaffManage/roleList1'],resolve),
          component: roleList1
        },
        {
          path: '/rolelist2',
          name: 'roleList2',
          // component: resolve => require(['@/components/EnterpriseManage/StaffManage/roleList2'],resolve),
          component: roleList2
        },
        {
          path: '/rolelist3',
          name: 'roleList3',
          // component: resolve => require(['@/components/EnterpriseManage/StaffManage/roleList3'],resolve),
          component: roleList3
        },
        {
          path: '/rolelist4',
          name: 'roleList4',
          // component: resolve => require(['@/components/EnterpriseManage/StaffManage/roleList4'],resolve),
          component: roleList4
        },
        {
          path: '/checkedlist',
          name: 'checkedList',
          // component: resolve => require(['@/components/EnterpriseManage/CheckManage/checkedList'],resolve),
          component: checkedList
        },
        {
          path: '/checkdetail',
          name: 'checkDetail',
          // component: resolve => require(['@/components/EnterpriseManage/CheckManage/checkDetail'],resolve),
          component: checkDetail
        },
        {
          path: '/forminbox',
          name: 'formInbox',
          // component: resolve => require(['@/components/EnterpriseManage/SafeManage/formInbox'],resolve),
          component: formInbox
        },
        {
          path: '/formdetail',
          name: 'formDetail',
          // component: resolve => require(['@/components/EnterpriseManage/SafeManage/formDetail'],resolve),
          component: formDetail
        },
        {
          path: '/equipinform',
          name: 'equipInform',
          // component: resolve => require(['@/components/EnterpriseManage/SafeManage/equipInform'],resolve),
          component: equipInform
        },
        {
          path: '/informetail',
          name: 'informDetail',
          // component: resolve => require(['@/components/EnterpriseManage/SafeManage/informDetail'],resolve),
          component: informDetail
        }
      ]
    }
  ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/signin') {
    // next();
    // request.localStorageSet('token',null)
    let token = request.localStorageGet('token');
    console.log(token)
    if (!token) {
      next();
    } else {
      next('index');
      request.message(_this, '您已登陆', 'warning')
    }
  } else {
    let token = request.localStorageGet('token');
    console.log(token)
    if (!token) {
      // next('/signin');
      next({
        path: '/signin',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
      request.message(_this,'请先登陆','warning')
    } else {
      next();
    }
  }
});

export default router;
// 手动跳转的页面白名单
// const whiteList = [
//   '/'
// ];

// 默认不需要权限的页面
// export const constantRouterMap = [
//   {
//     path: '/',
//     redirect: '/signin',
//   },
//   {
//     path: '/signin',
//     name: 'Signin',
//     component: (resolve) => require(['@/views/Signin.vue'], resolve)
//   },
// ];

// 注册路由
// export const router = new Router({
//   routes: constantRouterMap
// });

// 异步路由（需要权限的页面）
// 动态需要根据权限加载的路由表
// export const asyncRouterMap = [
//   {
//       path: '/manageindex',
//       name: 'Manageindex',
//       meta: {
//         permission: []
//       },
//       component: (resolve) => require(['@/views/Roleindex.vue'], resolve)
//   },
//   {
//       path: '*',
//       redirect: '/404',
//   }
// ];

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
// function routerMatch(permission, asyncRouter) {
//   return new Promise((resolve) => {
//     const routers = [];
//     // 创建路由
//     function createRouter(permission) {
//          // 根据路径匹配到的router对象添加到routers中即可
//       permission.forEach((item) => {
//         if (item.children && item.children.length) {
//           createRouter(item.children)
//         }
//         let path = item.path;
//         // 循环异步路由，将符合权限列表的路由加入到routers中
//         asyncRouter.find((s) => {
//           if (s.path === '') {
//             s.children.find((y) => {
//               if (y.path === path) {
//                 y.meta.permission = item.permission;
//                 routers.push(s);
//               }
//             })
//           }
//           if (s.path === path) {
//             s.meta.permission = item.permission;
//             routers.push(s);
//           }
//         })
//       })
//     }

//     createRouter(permission)
//     resolve([routers])
//   })
// };

// router.beforeEach((to, form, next) => {
//   if (sessionStorage.getItem('token')) {
//     if (to.path === '/') {
//       router.replace('/index')
//     } else {
//       console.log(store.state.list.length);
//       if (store.state.list.length === 0) {
//           //如果没有权限列表，将重新向后台请求一次
//         store.dispatch('getPermission').then(res => {
//             //调用权限匹配的方法
//           routerMatch(res, asyncRouterMap).then(res => {
//               //将匹配出来的权限列表进行addRoutes
//             router.addRoutes(res[0]);
//             next(to.path)
//           })
//         }).catch(() => {
//           router.replace('/')
//       } else {
//         if (to.matched.length) {
//           next()
//         } else {
//           router.replace('/')
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) >= 0) {
//       next()
//     } else {
//       router.replace('/')
//     }
//   }
// });
