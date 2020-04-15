export const SET_CLASS_DETAILS = 'SET_CLASS_DETAILS';

export const setClassDetails = (classDetails)  => {
    return {
        type: SET_CLASS_DETAILS,
        classDetails: classDetails 
    }
}