import * as actionTypes from "../types";

const initialState ={
isLogged: "",


error: null,
};

function authReducer(state=initialState, action) {

    switch(action.type) {
                 case actionTypes.SET_AUTH:
                return {
                    ...state,
                    isLogged: action.payload,
                };
            default:
                return {
                    ...state,
                };
    }
    

}

export default authReducer;