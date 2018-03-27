import * as style from './Employees.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect, populate, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button } from '../../Blocks/Button/Button'
import { EmployeeDetails } from './components/EmployeeDetails/EmployeeDetails'
import { Loading } from '../../Blocks/Loading/Loading'

const EmployeesComponent = ({ business, doorsAuth, ...props }) => {
  if (!isLoaded(business, doorsAuth)) return <Loading />

  const { employees, doors } = business
  return (
    <div className={style.container}>
      <h1>
        Employees of <span className={style.name}>{business.name}</span>
      </h1>
      <ul className={style.list}>
        {Object.keys(employees).map(id => (
          <EmployeeDetails key={id} {...{ employees, doors, id, doorsAuth }} />
        ))}
      </ul>
      <Button version={'link'} to={'/dashboard'} className={style.linkBack}>
        Go Back to Dashboard
      </Button>
    </div>
  )
}

EmployeesComponent.propTypes = {
  business: PropTypes.object,
  doorsAuth: PropTypes.object
}

const populates = ['employees:users']

const firebaseCall = props => [
  {
    path: `businesses/${props.match.params.id}`,
    populates
  },
  {
    path: `doors/${props.match.params.id}`
  }
]

const mapStateToProps = (state, props) => ({
  business: populate(
    state.firebase,
    `businesses/${props.match.params.id}`,
    populates
  ),
  doorsAuth: populate(state.firebase, `doors/${props.match.params.id}`)
})

export const Employees = compose(
  firebaseConnect(firebaseCall),
  connect(mapStateToProps)
)(EmployeesComponent)