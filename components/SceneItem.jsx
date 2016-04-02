import React from 'react';
import Name from './Name.jsx';
import SceneSubItem from './SceneSubItem.jsx';

const SceneItem = React.createClass({
    render: function () {
        const t = this.props;
        return (<div className="item">
            <Name text={this.props.label} value={this.props.data.item.state} icon={this.props.data.icon}/>
            <div className="SceneItemContainer">
            {this.props.data.mapping.map(function(it) {
                return (<SceneSubItem key={it.command} label={it.label} selected={t.data.item.state == it.command} command={it.command} handleSetState={t.handleSetState} data={t.data} />)
            })}
                </div>
        </div>)
    }
});

export default SceneItem;