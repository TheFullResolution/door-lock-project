import * as style from './LogsTable.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { formatDate } from '../../../helpers/formatDate'
import { LoadingSmall } from '../Loading/LoadingSmall'
import { makeGetLogsByIDwithLimit } from '../../../store/firebase/dataLogsSelectors'

const LogsTableComponent = ({ business, logs, ...rest }) => (
  <Fragment>
    <h2 className={style.shopHeading}>
      <i className="fa fa-building-o fa-lg" aria-hidden="true" />
      {business.name}
    </h2>
    <div className={style.tableContainer}>
      <h3 className={style.logsHeading}>
        <i className="fa fa-cloud" aria-hidden="true" />Logs (latest):
      </h3>
      {logs ? (
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
                <tr key={item.id}>
                  <td>{business.doors[item.door].name}</td>
                  <td>{item.event}</td>
                  <td>{formatDate(item.timestamp)}</td>
                  <td>{item.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <LoadingSmall />
      )}
    </div>
  </Fragment>
)

LogsTableComponent.propTypes = {
  business: PropTypes.object,
  logs: PropTypes.any
}

const populates = [
  { child: 'user', root: 'users' } // replace owner with user object
]

const firebaseCall = props => [
  {
    path: `logs/${props.business.id}`,
    populates
  }
]

const mapStateToProps = (state, props) => ({
  logs: makeGetLogsByIDwithLimit(props.business.id, props.limit && props.limit)(
    state
  )
})

export const LogsTable = compose(
  firebaseConnect(firebaseCall),
  connect(mapStateToProps)
)(LogsTableComponent)
