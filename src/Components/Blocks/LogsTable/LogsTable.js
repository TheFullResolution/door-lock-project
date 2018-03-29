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

const firebaseCall = props =>
  props.limit
    ? [
        {
          path: `logs/${props.business.id}`,
          queryParams: ['orderByChild=timestamp', `limitToLast=${props.limit}`],
          storeAs: `logs${props.limit}/${props.business.id}`,
          populates
        }
      ]
    : [
        {
          path: `logs/${props.business.id}`,
          queryParams: ['orderByChild=timestamp'],
          populates
        }
      ]

const mapStateToProps = ({ firebase }, { business, limit }) =>
  limit
    ? {
        logs: populate(firebase, `logs${limit}/${business.id}`, populates)
      }
    : { logs: populate(firebase, `logs/${business.id}`, populates) }

const mapMergeToProps = ({ logs }, dispatch, { business }) => ({
  business,
  logs: logs && Object.values(logs).reverse(),
  isLoaded: isLoaded(logs),
  isEmpty: isEmpty(logs)
})

export const LogsTable = compose(
  firebaseConnect(firebaseCall),
  connect(mapStateToProps, null, mapMergeToProps)
)(LogsTableComponent)
