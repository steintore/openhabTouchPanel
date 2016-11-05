import React from 'react';
import SwitchItemLight from "./SwitchItemLight.jsx";
import Name from "./Name.jsx";
import SwitchItem from "./SwitchItem.jsx";
import DimmerItem from "./DimmerItem.jsx";
import SceneItem from "./SceneItem.jsx";
import ImageItem from "./ImageItem.jsx";
import Webview from "./Webview.jsx";
import VideoItem from "./VideoItem.jsx";
import TemperatureItem from "./TemperatureItem.jsx";

const Tile = React.createClass({
    render: function () {
        var itemComponent = null;
        var itemLabel = this.props.data.label;
        if (itemLabel.indexOf("[") > 0)
            itemLabel = this.props.data.label.substr(0, this.props.data.label.indexOf("["));
        if (this.props.data.type == 'Webview') {
            itemComponent = <Webview data={this.props.data}/>;
        } else if (this.props.data.type === 'Image') {
            itemComponent = <ImageItem data={this.props.data} label={itemLabel}/>;
        } else if (this.props.data.type === 'Video') {
            itemComponent = <VideoItem data={this.props.data} label={itemLabel}/>;
        } else if (typeof this.props.data.item !== 'undefined'){
            if (this.props.data.item.type === 'SwitchItem' && this.props.data.icon.indexOf('light') != -1) {
                itemComponent = <SwitchItemLight data={this.props.data} handleSetState={this.props.handleSetState} label={itemLabel}/>
            } else if (this.props.data.item.type === 'SwitchItem') {
                itemComponent = <SwitchItem data={this.props.data} handleSetState={this.props.handleSetState} label={itemLabel}/>
            } else if (this.props.data.item.type === 'DimmerItem' || this.props.data.type === 'Slider') {
                itemComponent = <DimmerItem data={this.props.data} label={itemLabel}  handleSetState={this.props.handleSetState} />;
            } 
        }else if (this.props.data.icon === 'temperature') {
            itemComponent = <TemperatureItem data={this.props.data} label={itemLabel}/>;
        } else if (this.props.data.mapping != null) {
            itemComponent = <SceneItem data={this.props.data} label={itemLabel} handleSetState={this.props.handleSetState}/>;
        }
        var tileClass = 'tile ' + this.props.tileClass + ' ' + this.props.data.type;
        return (<div className={tileClass}>
            {itemComponent}
        </div>);
    }
});

export default Tile;