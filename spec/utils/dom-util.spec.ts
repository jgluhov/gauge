import DOMUtil from '../../src/utils/dom-util';

describe('SVG', () => {
  describe('#createShadowRoot()', () => {
    describe('when its called', () => {
      it('should return SVGElement', () => {
        expect(DOMUtil.createShadowRoot('<div></div>', '<style></style>'))
          .toEqual(jasmine.any(Node));
      });
    });
  });
});
