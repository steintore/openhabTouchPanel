import React from 'react';

const SceneSubItem = React.createClass({
    handleClick: function () {
        
        var newState = this.props.command;
        console.log(newState);
        this.props.handleSetState(this.props.data.item.link, newState);
    },
    render: function () {
        return (<div className={this.props.selected ? 'selected sceneSubItem' : 'sceneSubItem'} onClick={this.handleClick}> <div>{this.props.label}</div></div>)
    }
});

export default SceneSubItem;