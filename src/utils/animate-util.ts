import { flow } from 'lodash';
import {
  ANIMATION_DAMPING_PART,
  ANIMATION_DURATION,
  ANIMATION_MOVEMENT_PART,
  DAMPING_EQ_A,
  DAMPING_EQ_B,
  DAMPING_EQ_C
} from '../constants';

import SVGService from '../services/svg-service';

class AnimateUtil {
  private requestAnimationFrameId: number = 0;

  public setHand(arrowEl, startAngle, endAngle, handleComplete, duration) {
    const direction = startAngle > endAngle ? -1 : 1,
      slice = Math.abs(startAngle - endAngle);

    this.stopAnimation();

    this.animate((timeFraction) => {
      const step = timeFraction / (duration * ANIMATION_MOVEMENT_PART);

      arrowEl.setAttribute('transform',
        SVGService.describeRotation((startAngle + direction * (step * slice)))
      );

    },
    duration * ANIMATION_MOVEMENT_PART,
    () => {
      this.animate((timeFraction) => {
        const step = timeFraction / (duration * ANIMATION_DAMPING_PART),
          shouldDamp = slice ? 1 : 0;

        arrowEl.setAttribute('transform',
          SVGService.describeRotation(endAngle + shouldDamp * this.damping(step))
        );
      },
      duration * ANIMATION_DAMPING_PART,
      () => {
        arrowEl.setAttribute('transform',
          SVGService.describeRotation(endAngle)
        );
        handleComplete(endAngle);
      });
    });
  }

  private damping(time: number): number {
    return DAMPING_EQ_A *
      (Math.sin( DAMPING_EQ_B * time ) * Math.exp( -DAMPING_EQ_C * time ));
  }

  private animate(handler, duration, handleComplete) {
    const start = performance.now();

    handleComplete = handleComplete ?
      handleComplete : () => {};

    const handleAnimate = (timestamp) => {
      let timePassed = timestamp - start;

      if (timePassed > duration) {
        timePassed = duration;
      }

      handler(Math.abs(timePassed));

      if (timePassed < duration) {
        this.requestAnimationFrameId = requestAnimationFrame(handleAnimate);
      } else {
        handleComplete();
      }
    };

    this.requestAnimationFrameId = requestAnimationFrame(handleAnimate);
  }

  private stopAnimation() {
    cancelAnimationFrame(this.requestAnimationFrameId);
  }
}

export default new AnimateUtil();
