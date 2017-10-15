import {ISlice} from './slice';

const HandState = class {
  public static direction(slice: ISlice) {
    return slice.startAngle > slice.endAngle ? -1 : 1;
  }

  public static freeze(slice: ISlice) {
    return Number(!(slice.startAngle - slice.endAngle === 0));
  }
};

export default HandState;
