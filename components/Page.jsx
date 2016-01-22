import React from 'react';
import Tile from './Tile.jsx';

const Page = React.createClass({
    render: function () {
        var numberOfTiles = this.props.data.length ? this.props.data.length : 1;
        var even = (numberOfTiles % 2 != 1);

        var tiles = [];
        var handleSetItemState = this.props.handleSetItemState;
        if(numberOfTiles > 1) {
            this.props.data.forEach( function (value, i ) {
                var tileClass;
                if (!even && i == 0) {
                    tileClass = 'fullHeight '  + (numberOfTiles == 3 ? 'twoThirdWidth' : 'oneThirdWidth');
                } else if (!even){
                    tileClass = 'halfHeight oneThirdWidth floatRight';
                } else if (even) {
                    if (numberOfTiles == 2) {
                        tileClass = 'fullHeight halfWidth';
                    } else if (numberOfTiles == 4) {
                        tileClass = 'halfHeight halfWidth';
                    } else {
                        tileClass = 'halfHeight oneThirdWidth floatLeft';
                    }
                }
                tiles.push(<Tile key={value.widgetId} tileClass={tileClass} data={value} handleSetState={handleSetItemState}/>)

            });
        } else
            tiles.push(<Tile key={this.props.data.widgetId} tileClass={'tileFullScreen'} data={this.props.data} handleSetState={this.props.handleSetItemState}/>)

        return (
            React.DOM.div({style: {left: (100 * this.props.idx).toString() + "%"}, className: 'page'}, tiles)
        );
    }
});

export default Page;