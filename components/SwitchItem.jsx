import React from 'react';
import Name from './Name.jsx';

const SwitchItem = React.createClass({
    handleClick: function () {
        var newState = this.props.data.item.state === 'ON' ? 'OFF' : 'ON';
        this.props.handleSetState(this.props.data.item.link, newState);
    },
    render: function () {
        return (<div className="item" onClick={this.handleClick}>
            <Name text={this.props.label} value={this.props.data.item.state} icon={this.props.data.icon}/>
            <div className="switchType">
                <i className={"fa fa-toggle-" + this.props.data.item.state.toLowerCase() + " fa-5x"}></i>
            </div></div>)
    }
});

export default SwitchItem;