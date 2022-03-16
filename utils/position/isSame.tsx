import Position from '@utils/position/types'
import toStringPosition from '@utils/position/toString'

export default function isPositionSame(pos1: Position, pos2: Position): boolean {
  return toStringPosition(pos1) === toStringPosition(pos2)
}
