import Shape from './Shape'
import toStringPosition from '@utils/position/toStringPosition'

export function toStringShape(shape: Shape): string {
  return `${toStringPosition(shape)}-${shape.width}-${shape.height}`
}

export default toStringShape
