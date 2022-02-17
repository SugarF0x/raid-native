import { Position } from '@definitions'

export function isInProximity(pos1: Position, pos2?: Position): boolean {
  if (!pos2) return true

  const { x: x1, y: y1 } = pos1
  const { x: x2, y: y2 } = pos2

  return x2 >= x1 - 1
    && x2 <= x1 + 1
    && y2 >= y1 - 1
    && y2 <= y1 + 1
}