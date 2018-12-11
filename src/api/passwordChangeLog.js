import request from '@/utils/request'
// import qs from 'qs'

/**
 * 密码变更列表
 * @param changeType  变更类型 (1 手机号重置 2人脸识别重置 3人工申诉重置)
 * @param pageNum    页码
 * @param pageSize   页大小
 *
 * */

export function list(changeType, pageNum, pageSize = 1 << 30) {
  const data = {
    changeType,
    pageNum,
    pageSize
  }
  return request({
    url: '/business/admin/passwordLog/list',
    method: 'get',
    params: data
  })
}

/**
 * 密码变更详情
 * @param passwordChangeLogId
 * */

export function getInfo(passwordChangeLogId) {
  const data = {
    passwordChangeLogId
  }
  return request({
    url: '/business/admin/passwordLog/getInfo',
    method: 'get',
    params: data
  })
}
