import React from 'react';
import moment from "moment/moment";
import './tables.css';

class ArrivingTable extends React.Component {

    render() {
        console.log(this.props.station)
        let table_data = [];
        let index = 0;
        for (var i = 0; i < this.props.traffic.length; i++) {
            let last_index = this.props.traffic[i].timeTableRows.length - 1;
            let arrival_time = null;
            let start_stop = null;
            let end_stop = null;
            for (var j = 0; j < this.props.traffic[i].timeTableRows.length; j++) {
                if (this.props.traffic[i].timeTableRows[j].stationShortCode === this.props.station) {
                    //Check if train is arrival, or if the train starting stop is is selected station
                    if (this.props.traffic[i].timeTableRows[j].type === 'ARRIVAL') {
                        arrival_time = moment(this.props.traffic[i].timeTableRows[j].scheduledTime).format('hh:mm');
                    }
                    if(j === 0){
                        arrival_time = moment(this.props.traffic[i].timeTableRows[j].scheduledTime).format('hh:mm');
                    }

                }
            }
            for (var k = 0; k < this.props.stations.stations.length; k++) {
                //convert stationShortcode to trainstation name
                if (this.props.stations.stations[k].stationShortCode === this.props.traffic[i].timeTableRows[0].stationShortCode) {
                    start_stop = this.props.stations.stations[k].stationName;
                }
                if (this.props.stations.stations[k].stationShortCode === this.props.traffic[i].timeTableRows[last_index].stationShortCode) {
                    end_stop = this.props.stations.stations[k].stationName;
                }
            }
            table_data[index] =
                <tr key={'train' + index}>
                    <td>{this.props.traffic[i].trainCategory}</td>
                    <td>{start_stop}</td>
                    <td>{end_stop}</td>
                    <td>{arrival_time}</td>
                </tr>;
            index++;
            if (index === 9) {
                break;
            }

        }

        return (
            <div className="traffic">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Juna</th>
                        <th>Lähtöasema</th>
                        <th>Pääteasema</th>
                        <th>Saapuu</th>
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