import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './Components/Header/header';
import Views from './Containers/index';

class App extends Component {
    render() {
        return (
            <div className="Application">
                <div className="row">
                    <div className="col-lg-12">
                        <Header/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Views/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
