import { createStore, combineReducers } from 'redux';
import locationReducer from '../store/reducers/locations';
import usernameReducer from '../store/reducers/username';
import eventDetailsReducer from './reducers/eventDetailsReducer';
import classDetailsReducer from './reducers/classDetails';

const rootReducer = combineReducers({
    location: locationReducer,
    username: usernameReducer,
    eventDetails: eventDetailsReducer,
    classDetails: classDetailsReducer
})

const store = createStore(rootReducer);

export default store;