import * as constants from '../src/constants';
import * as helpers from '../src/helpers';

describe('Helpers', () => {

  describe('#polarToCartesian()', () => {
    describe('when called without params', () => {
      it('should return object', () => {
        expect(helpers.polarToCartesian())
          .toEqual(jasmine.any(Object));
      });

      it('should return zero coordinates', () => {
        expect(helpers.polarToCartesian())
          .toEqual({ x: 0, y: 0 });
      });

    });

    describe('when called with params', () => {

      describe('when set center point ot zero', () => {
        describe('when we specify radius and angle', () => {

          it('should return correct first point', () => {
            expect(helpers.polarToCartesian(0, 0, 2.5, 0))
              .toEqual({ x: 2.5, y: 0 });
          });

          it('should return correct second point', () => {
            const angle = Math.PI / 4,
              radius = 2.5;

            const point = helpers.polarToCartesian(0, 0, radius, angle);

            expect(point.x).toBeCloseTo(1.7677669);
            expect(point.y).toBeCloseTo(1.7677669);
          });
        });
      });

      describe('when we specify center point', () => {
        describe('when we specify radius and angle', () => {

          it('should return correct first point', () => {
            expect(helpers.polarToCartesian(-5, -5, 2.5, 0))
              .toEqual({ x: -2.5, y: -5 });
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

});
