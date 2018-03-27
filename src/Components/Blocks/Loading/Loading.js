import * as style from './Loading.scss'

import React from 'react'
import { combineClassName } from '../../../helpers/classAndIds'

export const Loading = () => (
  <div className={style.container}>
    <div>
      <i
        className={combineClassName(
          'fa fa-cog fa-spin fa-4x fa-fw',
          style.loader
        )}
        aria-hidden="true"
      />
      <p className={style.loading}>Loading</p>
    </div>
  </div>
)
