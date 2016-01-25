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
                <div className="onoffswitch">
                    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" checked={this.props.data.item.state.toLowerCase() == 'on'}>
                        <label className="onoffswitch-label" for="myonoffswitch">
                            <span className="onoffswitch-inner"></span>
                            <span className="onoffswitch-switch"></span>
                        </label>
                        </input>
                </div>
            </div></div>)
    }
});

export default SwitchItem;