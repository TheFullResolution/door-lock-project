import * as style from './Header.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { getAuthUid } from '../../../store/firebase/authSelectors'
import {
  getIfProfileAdmin,
  getProfileName
} from '../../../store/firebase/profileSelectors'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'

export const HeaderComponent = ({
  authExists,
  firebase,
  profileAdmin,
  name
}) => {
  const onClick = () => {
    firebase.logout()
  }
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Door Lock App</h1>
        {authExists && (
          <nav>
            {profileAdmin && (
              <Fragment>
                <Link to="/">home</Link>
                <Link to="dashboard">dashboard</Link>
              </Fragment>
            )}
            <Button className={style.button} version="button" onClick={onClick}>
              Logout
            </Button>
          </nav>
        )}
      </div>
      {name && <p className={style.greeting}>Hello, {name}!</p>}
    </div>
  )
}

HeaderComponent.propTypes = {
  authExists: PropTypes.bool,
  firebase: PropTypes.object,
  name: PropTypes.string,
  profileAdmin: PropTypes.bool
}

const mapStateToProps = state => ({
  authExists: !!getAuthUid(state),
  profileAdmin: getIfProfileAdmin(state),
  name: getProfileName(state)
})

export const Header = withFirebase(connect(mapStateToProps)(HeaderComponent))
