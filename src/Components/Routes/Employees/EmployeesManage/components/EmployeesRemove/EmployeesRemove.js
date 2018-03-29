import * as style from './EmployeesRemove.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggled'
import { Button } from '../../../../../Blocks/Button/Button'

export const EmployeesRemove = ({ id, removeUser, loading }) => {
  const onClick = () => {
    removeUser(id)
  }
  return (
    !loading && (
      <Toggle>
        {({ on, getTogglerProps }) => (
          <Fragment>
            <div className={style.removeWrapper}>
              <Button
                version="button"
                className={style.remove}
                {...getTogglerProps()}
              >
                {on ? 'Cancel' : 'Remove Employee'}
              </Button>
            </div>

            {on && (
              <div className={style.removeContainer}>
                <p>Are you sure?</p>
                <Button
                  version="button"
                  className={style.finalRemove}
                  onClick={onClick}
                >
                  <i
                    className="fa fa-exclamation-circle fa-lg"
                    aria-hidden="true"
                  />
                  YES, REMOVE EMPLOYEE
                  <i
                    className="fa fa-exclamation-circle fa-lg"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            )}
          </Fragment>
        )}
      </Toggle>
    )
  )
}

EmployeesRemove.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  removeUser: PropTypes.func
}
