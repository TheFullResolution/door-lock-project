import * as style from './Restricted.scss'

import React from 'react'

export const Restricted = () => (
  <div className={style.container}>
    <div className={style.wrapper}>
      <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true" />
      <h1>Page is Restricted!</h1>
      <p>{"We are sorry, but you don't have permissions to see this page"}</p>
      <p>{'If you are confident, you should have access, contact us!'}</p>
    </div>
  </div>
)
