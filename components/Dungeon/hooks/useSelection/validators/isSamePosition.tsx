import { Position } from '@definitions'

function getPosString(pos: Position) {
  return `${pos.x}-${pos.y}`
}

export function isSamePosition(pos1: Position, pos2?: Position): boolean {
  if (!pos2) return false

  return getPosString(pos1) === getPosString(pos2)
}