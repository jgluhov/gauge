import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SCALE_END_ANGLE } from '../constants';

export const sliderValue$ = new BehaviorSubject<number>(SCALE_END_ANGLE);
