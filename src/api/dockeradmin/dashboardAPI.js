import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 仪表板API的基地址
 */
const baseUrl = 'dockeradmin/dashboard'

const infoAPI = {
  getStats: new APIInfo('stats', baseUrl)
}

/**
 * 获取Docker统计信息
 */
export const getStats = () => {
  return request(infoAPI.getStats)
}
