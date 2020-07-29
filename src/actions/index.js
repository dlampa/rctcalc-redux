
// Create an action (map) to the appropriate function that will add to the global state

const addToCalcHistory = (calcHistory) => {
    return ({
        type: "ADD_CALC_HISTORY",
        payload: calcHistory
    }
    );
}

export default addToCalcHistory;
