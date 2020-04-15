export const SET_EVENT_DETAILS  = 'SET_EVENT_DETAILS'

export const setEventDetails = (eventDetails) => {
    return {
        type: SET_EVENT_DETAILS,
        eventDetails : eventDetails
    }
}