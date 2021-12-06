import * as actionTypes from "../types";



    
        export const setComment = (comment) => async (dispatch) => {
            try {
                localStorage.setItem("comment", comment);
                 dispatch({type: actionTypes.SET_COMMENT, payload: comment});
            
                } catch(err) {
                    console.error(err);
                }
            };