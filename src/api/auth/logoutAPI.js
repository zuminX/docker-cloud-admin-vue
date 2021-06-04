import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 注销API的基地址
 */
const baseUrl = 'auth/logout'

const logoutAPI = {
  logout: new APIInfo('logout', baseUrl, 'delete')
}

/**
 * 获取验证码
 */
export const logout = () => {
  return request(logoutAPI.logout)
}
