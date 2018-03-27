import * as style from './DashboardBusiness.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { formatDate } from '../../../../../helpers/formatDate'
import { LoadingSmall } from '../../../../Blocks/Loading/LoadingSmall'
import { getLogsWithUserName } from '../../../../../store/firebase/dataLogsSelectors'

const DashboardBusinessComponent = ({ business, logs, ...rest }) => {
  console.log(business)
  return (
    <div>
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
                  <th>Time</th>
                  <th>User</th>
                  <th>Event</th>
                </tr>
                {logs.map(item => (
                  <tr key={item.id}>
                    <td>{business.doors[item.door].name}</td>
                    <td>{formatDate(item.timestamp)}</td>
                    <td>{item.username}</td>
                    <td>{item.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <LoadingSmall />
        )}
      </div>
    </div>
  )
}

DashboardBusinessComponent.propTypes = {
  business: PropTypes.object,
  logs: PropTypes.any
}

const populates = [
  { child: 'user', root: 'users' } // replace owner with user object
]

const firebaseCall = props => [
  {
    path: `logs/${props.business.id}`,
    queryParams: ['limitToLast=5'],
    populates
  }
]

const mapStateToProps = (state, props) => ({
  logs: getLogsWithUserName(state)
})

const mergeProps = (state, dispatch, parent) => ({
  ...parent,
  logs: state.logs ? state.logs[parent.business.id] : null
})

export const DashboardBusiness = compose(
  firebaseConnect(firebaseCall),
  connect(mapStateToProps, null, mergeProps)
)(DashboardBusinessComponent)
