import {
    getHome,
} from "../actionTypes";
const initialState = {
    loading: 1,
    data: [],
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getHome.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getHome.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    data: action.json.results.data || [],
                    loading:0
                };
            } else {
                return {
                    ...state,
                    loading:2
                };
            }
        default:
            return state;
    }
};