import * as style from './Loading.scss'

import React from 'react'
import { LoadingIcon } from './LoadingIcon'

export const LoadingSmall = () => (
  <div>
    <LoadingIcon size="fa-2x" />
    <p className={style.loading}>Loading</p>
  </div>
)
