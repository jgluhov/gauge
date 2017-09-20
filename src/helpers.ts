import * as constants from './constants';

export function polarToCartesian(
  centerX: number = 0,
  centerY: number = 0,
  radius: number = 0,
  angle: number = 0
) {
  // TODO Need to realize multiply correctly
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
}

export function describeArc(
  startX: number = 0,
  startY: number = 0,
  radius: number = 0,
  startAngle: number = 0,
  endAngle: number = 0
) {
  const start = polarToCartesian(startX, startY, radius, startAngle),
    end = polarToCartesian(startX, startY, radius, endAngle);

  const largeArcFlag = Number(Math.PI <= (endAngle - startAngle));

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, end.x, end.y
  ].join(' ');

  return d;
}
