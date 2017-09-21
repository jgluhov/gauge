import * as constants from './constants';
import { Point } from './structures';

export function polarToCartesian(
  centerX: number = 0,
  centerY: number = 0,
  radius: number = 0,
  angle: number = 0
): Point {

  return new Point(
    centerX + radius * Math.cos(angle),
    centerY + radius * Math.sin(angle)
  );
}

export function describeArc(
  startX: number = 0,
  startY: number = 0,
  radius: number = 0,
  startAngle: number = 0,
  endAngle: number = 0
): string {
  const start: Point = polarToCartesian(startX, startY, radius, startAngle),
    end: Point = polarToCartesian(startX, startY, radius, endAngle);

  const largeArcFlag = Number(Math.PI <= (endAngle - startAngle));

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, end.x, end.y
  ].join(' ');

  return d;
}

export function multiplier(x: number): number {
  const parts = x.toString().split('.');

  if (parts.length < 2) {
    return 1;
  }

  return Math.pow(10, parts[1].length);
}
