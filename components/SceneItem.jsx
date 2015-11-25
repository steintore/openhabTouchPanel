import React from 'react';
import Name from './Name.jsx';

const SceneItem = React.createClass({
    findItemValue: function () {
        var itemValue = null;
        var itemState = this.props.data.item.state;
        this.props.data.mapping.map(function (it) {
            if (it.command === itemState)
                itemValue = it.label;
        });
        return itemValue;
    },
    render: function () {
        return (<div className="item">
            <Name text={this.props.label} value={this.props.data.item.state} icon={this.props.data.icon}/>
            <div className="sceneType">{this.findItemValue()}</div>
        </div>)
    }
});

export default SceneItem;