import Position from './Position'

export default function toStringPosition(pos: Position): string {
  return `${pos.x}-${pos.y}`
}
