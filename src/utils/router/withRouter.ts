import { BlockWrap } from '../react/types';
import Router from './Router';

export interface RoutedProps {
  router: typeof Router;
}

export const withRouter = (Component: BlockWrap) => {
  type Props = typeof Component extends BlockWrap<infer P> ? P : any;

  return class Routed extends Component {
    constructor(props: Props & RoutedProps) {
      super({ ...props, router: Router });
    }
  };
};
