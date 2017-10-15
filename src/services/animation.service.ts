import { ISlice } from '../structures/slice';

interface IAnimation {
  fn: (slice: ISlice, time: number) =>  number;
  duration: number;
}

import HandState from '../structures/hand-state';
import mathService from './math.service';

class AnimationService {
  private animationId: number = 0;

  private movementAnimation: IAnimation = {
    duration: 750,
    fn: (function(slice: ISlice, time: number): number {
      return slice.startAngle +
        HandState.direction(slice) * (time / this.duration) * slice.centralAngle();
    }),
  };

  private shakingAnimation: IAnimation = {
    duration: 350,
    fn: (function(slice: ISlice, time: number): number {
      return slice.endAngle +
        HandState.freeze(slice) * mathService.damping(time / this.duration);
    })
  };

  private animations: IAnimation[] = [
    this.movementAnimation,
    this.shakingAnimation
  ];

  public animateHand(describer, slice, complete) {
    this.cancelAnimation();

    this.animations.reduce((sequence: Promise<any>, animation: IAnimation) =>
      sequence.then(() =>
        new Promise((resolve) =>
          this.animate(
            (time) => describer(animation.fn(slice, time)),
            animation.duration,
            resolve
          )
        )
      ),
      Promise.resolve()
    ).then(() => complete(slice.endAngle));
  }

  private animate(handler, duration, complete) {
    const start = performance.now();

    const run = (timestamp) => {
      let timePassed = Math.abs(timestamp - start);

      timePassed = timePassed < duration ?
        timePassed : duration;

      handler(timePassed);

      timePassed < duration ?
        this.requestAnimation(run) : complete();
    };

    this.requestAnimation(run);
  }

  private requestAnimation(fn) {
    this.animationId = requestAnimationFrame(fn);
  }

  private cancelAnimation() {
    cancelAnimationFrame(this.animationId);
  }
}

export default AnimationService;
