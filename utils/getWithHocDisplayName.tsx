import React from 'react'

export function getWithHocDisplayName(Component: React.FC<any>, name: string) {
  const displayName = Component.displayName ?? 'UnidentifiedComponent'
  const isAlreadyWrapped = displayName.includes('With')

  if (isAlreadyWrapped) {
    const indexOfWith = displayName.indexOf('With')
    const initialName = displayName.slice(0, indexOfWith)
    const wrappers = displayName.slice(indexOfWith + 2, displayName.length - indexOfWith + 1).split(',')
    const newWrappers = [...wrappers, name]
    return `${initialName}With:[${newWrappers.join(',')}]`
  }

  return `${displayName}With:[${name}]`
}

export default getWithHocDisplayName
