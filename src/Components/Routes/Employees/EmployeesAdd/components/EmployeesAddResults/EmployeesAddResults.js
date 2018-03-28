import * as style from './EmployeesAddResults.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { LoadingSmall } from '../../../../../Blocks/Loading/LoadingSmall'
import { Button } from '../../../../../Blocks/Button/Button'

export const EmployeesAddResults = ({ addUser, loading, users }) => (
  <div className={style.results}>
    <h3>Results</h3>
    {loading ? (
      <LoadingSmall />
    ) : (
      <ul className={style.list}>
        {users ? (
          Object.keys(users).map(key => {
            const onClick = () => {
              addUser(key)
            }
            return (
              <li key={key} className={style.result}>
                <div>
                  <p>{users[key].email}</p>
                  <p>
                    {users[key].name} {users[key].lastname}
                  </p>
                </div>
                <Button
                  version="button"
                  className={style.button}
                  onClick={onClick}
                >
                  <i className="fa fa-plus fa-lg" aria-hidden="true" />
                  Add
                </Button>
              </li>
            )
          })
        ) : (
          <li className={style.noResults}>No results</li>
        )}
      </ul>
    )}
  </div>
)

EmployeesAddResults.propTypes = {
  addUser: PropTypes.func,
  loading: PropTypes.bool,
  users: PropTypes.object
}
