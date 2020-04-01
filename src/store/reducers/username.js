import { SET_USERNAME } from '../actions/username';

const initialState = {
    username: ''
}

const usernameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        default:
            return state
    }
}

export default usernameReducer;