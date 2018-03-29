import * as style from './LogsTable.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import {
  firebaseConnect,
  populate,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { connect } from 'react-redux'
import { formatDate } from '../../../helpers/formatDate'
import { LoadingSmall } from '../Loading/LoadingSmall'
import slice from 'lodash-es/slice'

const LogsTableComponent = ({ business, logs, isLoaded, isEmpty }) => (
  <div className={style.flex}>
    <div className={style.tableContainer}>
      <h3 className={style.logsHeading}>
        <i className="fa fa-cloud" aria-hidden="true" />Logs (latest):
      </h3>
      {!isLoaded ? (
        <LoadingSmall />
      ) : isEmpty ? (
        <p>No Logs yet</p>
      ) : (
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <tbody>
              <tr>
                <th>Door</th>
                <th>Event</th>
                <th>Time</th>
                <th>User</th>
              </tr>
              {logs.map(item => (
                <tr key={item.timestamp}>
                  <td>{business.doors[item.door].name}</td>
                  <td>{item.event}</td>
                  <td>{formatDate(item.timestamp)}</td>
                  <td>{`${item.user.name} ${item.user.lastname}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
)

LogsTableComponent.propTypes = {
  business: PropTypes.object,
  logs: PropTypes.any,
  isLoaded: PropTypes.bool,
  isEmpty: PropTypes.bool
}

const populates = [{ child: 'user', root: 'users' }]

const firebaseCall = props => [
  {
    path: `logs/${props.business.id}`,
    populates
  }
]

const mapStateToProps = ({ firebase }, { business }) => ({
  logs: populate(firebase, `logs/${business.id}`, populates)
})

const transformLogs = (logs, limit) =>
  limit ? slice(Object.values(logs), 0, limit) : Object.values(logs)

const mapMergeToProps = ({ logs }, dispatch, { limit, business }) => {
  const limitedLogs = logs && transformLogs(logs, limit)
  return {
    business,
    logs: limitedLogs && limitedLogs,
    isLoaded: isLoaded(logs),
    isEmpty: isEmpty(logs)
  }
}

export const LogsTable = compose(
  firebaseConnect(firebaseCall),
  connect(mapStateToProps, null, mapMergeToProps)
)(LogsTableComponent)
