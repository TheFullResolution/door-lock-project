import compact from 'lodash-es/compact'

export const combineClassName = (...classNames) =>
  compact(classNames).join(' ')

export const formatId = (id: string) => id.toLowerCase().replace(/\s/g, '-')
