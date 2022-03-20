import Position from './Position'

export function toStringPosition(pos: Position): string {
  return `${pos.x}-${pos.y}`
}

export default toStringPosition
