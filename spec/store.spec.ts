import { sandbox, spy } from 'sinon';
import {
  createStore,
  gaugeReducer,
  gaugeValueChangeAction,
  initialState,
} from '../src/store';

describe('Store', () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
    this.gaugeReducer = gaugeReducer;
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#createStore', () => {
    describe('when called without reducer', () => {

    });

    describe('when called with reducer', () => {
      beforeEach(() => {
        this.store = createStore(this.gaugeReducer);
        this.reducerSpy = this.sandbox.spy(this, 'gaugeReducer');
      });

      it('should contain getState fn', () => {
        expect(this.store.getState).toEqual(jasmine.any(Function));
      });

      it('should contain dispatch fn', () => {
        expect(this.store.dispatch).toEqual(jasmine.any(Function));
      });

      it('should contain subscribe fn', () => {
        expect(this.store.subscribe).toEqual(jasmine.any(Function));
      });
    });

    describe('#getState()', () => {
      beforeEach(() => {
        this.store = createStore(this.gaugeReducer);
      });

      describe('when firstly called', () => {
        it('should initiate state with initial object', () => {
          expect(this.store.getState()).toEqual(initialState);
        });
      });

      describe('when we dispatch an action', () => {
        it('should change state', () => {
          this.prevState = this.store.getState();

          this.store.dispatch(gaugeValueChangeAction(50));
          this.state = this.store.getState();

          expect(this.state.value).toEqual(50);
        });
      });
    });

    describe('#dispatch()', () => {
      beforeEach(() => {
        this.reducerSpy = this.sandbox.spy(this, 'gaugeReducer');
        this.store = createStore(this.gaugeReducer);
        this.callback = spy();
      });

      describe('when called', () => {
        it('should call reducer twice fn', () => {
          this.store.dispatch({});
          expect(this.reducerSpy.calledTwice).toBeTruthy();
        });

        it('should called with correct params', () => {
          const action = {},
            state = this.store.getState();

          this.store.dispatch(action);

          this.reducerSpy.calledWith(state, action);
        });

        it('should invokre callback', () => {
          this.store.subscribe(this.callback);

          this.store.dispatch({});

          expect(this.callback.called).toBeTruthy();
        });
      });
    });

    describe('#subscribe', () => {
      beforeEach(() => {
        this.store = createStore(this.gaugeReducer);
        this.callback = spy();
      });

      describe('Unsubscribe callback', () => {
        beforeEach(() => {
          this.unsubscribe = this.store.subscribe(this.callback);
        });

        it('should be a function', () => {
          expect(this.unsubscribe).toEqual(jasmine.any(Function));
        });

        describe('when call dispatch before calling unsubscribe', () => {
          it('should invoke callback', () => {
            this.store.dispatch({});

            expect(this.callback.called).toBeTruthy();
          });
        });

        describe('when call dispatch after calling unsubscribe', () => {
          it('should not invoke callback', () => {
            this.unsubscribe();

            this.store.dispatch({});

            expect(this.callback.called).not.toBeTruthy();
          });
        });
      });
    });
  });
});
