import * as style from './Home.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { getUsersBusinesses } from '../../../store/firebase/dataSelectors'
import { Button } from '../../Blocks/Button/Button'

export const HomeComponent = ({ businesses }) => {
  return (
    <div className={style.container}>
      <h1 className={style.heading}>List of the Locks:</h1>
      {businesses.map(el => (
        <Fragment key={el.name}>
          <h2 className={style.shopHeading}>
            <i className="fa fa-building-o fa-lg" aria-hidden="true" />
            {el.name}
          </h2>
          {Object.keys(el.doors).map(key => (
            <div key={key} className={style.lock}>
              <label htmlFor={key}>
                <i className="fa fa-lock fa-lg" aria-hidden="true" />
                {el.doors[key].name}
              </label>
              <Button
                className={style.button}
                version="button"
                id={key}
                type="button"
              >
                <i className="fa fa-unlock-alt fa-lg" aria-hidden="true" />
                open
              </Button>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

HomeComponent.propTypes = {
  firebase: PropTypes.object,
  businesses: PropTypes.array
}

const mapStateToProps = state => ({
  businesses: getUsersBusinesses(state)
})

export const Home = withFirebase(connect(mapStateToProps)(HomeComponent))
