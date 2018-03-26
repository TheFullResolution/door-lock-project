import * as style from './HomeLocks.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { HomeButton } from '../HomeButton/HomeButton'
import {HomeMessage} from "../HomeMessage/HomeMessage";

export const HomeLocks = ({ businesses, openLock, locks }) => (
  <div className={style.container}>
    <h1 className={style.heading}>List of the Locks:</h1>
    {businesses.map(el => (
      <Fragment key={el.name}>
        <h2 className={style.shopHeading}>
          <i className="fa fa-building-o fa-lg" aria-hidden="true" />
          {el.name}
        </h2>
        {Object.keys(el.doors).map(key => {
          const lockState = locks[key]

          const onClick = () => {
            openLock({ key, shop: el.id })
          }
          return (
            <div key={key} className={style.lock}>
              <div className={style.row}>
                <label htmlFor={key}>
                  <i className="fa fa-lock fa-lg" aria-hidden="true" />
                  {el.doors[key].name}
                </label>
                {lockState && (
                  <HomeButton
                    onClick={onClick}
                    id={key}
                    loading={lockState.loading}
                  />
                )}
              </div>
              {lockState && <HomeMessage access={lockState.access} />}
            </div>
          )
        })}
      </Fragment>
    ))}
  </div>
)

HomeLocks.propTypes = {
  openLock: PropTypes.func,
  businesses: PropTypes.array,
  locks: PropTypes.object
}
