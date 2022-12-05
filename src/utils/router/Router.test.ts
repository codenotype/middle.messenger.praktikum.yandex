import { expect } from 'chai';
import sinon from 'sinon';
import { BlockWrap } from '../react/types';
import Router from './Router';
import router from './Router';

describe('Router', () => {
  global.window.history.back = () => {
    if (!window.onpopstate) return;

    window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
  };
  global.window.history.forward = () => {
    if (!window.onpopstate) return;

    window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
  };

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const TestBlock = class {
    getContent = getContentFake;
  } as unknown as BlockWrap;

  const usedRouter = router.use('/', TestBlock);

  it('use() should return Router instance', () => {
    const result = usedRouter;

    expect(result).to.eq(Router);
  });

  describe('back and forward', () => {
    it('should render a page on back', () => {
      usedRouter.start();

      router.back();

      expect(getContentFake.callCount).to.eq(3);
    });

    it('should render a page on forward', () => {
      usedRouter.start();

      router.back();
      router.forward();

      expect(getContentFake.callCount).to.eq(6);
    });
  });

  it('should render a page on start', () => {
    usedRouter.start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
