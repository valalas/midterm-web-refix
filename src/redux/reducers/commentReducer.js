import * as actionTypes from "../types";

const initialState ={
comment:"",


error: null,
};

function commentReducer(state=initialState, action) {

    switch(action.type) {
                 case actionTypes.SET_COMMENT:
                return {
                    ...state,
                    comment: action.payload,
                };

            default:
                return {
                    ...state,
                };
    }
    

}

export default commentReducer;