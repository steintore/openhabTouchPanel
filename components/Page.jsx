import React from 'react';
import Tile from './Tile.jsx';

const Page = React.createClass({
    render: function () {
        var numberOfTiles = this.props.data.length ? this.props.data.length : 1;
        var tileSize = numberOfTiles >= 12 ? 1 : (24 / numberOfTiles);
        var tiles = [];
        if(numberOfTiles > 1) { this.props.data.map(t => {
            return (
                tiles.push(<Tile key={t.widgetId} tileSize={tileSize} data={t} handleSetState={this.props.handleSetItemState}/>)
            )
        })} else
            tiles.push(<Tile key={this.props.data.widgetId} tileSize={tileSize} data={this.props.data} handleSetState={this.props.handleSetItemState}/>)

        return (
            React.DOM.div({style: {left: (100 * this.props.idx).toString() + "%"}, className: 'page'}, tiles)
        );
    }
});

export default Page;