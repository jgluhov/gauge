import {
  ANIMATION_DURATION,
  ANIMATION_RATIO
} from '../constants';

import mathService from '../services/math-service';
import SVGService from '../services/svg-service';

class AnimateUtil {
  private animationId: number = 0;

  private movementAnimation: IAnimation = {
    duration: 750,
    fn: (function(slice: ISlice, time: number): TAngle {
      return slice.startAngle +
        slice.direction() * (time / this.duration) * slice.segment();
    }),
  };

  private shakingAnimation: IAnimation = {
    duration: 350,
    fn: (function(slice: ISlice, time: number): TAngle {
      return slice.endAngle +
        slice.empty() * mathService.damping(time / this.duration);
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

export default new AnimateUtil();
