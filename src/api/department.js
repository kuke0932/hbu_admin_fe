/**
 *
 * @author zhaokaiyuan
 * @create 2018-01-11 9:52
 **/

import request from '@/utils/request'
import qs from 'qs'

/**
 * 一次性获取所有部门的树形结构（用户数据量小的情况）
 */
export function tree() {
  return request({
    url: '/system/admin/department/tree',
    method: 'get'
  })
}

/**
 * 用于只获取自己所管辖的部门树
 */
export function treeDepartment() {
  return request({
    url: '/system/admin/department/treeDepartment',
    method: 'get'
  })
}

/**
 * 根据父节点获取子节点列表
 *
 * @param parentId        父id
 * @param departmentName  部门名称
 * @param departmentType  部门类型：1.总部，2.车间，3.店铺，4.视觉团队，5.技术部
 * @param pageNum
 * @param pageSize
 */
export function listDepartmentByParentId(parentId, departmentName, departmentType, pageNum, pageSize) {
  const data = {
    parentId,
    departmentName,
    departmentType,
    pageNum,
    pageSize
  }
  return request({
    url: '/system/admin/department/listByParentId',
    method: 'get',
    params: data
  })
}

/**
 * 添加部门
 *
 * @param departmentName  部门名
 * @param parentId        父部门
 * @param departmentType  部门类型：1.总部，2.车间，3.店铺，4.视觉团队，5.技术部
 * @param departmentDesc  部门描述
 */
export function addDepartment(departmentName, parentId, departmentType, departmentDesc) {
  const data = {
    departmentName,
    parentId,
    departmentType,
    departmentDesc
  }
  return request({
    url: '/system/admin/department/save',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 根据id获取部门信息
 *
 * @param id 部门id
 */
export function getDepartmentById(id) {
  return request({
    url: '/system/admin/department/getById',
    method: 'get',
    params: { id }
  })
}

/**
 * 根据id修改部门信息
 *
 * @param id              部门id
 * @param departmentName  部门名
 * @param parentId        父部门
 * @param departmentType  部门类型：1.总部，2.车间，3.店铺，4.视觉团队，5.技术部
 * @param departmentDesc  部门描述
 */
export function updateDepartment(id, departmentName, parentId, departmentType, departmentDesc) {
  const data = {
    id,
    departmentName,
    parentId,
    departmentType,
    departmentDesc
  }
  return request({
    url: '/system/admin/department/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 根据部门id批量删除部门
 *
 * @param ids 部门id，多个id中间以，隔开
 */
export function removeByIds(ids) {
  const data = {
    ids
  }
  return request({
    url: '/system/admin/department/removeByIds',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 根据部门类型获取自己所管理的部门下拉
 *
 * @param departmentType 部门类型：1.总部，2.车间，3.店铺，4.视觉团队，5.技术部
 */
export function getSelections(departmentType) {
  const data = {
    departmentType
  }
  return request({
    url: '/system/admin/department/getSelectionsByType',
    method: 'get',
    params: data
  })
}

/**
 * 根据部门类型获取改类型的所有部门
 *
 * @param departmentType 部门类型：1.总部，2.车间，3.店铺，4.视觉团队，5.技术部
 */
export function getAllSelections(departmentType) {
  const data = {
    departmentType
  }
  return request({
    url: '/system/admin/department/getAllSelectionsByType',
    method: 'get',
    params: data
  })
}
