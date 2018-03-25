import * as style from './Loading.scss'

import React from 'react'

export const Loading = () => (
  <div className={style.container}>
    <div>
      <i className="fa fa-cog fa-spin fa-4x fa-fw" aria-hidden="true" />
      <p className={style.loading}>Loading</p>
    </div>
  </div>
)
