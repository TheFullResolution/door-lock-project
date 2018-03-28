import * as style from './EmployeeForm.scss'

import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'redux-form'

export const EmployeeFormComponent = () => <div>EmployeeForm</div>

EmployeeFormComponent.propTypes = {}

export const EmployeeForm = reduxForm({})(EmployeeFormComponent)
