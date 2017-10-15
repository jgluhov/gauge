import { IPoint } from './point';

interface IText {
  position: number;
  content: string;
  point: IPoint;
  degree: number;
}

export default class Text implements IText {
  constructor(
    public position: number,
    public content: string,
    public point: IPoint,
    public degree: number
  ) {
  }
}
