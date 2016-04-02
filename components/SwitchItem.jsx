import React from 'react';
import Name from './Name.jsx';

const SwitchItem = React.createClass({
    handleClick: function () {
        var newState = this.props.data.item.state === 'ON' ? 'OFF' : 'ON';
        this.props.handleSetState(this.props.data.item.link, newState);
    },
    handleChange: function(event) {
        this.setState({checked: event.target.value});
    },
    render: function () {
        return (<div className="item" onClick={this.handleClick}>
            <Name text={this.props.label} value={this.props.data.item.state} icon={this.props.data.icon}/>
            <div className="switchType">
                <div className="onoffswitch">
                    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={this.props.data.item.name} checked={this.props.data.item.state == 'ON'} onChange={this.handleChange}/>
                        <label className="onoffswitch-label" htmlFor={this.props.data.item.name}>
                            <span className="onoffswitch-inner"/>
                            <span className="onoffswitch-switch"/>
                        </label>
                </div>
            </div></div>)
    }
});

export default SwitchItem;