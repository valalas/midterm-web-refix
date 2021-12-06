import * as actionTypes from "../types";

        export const isLogged = (isLogged) => async (dispatch) => {
            try {
                localStorage.setItem("isLogged", isLogged);
                 dispatch({type: actionTypes.SET_AUTH, payload: isLogged});
            
                } catch(err) {
                    console.error(err);
                }
            };