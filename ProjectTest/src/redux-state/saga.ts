import { rdxProductSagas } from "@rdxFeatures/product";
import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();

const runSagas = () => {
  sagaMiddleware.run(rdxProductSagas)
}

export default runSagas