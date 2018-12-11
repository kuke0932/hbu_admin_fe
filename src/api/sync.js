/**
 *
 * @author Dragon
 * @create 2018-07-30 14:07
 **/

import request from '@/utils/request'
import qs from 'qs'

/**
 * 查询版本号
 * @param dataVersionType    DEPATMENT or USER
 */
export function listDataVersion(dataVersionType) {
  const data = {
    dataVersionType
  }
  return request({
    url: '/business/admin/syncLog/listDataVersion',
    method: 'get',
    params: data
  })
}

/**
 * 列表数据
 * @param toLocalSuccess
 * @param toWeWorkSuccess
 * @param version
 * @param pageNum
 * @param pageSize
 */
export function listDepartmentSync(toLocalSuccess, toWeWorkSuccess, version, pageNum, pageSize) {
  const data = {
    toLocalSuccess, toWeWorkSuccess, version, pageNum, pageSize
  }
  return request({
    url: '/business/admin/syncLog/listDepartmentSync',
    method: 'get',
    params: data
  })
}

/**
 *  获取变更记录
 */
export function doDepartmentSyncModified() {
  return request({
    url: '/business/admin/syncLog/doDepartmentSyncModified',
    method: 'post'
  })
}

/**
 * 中间库同步
 * @param ids
 */
export function doDepartmentSyncToLocal(ids) {
  const data = {
    ids
  }
  return request({
    url: '/business/admin/syncLog/doDepartmentSyncToLocal',
    method: 'post',
    data: qs.stringify(data)

  })
}

/**
 * 中间库全部同步
 * @param version 版本
 */
export function doAllDepartmentSyncToLocal(version) {
  const data = {
    version
  }
  return request({
    url: '/business/admin/syncLog/doAllDepartmentSyncToLocal',
    method: 'post',
    data: qs.stringify(data)

  })
}
/**
 *  同步微信
 * @param ids
 */
export function doDepartmentSyncToWeWork(ids) {
  const data = {
    ids
  }
  return request({
    url: '/business/admin/syncLog/doDepartmentSyncToWeWork',
    method: 'post',
    data: qs.stringify(data)

  })
}
/**
 * 全部同步到微信
 * @param version 版本
 */
export function doAllDepartmentSyncToWeWork(version) {
  const data = {
    version
  }
  return request({
    url: '/business/admin/syncLog/doAllDepartmentSyncToWeWork',
    method: 'post',
    data: qs.stringify(data)

  })
}

/**
 * 部门到本地进度
 */
export function getDepartmentLocalProgress() {
  return request({
    url: '/business/admin/syncLog/getDepartmentLocalProgress',
    method: 'get'
  })
}

/**
 * 部门到微信进度
 */
export function getDepartmentWeWorkProgress() {
  return request({
    url: '/business/admin/syncLog/getDepartmentWeWorkProgress',
    method: 'get'
  })
}

/**
 * 列表数据
 * @param toLocalSuccess
 * @param toWeWorkSuccess
 * @param version
 * @param pageNum
 * @param pageSize
 */
export function listUserSync(toLocalSuccess, toWeWorkSuccess, version, pageNum, pageSize) {
  const data = {
    toLocalSuccess, toWeWorkSuccess, version, pageNum, pageSize
  }
  return request({
    url: '/business/admin/syncLog/listUserSync',
    method: 'get',
    params: data
  })
}

/**
 * 用户变更
 */
export function doUserSyncModified() {
  return request({
    url: '/business/admin/syncLog/doUserSyncModified',
    method: 'post'
  })
}

/**
 * 中间库同步
 * @param id
 */
export function doUserSyncToLocal(ids) {
  const data = {
    ids
  }
  return request({
    url: '/business/admin/syncLog/doUserSyncToLocal',
    method: 'post',
    data: qs.stringify(data)

  })
}

/**
 * 中间库全部同步
 * @param version 版本
 */
export function doAllUserSyncToLocal(version) {
  const data = {
    version
  }
  return request({
    url: '/business/admin/syncLog/doAllUserSyncToLocal',
    method: 'post',
    data: qs.stringify(data)

  })
}
/**
 *  同步微信
 * @param ids
 */
export function doUserSyncToWeWork(ids) {
  const data = {
    ids
  }
  return request({
    url: '/business/admin/syncLog/doUserSyncToWeWork',
    method: 'post',
    data: qs.stringify(data)

  })
}
/**
 * 全部同步到微信
 * @param version 版本
 */
export function doAllUserSyncToWeWork(version) {
  const data = {
    version
  }
  return request({
    url: '/business/admin/syncLog/doAllUserSyncToWeWork',
    method: 'post',
    data: qs.stringify(data)

  })
}

/**
 * 部门到本地进度
 */
export function getUserLocalProgress() {
  return request({
    url: '/business/admin/syncLog/getUserLocalProgress',
    method: 'get'
  })
}

/**
 * 部门到微信进度
 */
export function getUserWeWorkProgress() {
  return request({
    url: '/business/admin/syncLog/getUserWeWorkProgress',
    method: 'get'
  })
}
