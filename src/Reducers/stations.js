import {loop, Cmd} from 'redux-loop';
import * as apiCalls from '../Functions/index';
import * as urls from '../Constants/endpoints';

const initialState = {};

const Run = (func, ...args) => Cmd.run(func, {
    successActionCreator: x => x,
    args
});

const getStations = (url) => apiCalls.Get('GET_STATIONS', url);
const getTraffic = (url) => apiCalls.Get('GET_TRAFFIC', url)
const stationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_STATIONS':
            return loop(
                {...state, stationsFetching: true, stationsFetched: false},
                Run(getStations, urls.stations_url),
            )
        case 'GET_STATIONS_RESULT':
            return {...state, stationsFetching: false, stationsFetched: true, stations: action.payload};

        case 'GET_STATIONS_ERROR':
            return {
                ...state,
                stationsFetching: false,
                stationsFetched: true,
                stationsError: true,
                error: action.payload
            };

        case 'GET_TRAFFIC':
            let query_url = urls.traffic_url + action.payload.station +  '?arriving_trains=20&minutes_before_arrival=1440&minutes_before_departure=30';
            console.log(query_url)
            return loop(
                {...state, trafficFetching: true, trafficFetched: false},
                Run(getTraffic, query_url)
        )
        case 'GET_TRAFFIC_RESULT':
            return {...state, trafficFetching: false, trafficFetched: true, traffic: action.payload};

        case 'GET_TRAFFIC_ERROR':
            console.log(action.payload);
            return {...state, trafficFetching: false, trafficFetched: false, trafficError: true, error: action.payload};
        default:
            return {...state};
    }
}
export default stationsReducer;
