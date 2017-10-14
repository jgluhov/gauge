declare const fixture;

declare module '*.html' {
    const content: any;
    export default content;
}

declare module '*.css' {
    const content: any;
    export = content;
}

interface IPoint {
  x: number;
  y: number;
}

interface ITick {
  p1: IPoint;
  p2: IPoint;
}

interface IText {
  position: number;
  content: string;
  point: IPoint;
  degree: number;
}

type TNumberFn = () => number;

interface ISlice {
  startAngle: number;
  endAngle: number;
  segment: TNumberFn;
  direction: TNumberFn;
  empty: TNumberFn;
}

type TCurve = (slice: ISlice, time: number) =>  number;
type TAngle = number;

interface IAnimation {
    fn: TCurve;
    duration: number;
}
