import React from 'react';
import Name from './Name.jsx';
import Hammer from 'react-hammerjs'

const DimmerItem = React.createClass({
    handleClick: function (evt) {
    	
    	const x = evt.pointers[0].offsetX - 100
    	const y = evt.pointers[0].offsetY - 100
		const deg = this.calculateDegreesFromZero(x,y)
		const distance = this.calculateDistanceToCenter(x,y)
    	console.log("d: "+ distance + " deg: " + deg + " x:" + x + " y:" + y)
    	
    	var newState = null
    	if(distance > 55 && distance < 120) { //click on dial
    		if( deg < 320 ) {
    			const percent = Math.round( Math.min(100, deg / 3) )
    			newState = "" + percent
    		} else {
    			newState = "OFF"
    		}
    	}
    	
       if(newState != null) {
       		console.log("Setting new state:" + newState)
       		this.props.handleSetState(this.props.data.item.link, newState);
       }
    },
    
    
    handleRotate: function(evt) {
    	console.log("Rotate:" ,evt)
    },
    
    
    
    calculateDegreesFromZero: function(x, y) {
    	const rawdeg = (Math.atan2(y,x) * 180 / Math.PI) + 180 + 60
    	const deg = rawdeg >= 360 ? rawdeg - 360 : rawdeg
    	return deg
    },
    
     calculateDistanceToCenter: function(x, y) {
    	const distance = Math.sqrt( (x*x) + (y*y) );
    	return distance
    },
    
   
    calculateHalfCircle: function (value, total, R) {
    	const alpha = 300 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = 300 + R * Math.cos(a),
            y = 300 - R * Math.sin(a),
			path = "M" + 300 + "," + (300 - R) + " A" +  R + "," + R + "," + 0 + "," + (alpha > 180 ? 1: 0) + "," + 1 + "," + x + "," + y;
    
        return path
    },
    
    
    render: function () {
    	
    	const value = isNaN( this.props.data.item.state) ? 0 : Number( this.props.data.item.state )
    	const t = "" + value
    	console.log("value:" + value + ":" + this.props.data.item.state, this.props.data.item.name )
    	//
        return (<div className="item" >
          	<Name text={this.props.label} value={this.props.data.item.state} icon={this.props.data.icon}/>  
            <div className="switchType">
            	<Hammer onTap={this.handleClick} onRotate={this.handleRotate}>
                	<svg height="200" width="200" viewBox="140 140 320 320" xmlns="http://www.w3.org/2000/svg" >
                        <g>
                            <path transform="rotate(-150 300 300)" fill={'none'} style={{stroke:'#555555', strokeWidth:'4px'}} d={this.calculateHalfCircle(100, 100, 150)}/>
                           
                            <path transform="rotate(-150 300 300)" fill={'none'} className="meter" d={this.calculateHalfCircle(value, 100, 135)}/>
                            <text x="300" y="320" fontSize="80" style={{fill:'white'}} textAnchor="middle">{t}</text>
                        </g>
                    </svg>
                </Hammer>
            </div></div>)
    }
});

export default DimmerItem;