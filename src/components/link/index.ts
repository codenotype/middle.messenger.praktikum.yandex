import Handlebars from 'handlebars';
import Block from '../../utils/react/Block';
import { Events } from '../../utils/react/types';
import { RoutedProps, withRouter } from '../../utils/router/withRouter';
import { link } from './link.tmpl';

interface LinkProps extends RoutedProps {
  label: string;
  to: string;
  events?: Events;
}

class LinkBase extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.go(),
      },
    });
  }

  go() {
    this.props.router.go(this.props.to);
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(link), this.props);
  }
}

export const Link = withRouter(LinkBase);
