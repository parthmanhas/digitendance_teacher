import { createStore, combineReducers } from 'redux';
import locationReducer from '../store/reducers/locations';
import usernameReducer from '../store/reducers/username';
import eventDetailsReducer from './reducers/eventDetailsReducer';

const rootReducer = combineReducers({
    location: locationReducer,
    username: usernameReducer,
    eventDetails: eventDetailsReducer
})

const store = createStore(rootReducer);

export default store;