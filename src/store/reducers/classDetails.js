import { SET_CLASS_DETAILS } from '../actions/classDetails';

const initialState = {
    classDetails: ''
}

const classDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CLASS_DETAILS:
            return{
                ...state,
                classDetails: action.classDetails
            }

        default:
            return state;
    }
}

export default classDetailsReducer;