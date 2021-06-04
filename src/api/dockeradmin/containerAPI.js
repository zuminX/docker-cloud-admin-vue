import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 容器API的基地址
 */
const baseUrl = 'dockeradmin/container'

const infoAPI = {
  getAllContainer: new APIInfo('list', baseUrl)
}

/**
 * 获取所有容器信息
 */
export const getAllContainer = () => {
  return request(infoAPI.getAllContainer)
}
