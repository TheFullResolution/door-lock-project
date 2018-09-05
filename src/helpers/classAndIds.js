import compact from 'lodash-es/compact'

export const combineClassName = (...classNames) =>
  compact(classNames).join(' ')

export const formatId = (id) => id.toLowerCase().replace(/\s/g, '-')
