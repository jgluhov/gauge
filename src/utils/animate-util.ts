import SVGService from '../services/svg-service';

class AnimateUtil {
  private requestAnimationFrameId: number = 0;

  public setHand(arrowEl, startAngle, endAngle, handleComplete, duration) {
    const direction = startAngle > endAngle ? -1 : 1,
      slice = Math.abs(startAngle - endAngle);

    this.stopAnimation();

    this.animate((timeFraction) => {
      const time = (timeFraction / 1000) * (1000 / duration);

      arrowEl.setAttribute('transform',
        SVGService.describeRotation(startAngle + direction * (time * slice))
      );
    }, duration, () => handleComplete(endAngle));
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

      handler(timePassed);

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
