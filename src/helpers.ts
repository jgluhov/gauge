import * as constants from './constants';

export function polarToCartesian(
  centerX: number = 0,
  centerY: number = 0,
  radius: number = 0,
  angle: number = 0
) {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
}
