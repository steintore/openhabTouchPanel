import React from 'react';

const Webview = React.createClass({
    render: function() {
        return (<div className="iFrame"> <iframe src={this.props.data.url} /> </div>)
    }
});

export default Webview;