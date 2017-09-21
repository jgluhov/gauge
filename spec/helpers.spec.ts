import * as constants from '../src/constants';
import * as helpers from '../src/helpers';
import { Point } from '../src/structures';

describe('Helpers', () => {

  describe('#polarToCartesian()', () => {
    describe('when called without params', () => {
      it('should return object', () => {
        expect(helpers.polarToCartesian())
          .toEqual(jasmine.any(Point));
      });

      it('should return zero coordinates', () => {
        expect(helpers.polarToCartesian())
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
            expect(helpers.polarToCartesian(0, 0, this.radius, 0))
              .toEqual(new Point(2.5, 0));
          });

          it('should return correct second point', () => {
            const point: Point = helpers.polarToCartesian(
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
            expect(helpers.polarToCartesian(-5, -5, 2.5, 0))
              .toEqual(new Point(-2.5, -5));
          });

          it('should return correct second point', () => {
            const angle = Math.PI / 4,
              radius = 2.5;

            const point = helpers.polarToCartesian(-3, 5, radius, angle);

            expect(point.x).toBeCloseTo(-1.2322330);
            expect(point.y).toBeCloseTo(6.7677669);
          });
        });
      });
    });

  });

  describe('#describeArc()', () => {
    describe('when called without params', () => {
      it('should return zero path', () => {
        expect(helpers.describeArc())
          .toEqual(jasmine.any(String));
      });
    });

    describe('when called with params', () => {
      describe('when called with specified starting point', () => {
        beforeEach(() => {
          this.arc = helpers.describeArc(0, 0);
        });

        it('should return correct arc string', () => {
          expect(/^M 0 0.*/.test(this.arc))
            .toBeTruthy();
        });
      });

      describe('when called with specified radius', () => {
        beforeEach(() => {
          this.arc = helpers.describeArc(0, 0, 5);
        });

        it('should return correct arc string', () => {
          expect(/^M \d+ \d+ A 5 5.*/.test(this.arc))
            .toBeTruthy();
        });
      });

      describe('when arc is less then 180 degree', () => {
        beforeEach(() => {
          this.startAngle = 0;
          this.endAngle = Math.PI / 2;
          this.arc = helpers.describeArc(
            0, 0, 5, this.startAngle, this.endAngle
          );
        });

        it('should set arc flag to zero', () => {
          expect(/^M \d+ \d+ A \d+ \d+ \d+ 0.*/.test(this.arc))
            .toBeTruthy();
        });
      });

      describe('when arc is more then 180 degree', () => {
        beforeEach(() => {
          this.startAngle = 0;
          this.endAngle = Math.PI;
          this.arc = helpers.describeArc(
            0, 0, 5, this.startAngle, this.endAngle
          );
        });

        it('should set arc flag to zero', () => {
          expect(/^M \d+ \d+ A \d+ \d+ \d+ 1.*/.test(this.arc))
            .toBeTruthy();
        });
      });

      describe('when called with specified radius and angles', () => {
        beforeEach(() => {
          this.startAngle = 0;
          this.endAngle = 2 * Math.PI;
          this.arc = helpers.describeArc(
            0, 0, 5, this.startAngle, this.endAngle
          );
        });

        // it('should set end point correctly', () => {
        //   expect(/^M \d+ \d+ A \d+ \d+ \d+ \d+ 5 0$/.test(this.arc))
        //     .toBeTruthy();
        // });
      });

    });
  });

  describe('#multiplier()', () => {
    describe('when pass param without precision', () => {
      it('should return 1', () => {
        expect(helpers.multiplier(5)).toEqual(1);
      });
    });

    describe('when pass param with precision', () => {
      it('should return correct multiplier once', () => {
        expect(helpers.multiplier(5.5)).toEqual(10);
      });

      it('should return correct multiplier twice', () => {
        expect(helpers.multiplier(1.555222))
          .toEqual(1000000);
      });

      it('should return correct multiplier third', () => {
        expect(helpers.multiplier(1.555222333))
          .toEqual(1000000000);
      });
    });
  });
});
