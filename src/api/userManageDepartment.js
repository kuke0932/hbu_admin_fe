/**
 *
 * @author Dragon
 * @create 2018-07-30 14:07
 **/

import request from '@/utils/request'
import qs from 'qs'

/**
 * 根据用户id获取用户所管理的部门id集合
 *
 * @param userId 用户id
 */
export function listByUserId(userId) {
  const data = {
    userId
  }
  return request({
    url: '/system/admin/sysUserManageDepartment/listByUserId',
    method: 'get',
    params: data
  })
}

/**
 * 根据用户id获取用户所管理的部门id集合
 *
 * @param userId 用户id
 * @param departmentIds 部门id，多个id中间以“,”隔开
 */
export function setManageDepartments(userId, departmentIds) {
  const data = {
    userId,
    departmentIds
  }
  return request({
    url: '/system/admin/sysUserManageDepartment/setManageDepartments',
    method: 'post',
    data: qs.stringify(data)
  })
}
