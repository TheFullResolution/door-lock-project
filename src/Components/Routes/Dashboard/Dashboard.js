import * as style from './Dashboard.scss'

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsersBusinesses } from '../../../store/firebase/dataBusinessesSelectors'
import { LogsTable } from '../../Blocks/LogsTable/LogsTable'
import { Button } from '../../Blocks/Button/Button'
import Toggle from 'react-toggled'
import { combineClassName } from '../../../helpers/classAndIds'

class DashboardComponent extends Component {
  render() {
    const { businesses } = this.props
    return (
      <div className={style.container}>
        <h1>Dashboard</h1>
        {businesses.map(el => (
          <Fragment key={el.id}>
            <h2 className={style.shopHeading}>
              <i className="fa fa-building-o fa-lg" aria-hidden="true" />
              {el.name}
            </h2>
            <Button
              version={'link'}
              to={`${process.env.PUBLIC_URL}/employees/${el.id}`}
              className={style.button}
            >
              Employees
            </Button>

            <Toggle>
              {({ on, getTogglerProps }) => (
                <Fragment>
                  <Button
                    version="button"
                    className={style.button}
                    {...getTogglerProps()}
                  >
                    {on ? 'Hide Logs' : 'Show Logs'}
                    <i
                      className={combineClassName(
                        'fa fa-lg',
                        on ? 'fa-angle-up' : 'fa-angle-down'
                      )}
                      aria-hidden="true"
                    />
                  </Button>

                  {on && (
                    <Fragment>
                      <LogsTable business={el} limit={5} />
                      <Button
                        version={'link'}
                        to={`${process.env.PUBLIC_URL}/logs/${el.id}`}
                        className={style.button}
                      >
                        See all Logs
                      </Button>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Toggle>
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
