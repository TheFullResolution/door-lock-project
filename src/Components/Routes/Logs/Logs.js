import * as style from './Logs.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeGetBusinessByID } from '../../../store/firebase/dataBusinessesSelectors'
import { LogsTable } from '../../Blocks/LogsTable/LogsTable'
import { Button } from '../../Blocks/Button/Button'

export const LogsComponent = ({ business }) => (
  <div className={style.container}>
    <h1>
      All Logs of <span className={style.name}>{business.name}</span>
    </h1>
    {business && <LogsTable business={business} />}
    <Button
      version={'link'}
      to={`${process.env.PUBLIC_URL}/dashboard`}
      className={style.linkBack}
    >
      Go Back to Dashboard
    </Button>
  </div>
)

LogsComponent.propTypes = {
  business: PropTypes.object,
  match: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  business: makeGetBusinessByID(props.match.params.id)(state)
})

export const Logs = connect(mapStateToProps)(LogsComponent)
