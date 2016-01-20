import React from 'react';
import ReactDOM from 'react-dom';

const Webview = React.createClass({
    componentDidMount: function () {
        var iframe = document.createElement("iframe");
        iframe.src = this.props.data.url;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = "0px";
        iframe.scrolling = "no";
        iframe.addEventListener("load", this.onIframeLoad);

        this.refs["iframeTarget"].appendChild(iframe);
        this.iframe = iframe;
    },
    onIframeLoad: function () {
        setTimeout(this.reload, 60000);
    },
    reload: function () {
        this.iframe.src = this.props.data.url;
    },
    render: function () {
        return React.DOM.div({ref: "iframeTarget", style: {height: '100%'}});
    }
});

export default Webview;