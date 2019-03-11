import { ADD_PLAYER_ACTION, DELETE_PLAYER_ACTION, HANDLE_SORT_DATA, EDIT_PLAYER_ACTION } from '../reducers/playersReducers';

export const addPlayerAction = (data) => dispatch => {
    dispatch({
        type: ADD_PLAYER_ACTION,
        payload: { ...data.formData },
    })
};

export const deletePlayerAction = (data) => dispatch => {
    dispatch({
        type: DELETE_PLAYER_ACTION,
        payload: data,
    })
};

export const handleSortingAction = (data) => dispatch => {
    dispatch({
        type: HANDLE_SORT_DATA,
        payload: data,
    })
};

export const editPlayerAction = (data) => dispatch => {
    debugger;
    dispatch({
        type: EDIT_PLAYER_ACTION,
        payload: data,
    })
};
