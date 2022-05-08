import { screenReducer } from '@rdxFeatures/screen'
import { rdxProductReducer } from '@rdxFeatures/product'
import { rdxCartPersistReducer } from '@rdxFeatures/cart'
// import { combineReducers } from 'redux'

// const oldWayReducer = combineReducers({
//   screenReducer
// })

const reducer = {
  screenReducer,
  // screenPersistReducer,
  productReducer: rdxProductReducer,
  cartReducer: rdxCartPersistReducer
}

export default reducer
