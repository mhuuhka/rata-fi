import React from 'react';
import moment from "moment/moment";
import 'moment-timezone';
import './tables.css';

class ArrivingTable extends React.Component {

    render() {
        let table_data = [];
        let index = 0;
        for (var i = 0; i < this.props.traffic.length; i++) {
            let last_index = this.props.traffic[i].timeTableRows.length - 1;
            let departure_time = null;
            let start_stop = null;
            let end_stop = null;
            let train_type = null;
            for (var j = 0; j < this.props.traffic[i].timeTableRows.length; j++) {
                if (this.props.traffic[i].timeTableRows[j].stationShortCode === this.props.station && moment().isBefore(moment(this.props.traffic[i].timeTableRows[j].scheduledTime))) {
                    //Check if train is departing, or if the train starting stop is is selected station
                    if (this.props.traffic[i].timeTableRows[j].type === 'DEPARTURE' && j !== this.props.traffic[i].timeTableRows.length - 1) {
                        departure_time = moment.tz(this.props.traffic[i].timeTableRows[j].scheduledTime, 'Europe/Helsinki').format('HH:mm');
                        for (var k = 0; k < this.props.stations.stations.length; k++) {
                            //convert stationShortcode to trainstation name
                            if (this.props.stations.stations[k].stationShortCode === this.props.traffic[i].timeTableRows[0].stationShortCode) {
                                start_stop = this.props.stations.stations[k].stationName;
                            }
                            if (this.props.stations.stations[k].stationShortCode === this.props.traffic[i].timeTableRows[last_index].stationShortCode) {
                                end_stop = this.props.stations.stations[k].stationName;
                            }
                        }
                        train_type = this.props.traffic[i].trainType + ' ' + this.props.traffic[i].trainNumber
                        table_data[index] =
                            <tr key={'train' + index}>
                                <td>{train_type}</td>
                                <td>{start_stop}</td>
                                <td>{end_stop}</td>
                                <td>{departure_time}</td>
                            </tr>;
                        if (index < 10) {
                            index++;
                        }
                    }
                }
            }


        }

        return (
            <div className="traffic">
                <h3>{this.props.station}</h3>
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Juna</th>
                        <th>Lähtöasema</th>
                        <th>Pääteasema</th>
                        <th>Lähtee</th>
                    </tr>
                    </thead>
                    <tbody>
                    {table_data}
                    </tbody>
                </table>
            </div>
        );

    }
}

export default ArrivingTable;