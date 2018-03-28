import * as style from './HomeButton.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../../../Blocks/Button/Button'

export const HomeButton = ({ access, loading, id, onClick }) => {
  switch (access) {
    case null:
      return (
        <Button
          className={style.buttonIdle}
          disabled={loading}
          version="button"
          id={id}
          type="button"
          onClick={onClick}
        >
          {loading ? (
            <Fragment>
              <i className="fa fa-cog fa-spin fa-fw fa-lg" aria-hidden="true" />
              working
            </Fragment>
          ) : (
            <Fragment>
              <i className="fa fa-unlock-alt fa-lg" aria-hidden="true" />
              open
            </Fragment>
          )}
        </Button>
      )
    case true:
      return (
        <Button
          className={style.buttonOpen}
          disabled={true}
          version="button"
          type="button"
        >
          <i className="fa fa-unlock fa-lg" aria-hidden="true" />
          opened!
        </Button>
      )
    case false:
      return (
        <Button
          className={style.buttonClose}
          disabled={true}
          version="button"
          type="button"
        >
          <i className="fa fa-lock fa-lg" aria-hidden="true" />
          no access
        </Button>
      )
    default:
      return null
  }
}

HomeButton.propTypes = {
  access: PropTypes.any,
  loading: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func
}
