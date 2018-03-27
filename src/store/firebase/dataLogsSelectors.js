import { createSelector } from 'reselect'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'
import sortBy from 'lodash-es/sortBy'
import slice from 'lodash-es/slice'
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
  map(logSortByTimeDesc(data), (log, id) => ({
    ...log,
    id,
    username: users[log.user]
      ? `${users[log.user].name} ${users[log.user].lastname}`
      : ''
  }))

const logSortByTimeDesc = data => sortBy(data, o => o.timestamp).reverse()

export const getLogsWithUserName = createSelector(
  getLogs,
  getUsers,
  (logs, users) => logs && users && logsReduce(logs, users, logsBusinessMap)
)

export const makeGetLogsByIDwithLimit = (id, limit) =>
  createSelector(getLogsWithUserName, logs => {
    if (logs && logs[id]) return limit ? slice(logs[id], 0, limit) : logs[id]
  })
