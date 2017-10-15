import {ISlice} from './slice';

interface IHandStateInterface {
  direction(slice: ISlice);
  freeze(slice: ISlice);
}

const HandState: IHandStateInterface = class {
  public static direction(slice: ISlice) {
    return slice.startAngle > slice.endAngle ? -1 : 1;
  }

  public static freeze(slice: ISlice) {
    return Number(!(slice.startAngle - slice.endAngle === 0));
  }
};

export default HandState;
