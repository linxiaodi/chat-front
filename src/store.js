import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as loginReducer } from './containers/login/'
import { reducer as fillInfoReducer } from './containers/geniusSetting'
import { reducer as discoveryReducer } from './containers/discovery'
import { reducer as chatReducer } from './containers/chat'
import { reducer as contactReducer } from './containers/contact/'

// combine
const middlewares = [thunkMiddleware]
const reducers = combineReducers({
  user: loginReducer,
  userInfo: fillInfoReducer,
  discoveryList: discoveryReducer,
  chat: chatReducer,
  contactList: contactReducer
})

const storeEnhancer = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(reducers, {}, storeEnhancer)

export default store
