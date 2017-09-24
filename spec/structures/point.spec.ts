import Point from '../../src/structures/point';

describe('Point', () => {
  describe('when create without params', () => {
    beforeEach(() => {
      this.point = new Point();
    });

    it('should return point where x is equal zero', () => {
      expect(this.point.x).toEqual(0);
    });

    it('should return point where y is equal zero', () => {
      expect(this.point.y).toEqual(0);
    });
  });
});
