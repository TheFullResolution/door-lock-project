import * as style from './Dashboard.scss'

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsersBusinesses } from '../../../store/firebase/dataBusinessesSelectors'
import { LogsTable } from '../../Blocks/LogsTable/LogsTable'
import { Button } from '../../Blocks/Button/Button'

class DashboardComponent extends Component {
  render() {
    const { businesses } = this.props
    return (
      <div className={style.container}>
        <h1>Dashboard</h1>
        {businesses.map(el => (
          <Fragment key={el.id}>
            <LogsTable business={el} limit={5} />
            <Button
              version={'link'}
              to={`logs/${el.id}`}
              className={style.seeAll}
            >
              See all Logs
            </Button>
          </Fragment>
        ))}
      </div>
    )
  }
}

DashboardComponent.propTypes = {
  businesses: PropTypes.array
}

const mapStateToProps = state => ({
  businesses: getUsersBusinesses(state)
})

export const Dashboard = connect(mapStateToProps)(DashboardComponent)
