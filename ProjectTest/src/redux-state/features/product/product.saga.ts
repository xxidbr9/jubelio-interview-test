import colors from '@styles/colors';
import { put, select, takeLatest, all } from 'redux-saga/effects';
import { rdxProductSelector } from '.';
import { rdxProductState } from './product.selector';
import { rdxProductActions } from './product.slice';

function* setSearchProductListSaga() {
  const state = yield select(rdxProductState)
  const searchQuery = state.searchQuery

  const newSearchProductList = state.products
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(item => {
      const re = new RegExp(searchQuery, 'gi')
      let name = item.name.replace(re, match => `<span style="color:${colors.red[500]}; font-weight:700;">${match}</span>`) // this is bad
      return {
        ...item,
        name,
      }
    })

  console.log(newSearchProductList)
  yield put({ type: rdxProductActions.setSearchProductListSaga.type, payload: { searchProducts: newSearchProductList } });
}

function* searchQueryWatcher() {
  yield takeLatest(rdxProductActions.setSearchProductQuery.type, setSearchProductListSaga)
}


export default function* rootSaga() {
  yield all([
    searchQueryWatcher(),
  ]);
}