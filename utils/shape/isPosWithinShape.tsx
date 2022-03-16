import Position from '@utils/position/types'
import Shape from '@utils/shape/types'

export default function isPosWithinShape(shape: Shape, pos: Position): boolean {
  const { x: sx, y: sy, width, height } = shape
  const { x: px, y: py } = pos
  return (
    px >= sx &&
    px <= sx + width &&
    py >= sy &&
    py <= sy + height
  )
}
