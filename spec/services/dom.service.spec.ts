import DOMService from '../../src/services/dom.service';

describe('SVG', () => {
  describe('#createShadowRoot()', () => {
    describe('when its called', () => {
      it('should return SVGElement', () => {
        expect(DOMService.createShadowRoot(
          '<style></style>',
          '<div></div>')
        ).toEqual(jasmine.any(Node));
      });
    });
  });
});
