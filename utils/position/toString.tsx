import Position from '@utils/position/types'

export default function toStringPosition(pos: Position): string {
  return `${pos.x}-${pos.y}`
}
