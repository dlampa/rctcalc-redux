// Redux reducer function, which defines what happens when an action is invoked

const calcHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_CALC_HISTORY":
            // Copy old array into a new one
            const updatedState = [...slice]; // Copy old array into a new one
            updatedState.push(action.payload);
            return updatedState;
        // Return state if no action.type is specified.
        default:
            return state;
    }
}    

export default calcHistoryReducer;

