import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 镜像API的基地址
 */
const baseUrl = 'dockeradmin/image'

const infoAPI = {
  getAllImage: new APIInfo('list', baseUrl)
}

/**
 * 获取所有镜像信息
 */
export const getAllImage = () => {
  return request(infoAPI.getAllImage)
}
