import Mock from 'mockjs'
import loginAPI from './login'
// import userApi from './user'
// import departmentApi from './department'
// import roleApi from './role'
// import groupApi from './group'
// import menuApi from './menu'
// import carApi from './car'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/mock\/system\/admin\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/mock\/system\/admin\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/mock\/system\/admin\/getUserInfo/, 'get', loginAPI.getUserInfo)
// Mock.mock(/\/mock\/system\/admin\/generateRoutes/, 'get', loginAPI.generateRoutes)
//
// // 用户相关
// Mock.mock(/\/mock\/system\/admin\/sysUser\/listUser/, 'get', userApi.listUser)
// Mock.mock(/\/mock\/system\/admin\/sysUser\/addUser/, 'post', userApi.addUser)
// Mock.mock(/\/mock\/system\/admin\/sysUser\/updateUser/, 'post', userApi.updateUser)
// Mock.mock(/\/mock\/system\/admin\/sysUser\/removeUser/, 'post', userApi.removeUser)
// Mock.mock(/\/mock\/system\/admin\/sysUser\/getUserById/, 'get', userApi.getUserById)
// Mock.mock(/\/mock\/system\/admin\/sysUser\/updateStatus/, 'post', userApi.updateStatus)
//
// // 部门相关
// Mock.mock(/\/mock\/system\/admin\/sysDepartment\/treeDepartment/, 'get', departmentApi.treeDepartment)
// Mock.mock(/\/mock\/system\/admin\/sysDepartment\/listDepartmentByParentId/, 'get', departmentApi.listDepartmentByParentId)
//
// // 角色相关
// Mock.mock(/\/mock\/system\/admin\/sysRole\/list/, 'get', roleApi.listRole)
// Mock.mock(/\/mock\/system\/admin\/sysRole\/getRoleById/, 'get', roleApi.getRoleById)
// Mock.mock(/\/mock\/system\/admin\/sysRole\/addRole/, 'post', roleApi.addRole)
// Mock.mock(/\/mock\/system\/admin\/sysRole\/updateRole/, 'post', roleApi.updateRole)
// Mock.mock(/\/mock\/system\/admin\/sysRole\/removeRole/, 'post', roleApi.removeRole)
//
// // 群组相关
// Mock.mock(/\/mock\/system\/admin\/sysGroup\/listGroup/, 'get', groupApi.listGroup)
// Mock.mock(/\/mock\/system\/admin\/sysGroup\/removeGroup/, 'post', groupApi.removeGroup)
// Mock.mock(/\/mock\/system\/admin\/sysGroup\/addGroup/, 'post', groupApi.addGroup)
// Mock.mock(/\/mock\/system\/admin\/sysGroup\/updateGroup/, 'post', groupApi.updateGroup)
// Mock.mock(/\/mock\/system\/admin\/sysGroup\/showGroupUsers/, 'get', groupApi.showGroupUsers)
// Mock.mock(/\/mock\/system\/admin\/sysGroup\/removeUserFromGroup/, 'post', groupApi.removeUserFromGroup)
// Mock.mock(/\/mock\/system\/admin\/sysGroup\/addUserToGroup/, 'post', groupApi.addUserToGroup)
//
// // 菜单相关
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/tree/, 'get', menuApi.treeFunction)
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/getById/, 'get', menuApi.getFunctionById)
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/remove/, 'post', menuApi.removeFunction)
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/add/, 'post', menuApi.addFunction)
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/update/, 'post', menuApi.updateFunction)
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/listRoleByFunctionId/, 'get', menuApi.listRoleByFunctionId)
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/addRoleToFunction/, 'post', menuApi.addRoleToFunction)
// Mock.mock(/\/mock\/system\/admin\/sysFunction\/removeRoleFromFunction/, 'post', menuApi.removeRoleFromFunction)

export default Mock
