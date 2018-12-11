import request from '@/utils/request'
// import qs from 'qs'

/**
 * 数据同步日志列表
 * @param pageNum    页码
 * @param pageSize   页大小
 * @param createTime 创建时间
 * @param status     状态
 * @param operator   操作人
 *
 * */

export function listSyncLog(operateDate, status, dataVersionType, pageNum, pageSize = 1 << 30) {
  const data = {
    operateDate,
    status,
    dataVersionType,
    pageNum,
    pageSize
  }
  return request({
    url: '/business/admin/syncLog/listSyncLog',
    method: 'get',
    params: data
  })
}
