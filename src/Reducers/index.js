import {combineReducers} from 'redux-loop';
import stationsReducer from './stations.js';

const rootReducer = combineReducers({
    stations: stationsReducer,

});

export default rootReducer;
