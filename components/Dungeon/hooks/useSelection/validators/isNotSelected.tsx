import { Tile } from '@utils'

/**
 * Checks if tile is not selected, where selection is defined as anything
 * other than next tile from arrowhead since selecting it triggers deselection
 */
export function isNotSelected(target: Tile, points: Tile[]) {
  const pointsToCheck = [...points]
  if (points.length >= 2) pointsToCheck.splice(points.length-2, 1)
  return pointsToCheck.every(point => point !== target)
}
