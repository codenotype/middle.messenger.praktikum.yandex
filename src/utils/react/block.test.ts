import { expect } from 'chai';
import Block from './Block';
import Handlebars from 'handlebars';

class BlockChild extends Block {}
class BlockTest extends Block {
  constructor(props: any) {
    super(props);
  }

  protected init(): void {
    this.children = {
      child: new BlockChild({}),
    };
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile('{{{child}}}'), this.props);
  }
}

describe('Block', () => {
  let block: BlockTest;

  beforeEach(() => {
    block = new BlockTest({});
  });

  it('should have events init, mount, update and render', () => {
    const events = JSON.stringify(Block.events);

    expect(events).to.be.equal(
      JSON.stringify({
        init: 'init',
        mount: 'mount',
        update: 'update',
        render: 'render',
      })
    );
  });

  it('should has id as string', () => {
    expect(typeof block.id, 'string');
  });

  it('should has children as instance of Block', () => {
    expect(block.children.child instanceof Block).to.eq(true);
  });
});
