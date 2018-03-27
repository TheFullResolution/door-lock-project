import { createSelector } from 'reselect'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'
import { getData, getUsers } from './dataSelectors'

export const getLogs = createSelector(getData, ({ logs }) => logs)

const logsReduce = (data, data2, fn) =>
  reduce(
    data,
    (result, business, key) => {
      ;(result[key] || (result[key] = [])).push(...fn(business, data2))
      return result
    },
    {}
  )

const logsBusinessMap = (data, users) =>
  map(data, (log, id) => ({
    ...log,
    id,
    username: `${users[log.user].name} ${users[log.user].lastname}`
  }))

export const getLogsWithUserName = createSelector(
  getLogs,
  getUsers,
  (logs, users) =>
    logs && users ? logsReduce(logs, users, logsBusinessMap) : null
)
