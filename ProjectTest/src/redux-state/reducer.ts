import { screenReducer, screenPersistReducer } from '@rdxFeatures/screen'
import { rdxProductReducers } from '@rdxFeatures/product'
// import { combineReducers } from 'redux'

// const oldWayReducer = combineReducers({
//   screenReducer
// })

const reducer = {
  screenReducer,
  screenPersistReducer,
  productReducer: rdxProductReducers
}

export default reducer
