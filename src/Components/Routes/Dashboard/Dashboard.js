import * as style from './Dashboard.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class DashboardComponent extends Component {
  render() {
    return <div>Dashboard</div>
  }
}

DashboardComponent.propTypes = {}

const mapStateToProps = state => ({})

export const Dashboard = connect(mapStateToProps)(DashboardComponent)
