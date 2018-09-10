import React from 'react';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="header">
                <p className="header-title">Aseman junatiedot</p>
            </div>
        );

    }
}

export default Header;