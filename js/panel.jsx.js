const Screen = React.createClass({
    handleSetItemState: function (itemLink, newItemState) {
        console.log('handleSwitchItem: ' + itemLink + ' : ' +newItemState);
        $.ajax({
            url: itemLink,
            type: 'POST',
            contentType: 'text/plain',
            data: newItemState,
            success: function (data) {
                const newState = this.state.items.map(function (it) {
                    if (it.item.link === itemLink) {
                        it.item.state = newItemState;
                    }

                    return it;
                });
                console.log('Ny state er: ', newState);

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
            dataType: 'json',
            cache: false,
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                this.setState({items: data.homepage.widget.widget});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
        this.loadItemsFromServer();
        setInterval(this.loadItemsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="screen">
                {this.state.items.map(t => {
                    return (
                        <Tile key={t.widgetId} data={t} handleSetState={this.handleSetItemState} />
                    )
                })}
            </div>
        );
    }
});

const Tile = React.createClass({
    render: function () {
        var itemComponent = null;
        if (this.props.data.item.type === 'SwitchItem') {
            itemComponent = <SwitchItem data={this.props.data} handleSetState={this.props.handleSetState}/>
        }
        return (<div className="tile col-xs-4">
            <Name text={this.props.data.label} value={this.props.data.item.state} icon={this.props.data.icon}/>
            {itemComponent}
        </div>);
    }
});

const SwitchItem = React.createClass({
    handleClick: function () {
        var newState = this.props.data.item.state === 'ON' ? 'OFF' : 'ON';
        console.log(newState);
        this.props.handleSetState(this.props.data.item.link, newState);
    },
    render: function () {
        return (<div className="switchType" onClick={this.handleClick}>
            <svg version="1.1" id="Capa_1" x="0px" y="0px"
                 width="94px" height="94px" viewBox="0 0 47 47" style={{enableBackground: 'new 0 0 47 47'}}>
                <g>
                    <g>
                        <path d="M23.5,11.449c-6.385,0-11.563,4.959-11.563,11.077c0,7.265,5.045,9.117,5.045,13.344c0,1.045,0.799,2.017,1.999,2.731
			c-0.251,0.209-0.391,0.438-0.391,0.678c0,0.322,0.253,0.623,0.688,0.881c-0.408,0.253-0.645,0.544-0.645,0.855
			c0,0.314,0.242,0.608,0.659,0.863c-0.426,0.256-0.674,0.555-0.674,0.872c0,0.388,0.366,0.743,0.978,1.032
			c-0.237,0.215-0.373,0.453-0.373,0.703c0,0.74,1.153,1.369,2.774,1.621C22.282,46.634,22.86,47,23.534,47
			c0.673,0,1.25-0.363,1.535-0.889c1.637-0.248,2.803-0.881,2.803-1.623c0-0.247-0.131-0.482-0.363-0.694
			c0.625-0.291,0.998-0.651,0.998-1.042c0-0.314-0.241-0.609-0.659-0.863c0.425-0.257,0.674-0.554,0.674-0.871
			c0-0.322-0.254-0.623-0.688-0.882c0.41-0.252,0.646-0.544,0.646-0.855c0-0.249-0.151-0.484-0.421-0.698
			c1.181-0.713,1.966-1.675,1.966-2.711c0-4.229,5.039-6.08,5.039-13.344C35.063,16.408,29.886,11.449,23.5,11.449z M29.538,29.381
			c-1.152,1.692-2.455,3.604-2.535,6.232c-0.396,0.441-1.809,1.158-3.499,1.158c-1.691,0-3.105-0.717-3.5-1.16
			c-0.08-2.629-1.385-4.541-2.539-6.232c-1.287-1.886-2.502-3.667-2.502-6.854c0-4.439,3.83-8.051,8.537-8.051
			c4.708,0,8.538,3.612,8.538,8.051C32.038,25.713,30.823,27.495,29.538,29.381z"/>
                        {this.props.data.item.state == 'ON' ?
                            <g>
                                <path d="M23.5,7.564c0.832,0,1.513-0.9,1.513-2V2c0-1.1-0.681-2-1.513-2s-1.513,0.9-1.513,2v3.564
			C21.987,6.665,22.668,7.564,23.5,7.564z"/>
                                <path d="M15.747,9.642c0.721-0.416,0.859-1.536,0.31-2.488l-1.781-3.087c-0.55-0.953-1.59-1.392-2.311-0.976
			c-0.721,0.416-0.86,1.536-0.311,2.488l1.783,3.087C13.987,9.619,15.026,10.058,15.747,9.642z"/>
                                <path d="M9.095,13.007L6.01,11.225c-0.953-0.55-2.073-0.411-2.489,0.31c-0.416,0.721,0.022,1.76,0.976,2.31l3.086,1.782
			c0.953,0.55,2.073,0.411,2.488-0.31C10.486,14.596,10.048,13.557,9.095,13.007z"/>
                                <path d="M42.504,32.295l-3.086-1.781c-0.953-0.551-2.073-0.412-2.488,0.31c-0.416,0.721,0.021,1.76,0.977,2.31l3.084,1.782
			c0.953,0.55,2.073,0.411,2.489-0.31C43.896,33.884,43.458,32.845,42.504,32.295z"/>
                                <path d="M7.994,23.07c0-0.833-0.9-1.513-2-1.513H2.43c-1.1,0-2,0.681-2,1.513c0,0.832,0.9,1.513,2,1.513h3.564
			C7.094,24.583,7.994,23.902,7.994,23.07z"/>
                                <path d="M44.57,21.557h-3.563c-1.101,0-2,0.681-2,1.513c0,0.832,0.899,1.513,2,1.513h3.563c1.101,0,2-0.681,2-1.513
			C46.57,22.238,45.67,21.557,44.57,21.557z"/>
                                <path d="M7.582,30.514l-3.086,1.781c-0.953,0.55-1.392,1.589-0.976,2.311c0.416,0.721,1.536,0.859,2.489,0.31l3.085-1.782
			c0.953-0.55,1.392-1.589,0.976-2.31C9.655,30.104,8.535,29.963,7.582,30.514z"/>
                                <path d="M39.418,15.627l3.086-1.782c0.953-0.55,1.392-1.589,0.976-2.31c-0.416-0.721-1.536-0.86-2.489-0.31l-3.085,1.782
			c-0.952,0.55-1.392,1.589-0.976,2.31C37.345,16.038,38.465,16.177,39.418,15.627z"/>
                                <path d="M35.036,3.09c-0.722-0.416-1.762,0.023-2.312,0.976l-1.781,3.087c-0.55,0.953-0.411,2.072,0.31,2.488
			c0.722,0.416,1.761-0.023,2.311-0.976l1.783-3.087C35.896,4.626,35.756,3.506,35.036,3.09z"/>
                            </g>
                            : null}
                    </g>
                </g>
            </svg>
        </div>)
    }
});

const Name = React.createClass({
    render: function () {
        return (
            <div className="name">{this.props.text}
            </div>);
    }
});


ReactDOM.render(
    <Screen url="/rest/sitemaps/panel?Accept=application/json" pollInterval={5000}/>,
    document.getElementById('content')
);
