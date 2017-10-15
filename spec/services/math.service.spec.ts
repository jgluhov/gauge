import MathService from '../../src/services/math.service';
import Point from '../../src/structures/point';

describe('Math Service', () => {
  beforeAll(() => {
    this.mathService = new MathService();
  });

  describe('#polarToCartesian()', () => {
    describe('when called without params', () => {
      it('should return object', () => {
        expect(this.mathService.polarToCartesian())
          .toEqual(jasmine.any(Point));
      });

      it('should return zero coordinates', () => {
        expect(this.mathService.polarToCartesian())
          .toEqual(new Point());
      });
    });

    describe('when called with params', () => {
      describe('when set center point ot zero', () => {
        describe('when we specify radius and angle', () => {
          beforeEach(() => {
            this.radius = 2.5;
            this.angle = Math.PI / 4;
          });

          it('should return correct first point', () => {
            expect(this.mathService.polarToCartesian(0, 0, this.radius, 0))
              .toEqual(new Point(2.5, 0));
          });

          it('should return correct second point', () => {
            const point: Point = this.mathService.polarToCartesian(
              0, 0, this.radius, this.angle
            );

            expect(point.x).toBeCloseTo(1.7677669);
            expect(point.y).toBeCloseTo(1.7677669);
          });
        });
      });

      describe('when we specify center point', () => {
        describe('when we specify radius and angle', () => {
          it('should return correct first point', () => {
            expect(this.mathService.polarToCartesian(-5, -5, 2.5, 0))
              .toEqual(new Point(-2.5, -5));
          });

          it('should return correct second point', () => {
            const angle = Math.PI / 4,
              radius = 2.5;

            const point = this.mathService.polarToCartesian(-3, 5, radius, angle);

            expect(point.x).toBeCloseTo(-1.2322330);
            expect(point.y).toBeCloseTo(6.7677669);
          });
        });
      });
    });

  });

  describe('#isEpsilon()', () => {
    describe('when called without param', () => {
      it('should return true', () => {
        expect(this.mathService.isEpsilon()).toBeTruthy();
      });
    });

    describe('when number more then 1e-10', () => {
      it('should return true', () => {
        expect(this.mathService.isEpsilon(0.00000000001))
          .toBeTruthy();
      });
    });

    describe('when number less then 1e-10', () => {
      it('should return false', () => {
        expect(this.mathService.isEpsilon(0.001)).toBeFalsy();
      });
    });

    describe('when number is integer', () => {
      it('should return false', () => {
        expect(this.mathService.isEpsilon(1)).toBeFalsy();
      });
    });
  });

  describe('#formatNumber()', () => {
    describe('when called without param', () => {
      it('should return correct result', () => {
        expect(this.mathService.formatNumber()).toEqual(0);
      });
    });

    describe('when number less then 1e-10', () => {
      it('should return correct result', () => {
        expect(this.mathService.formatNumber(0.001)).toEqual(0.001);
      });
    });

    describe('when number more then 1e-10', () => {
      it('should return correct result', () => {
        expect(this.mathService.formatNumber(0.00000000001))
          .toEqual(0);
      });
    });

    describe('when number is integer', () => {
      it('should return correct result', () => {
        expect(this.mathService.formatNumber(1)).toEqual(1);
      });
    });
  });

  describe('#multiplier()', () => {
    describe('when pass param without precision', () => {
      it('should return 1', () => {
        expect(MathService.multiplier(5)).toEqual(1);
      });
    });

    describe('when pass param with precision', () => {
      it('should return correct multiplier once', () => {
        expect(MathService.multiplier(5.5)).toEqual(10);
      });

      it('should return correct multiplier twice', () => {
        expect(MathService.multiplier(1.555222))
          .toEqual(1000000);
      });

      it('should return correct multiplier third', () => {
        expect(MathService.multiplier(1.555222333))
          .toEqual(1000000000);
      });
    });
  });

  describe('#multiply()', () => {
    describe('when called without params', () => {
      it('should return default result', () => {
        expect(this.mathService.multiply()).toEqual(1);
      });
    });

    describe('when called with params', () => {
      describe('when called with single integer param', () => {
        it('should return same value', () => {
          expect(this.mathService.multiply(5)).toEqual(5);
        });
      });

      describe('when called with single float param', () => {
        it('should return same value', () => {
          expect(this.mathService.multiply(0.005)).toEqual(0.005);
        });
      });

      describe('when called multiple float params', () => {
        it('should return correct result once', () => {
          expect(this.mathService.multiply(0.1, 0.2)).toEqual(0.02);
        });

        it('should return correct result twice', () => {
          expect(this.mathService.multiply(0.1, 0.2)).toEqual(0.02);
        });
      });
    });
  });

  describe('#correctionFactor()', () => {
    describe('when called without params', () => {
      it('should return default factor', () => {
        expect(this.mathService.correctionFactor()).toEqual(1);
      });
    });

    describe('when called with params', () => {
      describe('when called with single integer param', () => {
        it('should return coorect factor once', () => {
          expect(this.mathService.correctionFactor(5)).toEqual(1);
        });
      });

      describe('when called with single float param', () => {
        it('should return correct factor twice', () => {
          expect(this.mathService.correctionFactor(0.004))
            .toEqual(1000);
        });
      });

      describe('when called with multiple integer params', () => {
        it('should return correct factor once', () => {
          expect(this.mathService.correctionFactor(1, 2000, 344))
            .toEqual(1);
        });
      });

      describe('when called with multiple float params', () => {
        it('should return correct factor once', () => {
          expect(this.mathService.correctionFactor(0.000003, 0.002))
            .toEqual(1000);
        });

        it('should return correct factor once', () => {
          expect(this.mathService.correctionFactor(0.000003, 0.000033))
            .toEqual(1000000);
        });
      });
    });
  });

  describe('#§s()', () => {
    describe('when called with params', () => {
      describe('when passed more then 180 degree', () => {
        beforeEach(() => {
          this.slices = this.mathService.generateSlices(
            - Math.PI / 6, 7 * Math.PI / 6, [ 70, 85, 100 ]
          );
        });

        describe('when starting point is negative', () => {
          describe('checking first slice', () => {
            beforeEach(() => {
              this.slice = this.slices.next().value;
            });

            it('should return correct start of first endpoint', () => {
              expect(this.slice.startAngle)
                .toBeCloseTo(- Math.PI / 6);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.slice.endAngle)
                .toBeCloseTo(23 * Math.PI / 30);
            });
          });

          describe('checking second slice', () => {
            beforeEach(() => {
              this.slices.next();
              this.slice = this.slices.next().value;
            });

            it('should return correct start of first endpoint', () => {
              expect(this.slice.startAngle)
                .toBeCloseTo(23 * Math.PI / 30);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.slice.endAngle)
                .toBeCloseTo(29 * Math.PI / 30);
            });
          });

          describe('checking third slice', () => {
            beforeEach(() => {
              this.slices.next();
              this.slices.next();
              this.slice = this.slices.next().value;
            });

            it('should return correct start of first endpoint', () => {
              expect(this.slice.startAngle)
                .toBeCloseTo(29 * Math.PI / 30);
            });

            it('should return correct end of first endpoint', () => {
              expect(this.slice.endAngle)
                .toBeCloseTo(7 * Math.PI / 6);
            });
          });
        });
      });
    });
  });

  describe('#calcRatio()', () => {
    describe('when called without params', () => {
      it('should return default result', () => {
        expect(MathService.calcRatio())
          .toEqual(0);
      });
    });

    describe('when called with params', () => {
      it('should return correct result once', () => {
        expect(MathService.calcRatio(10, 50))
          .toEqual(5);
      });

      it('should return correct result twice', () => {
        expect(MathService.calcRatio(0, 50))
          .toEqual(0);
      });
    });
  });

  describe('#calculateInterval()', () => {
    describe('when called with params', () => {
      describe('when pass points within 2 PI', () => {
        it('should return correct result once', () => {
          expect(MathService.calcCentralAngle(Math.PI / 4, 3 * Math.PI / 4))
            .toBeCloseTo(Math.PI / 2);
        });

        describe('when pass points in revert way', () => {
          it('should return correct result', () => {
            expect(MathService.calcCentralAngle(3 * Math.PI / 4, Math.PI / 4))
              .toBeCloseTo(Math.PI / 2);
          });
        });
      });

      describe('when pass points outside 2PI', () => {
        it('should return correct result twice', () => {
          expect(MathService.calcCentralAngle(9 * Math.PI / 4, 11 * Math.PI / 4))
            .toBeCloseTo(Math.PI / 2);
        });
      });
    });
  });
});
