import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import './stations.css';
import {fetchStations, fetchTraffic} from "../../ActionCreators";
import ArrivingTable from "../../Components/Stations/arrivingTable";
import DepartingTable from "../../Components/Stations/departingTable";
import Loading from "../../Components/Loader/loading";

function mapDispatchToProps(dispatch) {
    return {
        fetchStations: () => dispatch(fetchStations()),
        fetchTraffic: (station) => dispatch(fetchTraffic(station)),
    }
}

const mapStateToProps = state => {
    return {
        stations: state.stations,
        traffic: state.stations.traffic,
        trafficFetched: state.stations.trafficFetched,
    }
}

class StationsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arriving_visible: true,
            departing_visible: false,
            stations: this.props.stations.stations,
            station: '',
        };
    }

    componentWillMount() {
        this.props.fetchStations();
    }

    onChange = (e) => {
        this.setState({
            station: e.target.value,
        })
        this.props.fetchTraffic(e.target.value)
    }

    setVisible = (arriving, departing) => (e) => {
        this.setState({
            arriving_visible: arriving,
            departing_visible: departing,
        })
    }

    render() {
        console.log(moment().format('YY-MM-DD'))
        let options = [];
        for (var i = 0; i < this.state.stations.length; i++) {
            if (this.state.stations[i].passengerTraffic) {
                options.push(
                    <option key={'station' + this.state.stations[i].stationName}
                            value={this.state.stations[i].stationShortCode}>
                        {this.state.stations[i].stationName}
                    </option>);
            }

        }
        let list = <datalist id="stations">
            {options}
        </datalist>
        let component = null;
        if (this.props.trafficFetched) {
            if (this.state.arriving_visible) {
                component = <ArrivingTable traffic={this.props.traffic} station={this.state.station}
                                           stations={this.props.stations}/>
            }
            if (this.state.departing_visible) {
                component = <DepartingTable traffic={this.props.traffic} station={this.state.station}
                                            stations={this.props.stations}/>
            }
        } else if (this.props.trafficFetching) {
            component = <Loading type={'bubbles'} height={30} width={30}/>
        } else {
            component = <div></div>
        }

        return (
            <div className="stations">
                <div className="row">
                    <div className="col-lg-6">
                        <label>Hae asemaa nimeltä</label>
                        <input list="stations" autoComplete="off" className="form-control" onChange={this.onChange}/>
                        {list}
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="btn-group">
                            <button className="btn btn-link" disabled={this.state.arriving_visible}
                                    onClick={this.setVisible(true, false)}>Saapuvat
                            </button>
                            <button className="btn btn-link" disabled={this.state.departing_visible}
                                    onClick={this.setVisible(false, true)}>Lähtevät
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        {component}
                    </div>
                </div>
            </div>
        );

    }
}

const Stations = connect(mapStateToProps, mapDispatchToProps)(StationsView);
export default Stations;