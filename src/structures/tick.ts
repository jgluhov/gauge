import { IPoint } from './point';

interface ITick {
  p1: IPoint;
  p2: IPoint;
}

export default class Tick implements ITick {
  constructor(
    public p1: IPoint,
    public p2: IPoint
  ) {
  }
}
