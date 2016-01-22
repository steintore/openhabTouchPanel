import React from 'react';
import ReactDOM from "react-dom";
import Page from './Page.jsx';
var Hammer = require('react-hammerjs');

var currImgIdx = 0;
var currWidth;

const Screen = React.createClass({
    handleSetItemState: function (itemLink, newItemState) {
        $.ajax({
            url: itemLink,
            type: 'POST',
            contentType: 'text/plain',
            data: newItemState,
            success: function (data) {
                const newState = this.state.items.map(function (it) {
                    if (it.widget.length > 1) {
                        it.widget.map(function (t) {
                            if (t.type != 'Webview' && t.item.link === itemLink) {
                                t.item.state = newItemState;
                            }
                        });
                    } else if (it.widget.type != 'Webview' && it.widget.item.link == itemLink) {
                        it.widget.item.state = newItemState;
                    }
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
                    vs.map(t => {
                        itemsToShow.push(data.homepage.widget[t - 1]);
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
        //this.props.setX(this.props.x) ;
    },
    handleSwipe: function () {
        var pSize = $('.page').width();
        console.log(this);
        $('.screen').css("transform","translateX("+$(this).index() * pSize+"px)");
        this.transitionToImg(this.props.x + 1,  document.getElementById("screen"));
    },
    setTransform: function (el, val) {
        el.style.transform = val;
        el.style["webkitTransform"] = val;
        el.style["msTransform"] = val;
    },
    transitionToImg: function (idx, targetEl) {
        targetEl.style.transition = "0.15s";
        var pages = document.getElementsByClassName('page');
        if (idx < 0) {
            currImgIdx = 0;
            this.setTransform(targetEl, "translateX(0)");
            return;
        }

        if (idx >= (pages.length - 1)) {
            currImgIdx = pages.length - 1;
            this.setTransform(targetEl, "translateX(-" + (currWidth * this.props.x) + "px)");
            return;
        }

        currImgIdx = idx;
        this.setTransform(targetEl, "translateX(-" + (currWidth * idx) + "px)");
    },
    render: function () {
        return (
            <Hammer onSwipe={this.handleSwipe} onTap={this.handleSwipe} vertical={true}>
                <div id="screen" className="screen" style={{transform: 'translateX(' + this.props.x + ')'}}>
                    {this.state.items.map(function (t,i) {
                        return (
                        <Page idx={i} key={t.widgetId} data={t.widget} handleSetItemState={this.handleSetItemState}/>
                            )}, this)}
                </div>
            </Hammer>
        );
    }
});

export default Screen;