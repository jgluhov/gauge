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

interface ISVGText {
  x: number;
  content: string;
  p: IPoint;
  degree: number;
}

interface IAxle {
  tick: ITick;
  text: ISVGText;
}

interface ISlice {
  startAngle: number;
  endAngle: number;
}

type IAxis = IAxle[];
