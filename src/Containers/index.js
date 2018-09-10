import React from 'react';
import './index.css';
import Stations from "./Stations/stations";

class Views extends React.Component {

    render() {
        // For future, add logic to change views (Router?)
        return (
            <div className="views">
                <Stations/>
            </div>
        );

    }
}

export default Views;