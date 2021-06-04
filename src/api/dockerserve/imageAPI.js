import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 镜像API的基地址
 */
const baseUrl = 'dockerserve/image'

const adminBaseUrl = 'dockerserve/admin/image'

const infoAPI = {
  searchByName: new APIInfo('listByName', adminBaseUrl),
  save: new APIInfo('save', adminBaseUrl, 'post')
}

/**
 * 搜索指定名称的镜像
 */
export const searchImage = (name, page, pageSize) => {
  return request(infoAPI.searchByName, { name, page, pageSize })
}

/**
 * 保存镜像
 */
export const saveImage = (form) => {
  return request(infoAPI.save, form)
}
