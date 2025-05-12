import {combineReducers} from '@reduxjs/toolkit';
import albumSlice, {albumSelectors} from './album/reducer';

const reducers = {
  album: albumSlice.reducer,
};

const actions = {
  album: albumSlice.actions,
};

const selectors = {
  ...albumSelectors,
};

const rootReducer = combineReducers({
  album: albumSlice,
});

export {actions, reducers, selectors};
export default rootReducer;
