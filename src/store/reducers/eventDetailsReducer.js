import { SET_EVENT_DETAILS } from '../actions/eventDetails';
import { initializeApp } from 'firebase';

const initialState = {
    eventName: '',
    eventDate: '',
    eventSecret: '',
    eventTime: '',
    expiryTime: '',
    eventType: ''
}

const eventDetailsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_EVENT_DETAILS:
            return {
                ...state,
                eventName:      action.eventDetails.eventName,
                eventDate:      action.eventDetails.eventDate,
                eventSecret:    action.eventDetails.eventSecret,
                eventTime:      action.eventDetails.eventTime,
                expiryTime:     action.eventDetails.expiryTime,
                eventType:      action.eventDetails.eventType
            }

        default:
            return state;
    }

}

export default eventDetailsReducer;