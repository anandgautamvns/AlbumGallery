import albumSlice, {albumSelectors} from './album/reducer';

const actions = {
  album: albumSlice.actions,
};

const reducers = {
  album: albumSlice.reducer,
};

const selectors = {
  ...albumSelectors,
};

export {actions, reducers, selectors};
