import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 应用API的基地址
 */
const baseUrl = 'dockerserve/application'

const adminBaseUrl = 'dockerserve/admin/application'

const infoAPI = {
  searchByName: new APIInfo('listByName', adminBaseUrl),
  save: new APIInfo('save', adminBaseUrl, 'post')
}

/**
 * 搜索指定名称的应用
 */
export const searchApplication = (name, page, pageSize) => {
  return request(infoAPI.searchByName, { name, page, pageSize })
}

/**
 * 保存应用
 */
export const saveApplication = (form) => {
  return request(infoAPI.save, form)
}
