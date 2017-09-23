import SVGService from '../../src/services/svg-service';
import { Point } from '../../src/structures';

describe('SVG Service', () => {
  describe('#polarToCartesian()', () => {
    describe('when called without params', () => {
      it('should return object', () => {
        expect(SVGService.polarToCartesian())
          .toEqual(jasmine.any(Point));
      });

      it('should return zero coordinates', () => {
        expect(SVGService.polarToCartesian())
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
            expect(SVGService.polarToCartesian(0, 0, this.radius, 0))
              .toEqual(new Point(2.5, 0));
          });

          it('should return correct second point', () => {
            const point: Point = SVGService.polarToCartesian(
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
            expect(SVGService.polarToCartesian(-5, -5, 2.5, 0))
              .toEqual(new Point(-2.5, -5));
          });

          it('should return correct second point', () => {
            const angle = Math.PI / 4,
              radius = 2.5;

            const point = SVGService.polarToCartesian(-3, 5, radius, angle);

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
        expect(SVGService.describeArc())
          .toEqual(jasmine.any(String));
      });
    });

    describe('when called with params', () => {
      describe('when called with specified starting point', () => {
        beforeEach(() => {
          this.arc = SVGService.describeArc(0, 0);
        });

        it('should return correct arc string', () => {
          expect(/^M 0 0.*/.test(this.arc))
            .toBeTruthy();
        });
      });

      describe('when called with specified radius', () => {
        beforeEach(() => {
          this.arc = SVGService.describeArc(0, 0, 5);
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
          this.arc = SVGService.describeArc(
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
          this.arc = SVGService.describeArc(
            0, 0, 5, this.startAngle, this.endAngle
          );
        });

        it('should set arc flag to zero', () => {
          expect(/^M \d+ \d+ A \d+ \d+ \d+ 1.*/.test(this.arc))
            .toBeTruthy();
        });
      });

      describe('when called with specified radius and angles once', () => {
        beforeEach(() => {
          this.startAngle = 0;
          this.endAngle = 2 * Math.PI;
          this.arc = SVGService.describeArc(
            0, 0, 5, this.startAngle, this.endAngle
          );
        });

        it('should set end point correctly', () => {
          expect(/^M \d+ \d+ A \d+ \d+ \d+ \d+ \d+ 5 0$/.test(this.arc))
            .toBeTruthy();
        });
      });

      describe('when called with specified radius and angles twice', () => {
        beforeEach(() => {
          this.startAngle = 0;
          this.endAngle = Math.PI;
          this.arc = SVGService.describeArc(
            140, 470, 130, this.startAngle, this.endAngle
          );
        });

        it('should set end point correctly', () => {
          expect(/^M 270 470 A 130 130 0 1 0 10 470$/.test(this.arc))
            .toBeTruthy();
        });
      });
    });
  });
});
