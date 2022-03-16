import Position from './Position'
import toStringPosition from './toStringPosition'

export default function isSamePosition(pos1: Position, pos2: Position): boolean {
  return toStringPosition(pos1) === toStringPosition(pos2)
}
