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

  describe('#calculateSegments()', () => {
    describe('when called with params', () => {
      describe('when passed more then 180 degree', () => {
        describe('when starting point is negative', () => {
          beforeEach(() => {
            this.segments = mathService.calculateSegments(
              - Math.PI / 6, 7 * Math.PI / 6, [ 70, 85, 100 ]
            );
          });

          describe('checking first segment', () => {
            beforeEach(() => {
              this.segment = this.segments[0];
            });

            it('should return correct start of first endpoint', () => {
              expect(this.segment.start)
                .toBeCloseTo(- Math.PI / 6);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.segment.end)
                .toBeCloseTo(23 * Math.PI / 30);
            });
          });

          describe('checking second segment', () => {
            beforeEach(() => {
              this.segment = this.segments[1];
            });

            it('should return correct start of first endpoint', () => {
              expect(this.segment.start)
                .toBeCloseTo(23 * Math.PI / 30);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.segment.end)
                .toBeCloseTo(29 * Math.PI / 30);
            });
          });

          describe('checking third segment', () => {
            beforeEach(() => {
              this.segment = this.segments[2];
            });

            it('should return correct start of first endpoint', () => {
              expect(this.segment.start)
                .toBeCloseTo(29 * Math.PI / 30);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.segment.end)
                .toBeCloseTo(7 * Math.PI / 6);
            });
          });
        });

        describe('when starting point is positive (reverting)', () => {
          beforeEach(() => {
            this.segments = mathService.calculateSegments(
              7 * Math.PI / 6, - Math.PI / 6, [ 70, 85, 100 ]
            );
          });

          describe('checking first segment', () => {
            beforeEach(() => {
              this.segment = this.segments[0];
            });

            it('should return correct start of first endpoint', () => {
              expect(this.segment.start)
                .toBeCloseTo(7 * Math.PI / 6);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.segment.end)
                .toBeCloseTo(7 * Math.PI / 30);
            });
          });

          describe('checking second segment', () => {
            beforeEach(() => {
              this.segment = this.segments[1];
            });

            it('should return correct start of first endpoint', () => {
              expect(this.segment.start)
                .toBeCloseTo(7 * Math.PI / 30);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.segment.end)
                .toBeCloseTo(Math.PI / 30);
            });
          });

          describe('checking third segment', () => {
            beforeEach(() => {
              this.segment = this.segments[2];
            });

            it('should return correct start of first endpoint', () => {
              expect(this.segment.start)
                .toBeCloseTo(Math.PI / 30);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.segment.end)
                .toBeCloseTo(- Math.PI / 6);
            });
          });
        });
      });
    });
  });

  describe('#calculateStep()', () => {
    describe('when called without params', () => {
      it('should return default result', () => {
        expect(mathService.calculateStep())
          .toEqual(0);
      });
    });

    describe('when called with params', () => {
      it('should return correct result once', () => {
        expect(mathService.calculateStep(10, 50))
          .toEqual(5);
      });

      it('should return correct result twice', () => {
        expect(mathService.calculateStep(0, 50))
          .toEqual(0);
      });
    });
  });

  describe('#calculateInterval()', () => {
    describe('when called without params', () => {
      it('should return zero', () => {
        expect(mathService.calculateInterval()).toEqual(0);
      });
    });

    describe('when called with params', () => {
      describe('when pass points within 2 PI', () => {
        it('should return correct result once', () => {
          expect(mathService.calculateInterval(Math.PI / 4, 3 * Math.PI / 4))
            .toBeCloseTo(Math.PI / 2);
        });

        describe('when pass points in revert way', () => {
          it('should return correct result', () => {
            expect(mathService.calculateInterval(3 * Math.PI / 4, Math.PI / 4))
              .toBeCloseTo(Math.PI / 2);
          });
        });
      });

      describe('when pass points outside 2PI', () => {
        it('should return correct result twice', () => {
          expect(mathService.calculateInterval(9 * Math.PI / 4, 11 * Math.PI / 4))
            .toBeCloseTo(Math.PI / 2);
        });
      });
    });
  });
});
