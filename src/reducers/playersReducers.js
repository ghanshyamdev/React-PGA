export const ADD_PLAYER_ACTION = 'ADD_PLAYER_ACTION';
export const DELETE_PLAYER_ACTION = 'DELETE_PLAYER_ACTION';
export const EDIT_PLAYER_ACTION = 'EDIT_PLAYER_ACTION';
export const HANDLE_SORT_DATA = 'HANDLE_SORT_DATA';

const init = {
    displayPlayerData: [
        { id: 1, firstName: 'Mark', lastName: 'Otto', score: 98 },
        { id: 2, firstName: 'Junge', lastName:'John', score: 68 },
        { id: 3, firstName: 'Vera', lastName:'Rob', score: 88 },
    ]
};

export default (state = init, action) => {
    switch (action.type) {
        case ADD_PLAYER_ACTION:
            return {
                ...state, displayPlayerData: [ ...state.displayPlayerData, { ...action.payload, id: state.displayPlayerData.length + 1 } ]
            };
        case DELETE_PLAYER_ACTION: {
            const { displayPlayerData } = state;
            displayPlayerData.splice(displayPlayerData.findIndex(e => e.id === action.payload), 1);
            return {
                ...state, displayPlayerData: [...displayPlayerData]
            };
        }
        case EDIT_PLAYER_ACTION: {
            const { displayPlayerData } = state;
            const index = displayPlayerData.findIndex(e => e.id === action.payload.formData.id);
            debugger;
            console.log(index);
            return {
                ...state, displayPlayerData: [ ...displayPlayerData.slice(0, index), { ...action.payload.formData }, ...displayPlayerData.slice(index + 1, displayPlayerData.length) ]
            };
        }
        case HANDLE_SORT_DATA:
            return {
                ...state, displayPlayerData: [ ...action.payload ]
            };
        default:
            return state
    }
}