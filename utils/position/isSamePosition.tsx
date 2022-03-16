import Position from '@utils/position/types'
import toStringPosition from '@utils/position/toStringPosition'

export default function isSamePosition(pos1: Position, pos2: Position): boolean {
  return toStringPosition(pos1) === toStringPosition(pos2)
}
