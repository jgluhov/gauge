import mathService from '../../src/services/math-service';

describe('Math Service', () => {
  describe('#isEpsilon()', () => {
    describe('when called without param', () => {
      it('should return true', () => {
        expect(mathService.isEpsilon()).toBeTruthy();
      });
    });

    describe('when number more then 1e-10', () => {
      it('should return true', () => {
        expect(mathService.isEpsilon(0.00000000001))
          .toBeTruthy();
      });
    });

    describe('when number less then 1e-10', () => {
      it('should return false', () => {
        expect(mathService.isEpsilon(0.001)).toBeFalsy();
      });
    });

    describe('when number is integer', () => {
      it('should return false', () => {
        expect(mathService.isEpsilon(1)).toBeFalsy();
      });
    });
  });

  describe('#formatNumber()', () => {
    describe('when called without param', () => {
      it('should return correct result', () => {
        expect(mathService.formatNumber()).toEqual(0);
      });
    });

    describe('when number less then 1e-10', () => {
      it('should return correct result', () => {
        expect(mathService.formatNumber(0.001)).toEqual(0.001);
      });
    });

    describe('when number more then 1e-10', () => {
      it('should return correct result', () => {
        expect(mathService.formatNumber(0.00000000001))
          .toEqual(0);
      });
    });

    describe('when number is integer', () => {
      it('should return correct result', () => {
        expect(mathService.formatNumber(1)).toEqual(1);
      });
    });
  });

  describe('#multiplier()', () => {
    describe('when pass param without precision', () => {
      it('should return 1', () => {
        expect(mathService.multiplier(5)).toEqual(1);
      });
    });

    describe('when pass param with precision', () => {
      it('should return correct multiplier once', () => {
        expect(mathService.multiplier(5.5)).toEqual(10);
      });

      it('should return correct multiplier twice', () => {
        expect(mathService.multiplier(1.555222))
          .toEqual(1000000);
      });

      it('should return correct multiplier third', () => {
        expect(mathService.multiplier(1.555222333))
          .toEqual(1000000000);
      });
    });
  });

  describe('#multiply()', () => {
    describe('when called without params', () => {
      it('should return default result', () => {
        expect(mathService.multiply()).toEqual(1);
      });
    });

    describe('when called with params', () => {
      describe('when called with single integer param', () => {
        it('should return same value', () => {
          expect(mathService.multiply(5)).toEqual(5);
        });
      });

      describe('when called with single float param', () => {
        it('should return same value', () => {
          expect(mathService.multiply(0.005)).toEqual(0.005);
        });
      });

      describe('when called multiple float params', () => {
        it('should return correct result once', () => {
          expect(mathService.multiply(0.1, 0.2)).toEqual(0.02);
        });

        it('should return correct result twice', () => {
          expect(mathService.multiply(0.1, 0.2)).toEqual(0.02);
        });
      });
    });
  });

  describe('#correctionFactor()', () => {
    describe('when called without params', () => {
      it('should return default factor', () => {
        expect(mathService.correctionFactor()).toEqual(1);
      });
    });

    describe('when called with params', () => {
      describe('when called with single integer param', () => {
        it('should return coorect factor once', () => {
          expect(mathService.correctionFactor(5)).toEqual(1);
        });
      });

      describe('when called with single float param', () => {
        it('should return correct factor twice', () => {
          expect(mathService.correctionFactor(0.004))
            .toEqual(1000);
        });
      });

      describe('when called with multiple integer params', () => {
        it('should return correct factor once', () => {
          expect(mathService.correctionFactor(1, 2000, 344))
            .toEqual(1);
        });
      });

      describe('when called with multiple float params', () => {
        it('should return correct factor once', () => {
          expect(mathService.correctionFactor(0.000003, 0.002))
            .toEqual(1000);
        });

        it('should return correct factor once', () => {
          expect(mathService.correctionFactor(0.000003, 0.000033))
            .toEqual(1000000);
        });
      });
    });
  });

  describe('#isGreaterOrEqual()', () => {
    describe('when called without params', () => {
      it('should return false', () => {
        expect(mathService.isGreaterOrEqual()).toBeFalsy();
      });
    });

    describe('when called with params', () => {
      describe('when angle is greater then 180 degree', () => {
        it('should return true', () => {
          expect(mathService.isGreaterOrEqual(Math.PI, 0, 3 * Math.PI / 2))
            .toBeTruthy();
        });
      });

      describe('when angle is less then 180 degree', () => {
        it('should return true', () => {
          expect(mathService.isGreaterOrEqual(Math.PI, 0, Math.PI / 2))
            .toBeFalsy();
        });
      });

      describe('when angle is equal 180 degree', () => {
        it('should return true', () => {
          expect(mathService.isGreaterOrEqual(Math.PI, 0, Math.PI))
            .toBeTruthy();
        });
      });
    });
  });
});
