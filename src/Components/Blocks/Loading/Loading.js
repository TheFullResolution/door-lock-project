import * as style from './Loading.scss'

import React from 'react'
import { LoadingIcon } from './LoadingIcon'

export const Loading = () => (
  <div className={style.container}>
    <div>
      <LoadingIcon size="fa-4x" />
      <p className={style.loading}>Loading</p>
    </div>
  </div>
)
