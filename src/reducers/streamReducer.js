import { FETCH_STREAMS, FETCH_STREAM, CREATE_STREAM, EDIT_STREAM, DELETE_STREAM } from '../actions/types';
import _ from 'lodash';

//* payload: id

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {...setImmediate, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload)
            //omit does not change original state, create new object
        // case DELETE_STREAM: have't tried
        //     return { [action.payloai.id]: state.filter(s => s.id !== action.payload)}
        default:
            return state;
    }
}