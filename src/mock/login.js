// import { param2Obj } from '@/utils'

// const userMap = {
//   admin: {
//     roles: ['admin'],
//     token: 'admin',
//     introduction: '我是超级管理员',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'admin'
//   },
//   editor: {
//     roles: ['editor'],
//     token: 'editor',
//     introduction: '我是编辑',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   }
// }

export default {
  loginByUsername: config => {
    return {
      status: 200,
      message: '',
      data: 'login'
    }
  },
  getUserInfo: config => {
    return {
      status: 200,
      message: '',
      data: {
        roles: ['editor'],
        token: 'editor',
        introduction: '我是编辑',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
      }
    }
  },
  logout: () => 'success',
  generateRoutes: () => {
    return {
      'status': 200,
      'message': '请求成功！',
      'data': [
        {
          'path': '',
          'component': '',
          'name': '系统管理',
          'meta': { 'icon': 'systemManagement', 'title': '系统管理', 'role': null, 'functionType': 1 },
          'children': [
            {
              'path': 'systemManagement/user/index',
              'component': 'systemManagement/user/index',
              'name': '用户管理',
              'meta': { 'icon': 'user', 'title': '用户管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '启用禁用',
                'meta': { 'icon': null, 'title': '启用禁用', 'functionType': 2, 'code': 'on_off' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/department/index',
              'component': 'systemManagement/department/index',
              'name': '部门管理',
              'meta': { 'icon': 'department', 'title': '部门管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/role/index',
              'component': 'systemManagement/role/index',
              'name': '角色管理',
              'meta': { 'icon': 'role', 'title': '角色管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/menu/index',
              'component': 'systemManagement/menu/index',
              'name': '菜单管理',
              'meta': { 'icon': 'menu', 'title': '菜单管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/menuAuthor/index',
              'component': 'systemManagement/menuAuthor/index',
              'name': '菜单授权管理',
              'meta': { 'icon': 'menuAuthor', 'title': '菜单授权管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/satisfy/index',
              'component': 'systemManagement/satisfy/index',
              'name': '需求维护',
              'meta': { 'icon': 'role', 'title': '需求维护', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/useCar/index',
              'component': 'systemManagement/useCar/index',
              'name': '用车信息发布',
              'meta': { 'icon': 'role', 'title': '用车信息发布', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/useInfo/index',
              'component': 'systemManagement/useInfo/index',
              'name': '用车管理',
              'meta': { 'icon': 'role', 'title': '用车管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/carType/index',
              'component': 'systemManagement/carType/index',
              'name': '车型管理',
              'meta': { 'icon': 'role', 'title': '车型管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/customer/index',
              'component': 'systemManagement/customer/index',
              'name': '客户信息',
              'meta': { 'icon': 'role', 'title': '客户信息', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/skil/index',
              'component': 'systemManagement/skil/index',
              'name': '资源管理-技术部',
              'meta': { 'icon': 'role', 'title': '资源管理-技术部', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/car/index',
              'component': 'systemManagement/car/index',
              'name': '新车上市',
              'meta': { 'icon': 'role', 'title': '新车上市', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除',
                'meta': { 'icon': null, 'title': '删除', 'functionType': 2, 'code': 'del' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加',
                'meta': { 'icon': null, 'title': '添加', 'functionType': 2, 'code': 'add' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '修改',
                'meta': { 'icon': null, 'title': '修改', 'functionType': 2, 'code': 'edit' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/area/index',
              'component': 'systemManagement/area/index',
              'name': '行政区划',
              'meta': { 'icon': 'menuAuthor', 'title': '行政区划', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/unit/index',
              'component': 'systemManagement/unit/index',
              'name': '单位管理',
              'meta': { 'icon': 'menuAuthor', 'title': '单位管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/supplier/index',
              'component': 'systemManagement/supplier/index',
              'name': '供应商管理',
              'meta': { 'icon': 'menuAuthor', 'title': '供应商管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            /* {
              'path': 'systemManagement/carType/index',
              'component': 'systemManagement/carType/index',
              'name': '车型管理',
              'meta': { 'icon': 'menuAuthor', 'title': '车型管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            }, */
            {
              'path': 'systemManagement/customVisit/index',
              'component': 'systemManagement/customVisit/index',
              'name': '回访管理',
              'meta': { 'icon': 'menuAuthor', 'title': '回访管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/complaint/index',
              'component': 'systemManagement/complaint/index',
              'name': '投诉管理',
              'meta': { 'icon': 'menuAuthor', 'title': '投诉管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/returnRecord/index',
              'component': 'systemManagement/returnRecord/index',
              'name': '退换货管理',
              'meta': { 'icon': 'menuAuthor', 'title': '退换货管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/repairRecord/index',
              'component': 'systemManagement/repairRecord/index',
              'name': '维修管理',
              'meta': { 'icon': 'menuAuthor', 'title': '维修管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '删除角色',
                'meta': { 'icon': null, 'title': '删除角色', 'functionType': 2, 'code': 'delRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/order/index',
              'component': 'systemManagement/order/index',
              'name': '订单管理',
              'meta': { 'icon': 'menuAuthor', 'title': '订单管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            }, {
              'path': '/systemManagement/order/orderDetail',
              'component': 'systemManagement/order/orderDetail',
              'name': '订单详情',
              'meta': { 'icon': null, 'title': '订单详情', 'functionType': 1, 'code': '' },
              'children': [],
              'hidden': true
            },
            {
              'path': 'systemManagement/printWaterWashMark/index',
              'component': 'systemManagement/printWaterWashMark/index',
              'name': '打印快递单水洗标',
              'meta': { 'icon': 'menuAuthor', 'title': '打印快递单水洗标', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            },
            {
              'path': 'systemManagement/clippingWorkPage/index',
              'component': 'systemManagement/clippingWorkPage/index',
              'name': '裁剪工人页面',
              'meta': { 'icon': 'menuAuthor', 'title': '裁剪工人页面', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            }, {
              'path': 'erp/processManagement/index',
              'component': 'erp/processManagement/index',
              'name': '工序管理',
              'meta': { 'icon': 'menuAuthor', 'title': '工序管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            }, {
              'path': 'erp/processHelpAdministration/index',
              'component': 'erp/processManagement/index',
              'name': '工序帮助管理',
              'meta': { 'icon': 'menuAuthor', 'title': '工序帮助管理', 'role': null, 'functionType': 1, 'code': '' },
              'children': [{
                'path': '',
                'component': '',
                'name': '添加角色',
                'meta': { 'icon': null, 'title': '添加角色', 'functionType': 2, 'code': 'addRole' },
                'children': [],
                'hidden': true
              }, {
                'path': '',
                'component': '',
                'name': '保存',
                'meta': { 'icon': null, 'title': '保存', 'functionType': 2, 'code': 'save' },
                'children': [],
                'hidden': true
              }]
            }]
        }
      ]
    }
  }
}
