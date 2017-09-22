import * as constants from './constants';
import { Point } from './structures';

export function polarToCartesian(
  centerX: number = 0,
  centerY: number = 0,
  radius: number = 0,
  angle: number = 0
): Point {

  return new Point(
    centerX + multiply(radius * Math.cos(angle)),
    centerY + multiply(radius * Math.sin(angle))
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

export function isEpsilon(n: number = 0): boolean {
  return Math.abs(n) < 1e-10;
}

export function formatNumber(n: number = 0): number {
  return isEpsilon(n) ? 0 : n;
}

export function multiply(...numbers): number {
  const formattedNumbers = numbers.map(formatNumber),
    factor = correctionFactor(formattedNumbers);

  return formattedNumbers.map(formatNumber)
    .reduce((x, y) => {
      return (x * factor) * (y * factor) / (factor * factor);
    }, 1);
}

export function multiplier(x: number): number {
  const parts = x.toString().split('.');

  if (parts.length < 2) {
    return 1;
  }

  return Math.pow(10, parts[1].length);
}

export function correctionFactor(...numbers): number {
  return numbers.reduce((prev: number, next: number) => {
    const mp = multiplier(prev),
        mn = multiplier(next);

    return Math.max(mp, mn);
  }, 1);
}

/**
 * TODO: need to realize converting from
 * scientific format of number to decimal one
 * like this https://gist.github.com/jiggzson/b5f489af9ad931e3d186
 */
