import {
  ANIMATION_DURATION,
  ANIMATION_RATIO
} from '../constants';

import mathService from '../services/math-service';
import SVGService from '../services/svg-service';

class AnimateUtil {
  private animationId: number = 0;

  public animateHand(describer, slice, duration, complete) {
    this.cancelAnimation();

    const ratio = ANIMATION_RATIO.slice(),
      calcRatio = mathService.calcRatio.bind(null, duration),
      movementTime = calcRatio(ratio.shift()),
      dumpingTime = calcRatio(ratio.pop());

    this.animate(
      (timeFraction) => {
        if (timeFraction <= movementTime) {
          describer(slice.startAngle +
            slice.direction() * ((timeFraction / movementTime) * slice.segment()));
        } else {
          describer(slice.endAngle +
            slice.empty() * mathService.damping((timeFraction - movementTime) / dumpingTime));
        }
      },
      duration,
      () => {
        describer(slice.endAngle);
        complete(slice.endAngle);
      }
    );
  }

  private animate(handler, duration, complete) {
    const start = performance.now();

    const handleAnimate = (timestamp) => {
      let timePassed = timestamp - start;

      if (timePassed > duration) {
        timePassed = duration;
      }

      handler(Math.abs(timePassed));

      if (timePassed < duration) {
        this.requestAnimation(handleAnimate);
      } else {
        complete();
      }
    };

    this.requestAnimation(handleAnimate);
  }

  private requestAnimation(fn) {
    this.animationId = requestAnimationFrame(fn);
  }

  private cancelAnimation() {
    cancelAnimationFrame(this.animationId);
  }
}

export default new AnimateUtil();
