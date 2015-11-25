import React from 'react';
import Page from './Page.jsx';

const Screen = React.createClass({
    handleSetItemState: function (itemLink, newItemState) {
        $.ajax({
            url: itemLink,
            type: 'POST',
            contentType: 'text/plain',
            data: newItemState,
            success: function (data) {
                const newState = this.state.items.map(function (it) {
                    it.widget.map(function (t) {
                        if (t.type != 'Webview' && t.item.link === itemLink) {
                            t.item.state = newItemState;
                        }
                    });
                    return it;
                });
                this.setState({items: newState});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadItemsFromServer: function () {
        $.ajax({
            url: this.props.url,
            cache: false,
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                if (this.state.visibleScreens.length > 0) {
                    var vs = JSON.parse(this.state.visibleScreens);
                    var itemsToShow = [];
                    vs.map( t => {
                        itemsToShow.push(data.homepage.widget[t-1]);
                    });
                    this.setState({items: itemsToShow});
                }
                else
                    this.setState({items: data.homepage.widget});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {
            items: [], visibleScreens: []
        }
    },
    componentDidMount: function () {
        this.loadItemsFromServer();
        this.setState({visibleScreens: this.props.visibleScreens});
        setInterval(this.loadItemsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="screen">
                {this.state.items.map(t => {
                    return (
                        <Page key={t.widgetId} data={t.widget} handleSetItemState={this.handleSetItemState}/>
                    )})}
            </div>
        );
    }
});

export default Screen;