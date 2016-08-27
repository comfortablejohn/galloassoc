import React, { Component } from 'react';
import masonry from 'masonry-layout';

// var circdat = [
//     {id: "0", }
// ]

/** to implement later, using clip-paths in svg **/
// class ImageCircle extends Component {
//     render() {
//         return (
//             <defs
//             <g transform={"translate(" + this.props.pos.x + "," + this.props.pos.y + ")"}>
//                     <image src="http://www.healthline.com/hlcmsresource/images/00_Diabetes-Mine/PatientVoices/BrianCohen.jpg" ></image>
//             </g>
//         )
//     }
// }

const SIZES = {
    big: 120,
    med: 80,
    small: 50
}

var CIRCDATA = [
    {size: SIZES.big, pos: {x: 160, y: 250}, url: "listings", title: "Listings"},
    {size: SIZES.big, pos: {x: 720, y: 360}, url: "home", title: "Home"},
    {size: SIZES.med, pos: {x: 290, y: 440}, url: "https://www.facebook.com", title: "Facebook"}
]

class Circle extends Component {
    handleClick() {
        window.location = this.props.url;
    }
    render () {
        return (
            <g transform={"translate(" + this.props.pos.x + "," + this.props.pos.y + ")"}>
                <circle r={this.props.size} cx={this.props.pos[0]} cy={this.props.pos[1]} onClick={this.handleClick.bind(this)} className="circle">
                    <text x={this.props.pos[0]} y={this.props.pos[1]} className="circletitle">{this.props.title}</text>
                </circle>
            </g>
        )
    }
}

export default class CircleGroup extends Component {
    constructor(props) {
        super(props);
        //initialize masonry package
        
    }
    render() {
        var circles = CIRCDATA.map(circ => <Circle size={circ.size} pos={circ.pos} url={circ.url} title={circ.title} />)
        return (
            <svg height="98%" width="98%" className="circleGroup">
            {circles}
            </svg>
        )
    }
}

// export default { Circle, CircleGroup };
