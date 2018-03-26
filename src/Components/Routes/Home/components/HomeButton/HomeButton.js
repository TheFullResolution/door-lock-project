import * as style from './HomeButton.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../../../Blocks/Button/Button'

export const HomeButton = ({ loading, id, onClick }) => {
  return (
    <Button
      className={style.button}
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
}

HomeButton.propTypes = {
  loading: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func
}
