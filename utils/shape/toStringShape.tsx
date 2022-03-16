import Shape from './Shape'
import toStringPosition from '@utils/position/toStringPosition'

export default function toStringShape(shape: Shape): string {
  return `${toStringPosition(shape)}-${shape.width}-${shape.height}`
}
