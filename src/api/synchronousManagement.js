import request from '@/utils/request'
// import qs from 'qs'

/**
 * 数据同步列表
 * @param pageNum    页码
 * @param pageSize   页大小
 * @param toLocalSuccess 同步到本地状态
 * @param toWeworkSuccess  同步到微信状态
 * @param version  版本号
 *
 * */

export function listDepartmentSync(toLocalSuccess, toWeworkSuccess, version, pageNum, pageSize = 1 << 30) {
  const data = {
    toLocalSuccess,
    toWeworkSuccess,
    version,
    pageNum,
    pageSize
  }
  return request({
    url: 'http://10.10.0.3:8082/business/admin/syncLog/listDepartmentSync',
    method: 'get',
    params: data
  })
}

