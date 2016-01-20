import React from 'react';
import ReactDOM from 'react-dom';

const Webview = React.createClass({
    render: function() {
        return <iframe src={this.props.data.url} />
    },
    componentDidMount: function() {
        this.renderFrameContents();
    },
    componentDidUpdate: function() {
      this.renderFrameContents();
    },
    componentWillUnmount: function() {
        React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
    },
    renderFrameContents: function() {
        var doc = ReactDOM.findDOMNode(this);
        if (doc.readyState == 'complete') {
            console.log('render');
            ReactDOM.render(<iframe src={this.props.data.url} />, doc.body);
        } else {
            setTimeout(this.renderFrameContents, 10);
        }
    }
});

export default Webview;