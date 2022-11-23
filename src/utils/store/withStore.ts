import Block from '../react/Block';
import store, { storeEvents } from './Store';

export const withStore = (mapStateToProps: (state: any) => any) => {
  return (Component: typeof Block) => {
    let prev: any = undefined;

    return class WithStore extends Component {
      constructor(props: any) {
        prev = mapStateToProps(store.getState());

        super({ ...props, ...prev });

        store.on(storeEvents.updated, () => {
          const stateProps = mapStateToProps(store.getState());

          prev = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
};
