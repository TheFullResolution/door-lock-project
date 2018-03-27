import * as style from './Dashboard.scss'

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsersBusinesses } from '../../../store/firebase/dataSelectors'
import { DashboardBusiness } from './components/DashboardBusiness/DashboardBusiness'

class DashboardComponent extends Component {
  render() {
    const { businesses } = this.props
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
          {businesses.map(el => (
            <DashboardBusiness key={el.id} business={el} />
          ))}
        </div>
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
