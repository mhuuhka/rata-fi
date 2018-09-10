export const fetchStations = () => ({
    type: 'GET_STATIONS',
});

export const fetchTraffic = (station) => ({
    type: 'GET_TRAFFIC',
    payload: {
        station: station,
    }
})