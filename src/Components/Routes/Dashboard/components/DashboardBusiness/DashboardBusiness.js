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
  console.log(logs)
  return (
    <div>
      <h2>{business.name}</h2>
      <h3>Logs:</h3>
      {logs ? (
        <ul>
          {/* {logs.map(item => (
            <li key={item.id}>
              {formatDate(item.timestamp)} {}
            </li>
          ))} */}
        </ul>
      ) : (
        <LoadingSmall />
      )}
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
    queryParams: ['limitToLast=10'],
    populates
  }
]

const mapStateToProps = (state, props) => ({
  logs: getLogsWithUserName(state)
})

export const DashboardBusiness = compose(
  firebaseConnect(firebaseCall),
  connect(mapStateToProps)
)(DashboardBusinessComponent)
