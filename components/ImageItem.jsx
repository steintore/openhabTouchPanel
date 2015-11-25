import React from 'react';

const ImageItem = React.createClass({
    render: function () {
        return (<div className="item">
            <div className="imageType">
                <img src={this.props.data.url}/>
            </div>
        </div>)
    }
});

export default ImageItem;