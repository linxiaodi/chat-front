import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as loginReducer } from './containers/login/'
import { reducer as fillInfoReducer } from './containers/geniusSetting'
// combine
const middlewares = [thunkMiddleware]
const reducers = combineReducers({
  user: loginReducer,
  userInfo: fillInfoReducer
})

const storeEnhancer = compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(reducers, {}, storeEnhancer)

export default store
