export interface IPoint {
  x: number;
  y: number;
}

export default class Point implements IPoint {
  constructor(
    public x: number = 0,
    public y: number = 0
  ) {}
}
