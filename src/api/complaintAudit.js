import request from '@/utils/request'
import qs from 'qs'

/**
 * 申诉审核列表
 * @param pageNum    页码
 * @param pageSize   页大小
 * @param account    账户
 * @param mobile     手机号
 * @param auditStatus   审核状态
 *
 * */

export function list(account, mobile, auditStatus, pageNum, pageSize = 1 << 30) {
  const data = {
    account,
    mobile,
    auditStatus,
    pageNum,
    pageSize
  }
  return request({
    url: '/business/admin/complaintPasswordAudit/list',
    method: 'get',
    params: data
  })
}

/**
 * 根据id获取申诉详情
 * @param id
 *
 * */

export function detail(id) {
  const data = {
    id
  }
  return request({
    url: '/business/admin/complaintPasswordAudit/detail',
    method: 'get',
    params: data
  })
}

/**
 * 审核
 * @param id
 *
 * */

export function audit(id, auditStatus, reason) {
  const data = {
    id,
    auditStatus,
    reason
  }
  return request({
    url: '/business/admin/complaintPasswordAudit/audit',
    method: 'post',
    data: qs.stringify(data)
  })
}
