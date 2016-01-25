import React from 'react';
import Name from './Name.jsx';

const TemperatureItem = React.createClass({
    render: function () {
        return (<div className="item">
            <Name text={this.props.label} value={this.props.data.item.state} icon={this.props.data.icon}/>
            <div className="tempType">{this.props.data.item.state == 'Uninitialized' ? '? ' : this.props.data.item.state} &deg;C</div>
        </div>)
    }
});

export default TemperatureItem;