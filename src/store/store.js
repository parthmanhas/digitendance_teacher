import { createStore, combineReducers } from 'redux';
import locationReducer from '../store/reducers/locations';
import usernameReducer from '../store/reducers/username';

const rootReducer = combineReducers({
    location: locationReducer,
    username: usernameReducer
})

const store = createStore(rootReducer);

export default store;