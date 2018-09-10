import React from 'react';
import ReactLoading from 'react-loading';

class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loader: 'spinningBubbles',
            color: 'red',
        };
    }
    render(){
        return(
            <div className="loader">
            <ReactLoading type={this.props.loader} color={this.state.color} height={this.props.height} width={this.props.width}/>
            </div>
                );

    }
}

export default Loading;