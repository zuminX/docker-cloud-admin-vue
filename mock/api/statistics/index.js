const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 统计信息API的基地址
 */
const baseUrl = 'statistics'

const statisticsAPI = {
  getRecentStatisticsUserData: new APIInfo('user/recentDate.*', baseUrl, 'get', true),
  getUserTotal: new APIInfo('user/total', baseUrl)
}

module.exports = [
  new MockInfo(statisticsAPI.getRecentStatisticsUserData, () => {
    return require('./data/recentUserData.json')
  }),
  new MockInfo(statisticsAPI.getUserTotal, () => {
    return require('./data/userTotal.json')
  })
]
