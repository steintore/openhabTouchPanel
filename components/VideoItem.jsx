import React from 'react';

const VideoItem = React.createClass({
    render: function () {
        return (<div className="item">
            <div className="videoType">
                <video src={this.props.data.url}>
                </video>
            </div>
        </div>)
    }
});

export default VideoItem;