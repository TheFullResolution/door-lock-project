import * as style from './EmployeeAccessToggle.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../../../../Blocks/Button/Button'
import { LoadingIcon } from '../../../../../Blocks/Loading/LoadingIcon'

export const EmployeeAccessToggle = ({
  addAccess,
  id,
  doorId,
  access,
  loading,
  removeAccess
}) => {
  const onClickAdd = () => {
    addAccess(id, doorId)
  }
  const onClickRemove = () => {
    removeAccess(id, doorId)
  }
  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : access ? (
        <Button
          version="button"
          className={style.buttonRemove}
          onClick={onClickRemove}
        >
          <i className="fa fa-minus fa-lg" aria-hidden="true" />
          Revoke Access
        </Button>
      ) : (
        <Button
          version="button"
          className={style.buttonAdd}
          onClick={onClickAdd}
        >
          <i className="fa fa-plus fa-lg" aria-hidden="true" />
          Add Access
        </Button>
      )}
    </div>
  )
}
EmployeeAccessToggle.propTypes = {
  addAccess: PropTypes.func,
  access: PropTypes.bool,
  id: PropTypes.string,
  doorId: PropTypes.string,
  loading: PropTypes.bool,
  removeAccess: PropTypes.func
}
