const { mockAPI } = require('./utils')

const role = require('./api/role')
const security = require('./api/security')
const statistics = require('./api/statistics')
const user = require('./api/user')

const mocks = [
  ...role,
  ...security,
  ...statistics,
  ...user
]

for (const mock of mocks) {
  mockAPI(mock)
}

